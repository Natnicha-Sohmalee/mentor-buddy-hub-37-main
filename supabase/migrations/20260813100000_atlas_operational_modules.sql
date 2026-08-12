-- ATLAS / Trainee Hub: operational modules and access controls.
-- Prerequisites: 01_atlas_initial_schema.sql, 02_atlas_production_extension.sql,
-- 03_atlas_core_rls_fix.sql and 04_atlas_available_modules_rls.sql.
-- This migration is additive: it does not delete existing production data.

create extension if not exists pgcrypto;

-- ============================================================
-- Project membership: a project can have more than one mentor.
-- ============================================================

create table if not exists public.project_mentors (
  project_id uuid not null references public.projects(id) on delete cascade,
  mentor_id uuid not null references public.mentor_profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (project_id, mentor_id)
);

create index if not exists idx_project_mentors_mentor
  on public.project_mentors(mentor_id);

-- The legacy project owner remains a project mentor automatically.
insert into public.project_mentors (project_id, mentor_id)
select id, mentor_id from public.projects where mentor_id is not null
on conflict do nothing;

-- ============================================================
-- Workflow audit fields and controlled task transitions.
-- ============================================================

alter table public.task_assignments
  add column if not exists accepted_at timestamptz,
  add column if not exists submitted_at timestamptz,
  add column if not exists reviewed_at timestamptz,
  add column if not exists reviewed_by uuid references public.mentor_profiles(id) on delete set null;

create index if not exists idx_task_assignments_reviewed_by
  on public.task_assignments(reviewed_by);

create or replace function public.is_project_mentor(target_project_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.is_admin()
    or exists (
      select 1
      from public.projects p
      where p.id = target_project_id
        and p.mentor_id = auth.uid()
    )
    or exists (
      select 1
      from public.project_mentors pm
      where pm.project_id = target_project_id
        and pm.mentor_id = auth.uid()
    );
$$;

create or replace function public.manages_trainee(target_trainee_id uuid, target_project_id uuid default null)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select public.is_admin()
    or exists (
      select 1
      from public.mentor_trainee_mapping mtm
      where mtm.mentor_id = auth.uid()
        and mtm.trainee_id = target_trainee_id
        and (target_project_id is null or mtm.project_id is null or mtm.project_id = target_project_id)
    );
$$;

revoke all on function public.is_project_mentor(uuid) from public;
revoke all on function public.manages_trainee(uuid, uuid) from public;
grant execute on function public.is_project_mentor(uuid) to authenticated;
grant execute on function public.manages_trainee(uuid, uuid) to authenticated;

create or replace function public.enforce_task_assignment_transition()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  task_project_id uuid;
  can_manage boolean;
begin
  if public.is_admin() then
    return new;
  end if;

  select project_id into task_project_id from public.tasks where id = old.task_id;
  can_manage := public.is_mentor() and public.is_project_mentor(task_project_id);

  if public.is_trainee() and old.trainee_id = auth.uid() then
    if new.feedback is distinct from old.feedback or new.reviewed_by is distinct from old.reviewed_by then
      raise exception 'Trainees cannot change mentor feedback or reviewer';
    end if;
    if new.status <> old.status and not (
      (old.status = 'todo' and new.status = 'in_progress')
      or (old.status = 'in_progress' and new.status = 'review')
    ) then
      raise exception 'Invalid trainee task transition from % to %', old.status, new.status;
    end if;
    if old.status = 'todo' and new.status = 'in_progress' then
      new.accepted_at := coalesce(old.accepted_at, now());
    end if;
    if old.status = 'in_progress' and new.status = 'review' then
      new.submitted_at := now();
    end if;
    return new;
  end if;

  if can_manage then
    if new.status <> old.status and not (
      old.status = 'review' and new.status in ('todo', 'done')
    ) then
      raise exception 'Mentors can only return or approve assignments in review';
    end if;
    if old.status = 'review' and new.status in ('todo', 'done') then
      new.reviewed_at := now();
      new.reviewed_by := auth.uid();
    end if;
    return new;
  end if;

  raise exception 'Not permitted to update this task assignment';
end;
$$;

drop trigger if exists enforce_task_assignment_transition on public.task_assignments;
create trigger enforce_task_assignment_transition
before update on public.task_assignments
for each row execute function public.enforce_task_assignment_transition();

-- ============================================================
-- Appointment metadata and RSVP. The normalized participants table from 02
-- is the source of truth; no uuid[] participant column is reintroduced.
-- ============================================================

alter table public.appointments
  add column if not exists title text,
  add column if not exists description text,
  add column if not exists created_by uuid references public.user_roles(id) on delete set null,
  add column if not exists status text not null default 'scheduled';

alter table public.appointments drop constraint if exists appointments_status_check;
alter table public.appointments add constraint appointments_status_check
  check (status in ('scheduled', 'cancelled', 'completed'));

alter table public.appointment_participants
  add column if not exists participant_role text not null default 'attendee',
  add column if not exists rsvp_status text not null default 'pending',
  add column if not exists responded_at timestamptz;

alter table public.appointment_participants drop constraint if exists appointment_participants_role_check;
alter table public.appointment_participants add constraint appointment_participants_role_check
  check (participant_role in ('organizer', 'attendee'));
alter table public.appointment_participants drop constraint if exists appointment_participants_rsvp_check;
alter table public.appointment_participants add constraint appointment_participants_rsvp_check
  check (rsvp_status in ('pending', 'accepted', 'declined'));

create index if not exists idx_appointments_created_by on public.appointments(created_by);

-- ============================================================
-- Feature tables required by the operating workflow.
-- ============================================================

create table if not exists public.issue_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.user_roles(id) on delete cascade,
  trainee_id uuid references public.trainee_profiles(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  description text not null,
  severity text not null default 'medium' check (severity in ('low', 'medium', 'high', 'critical')),
  status text not null default 'open' check (status in ('open', 'in_progress', 'resolved', 'closed')),
  resolved_by uuid references public.user_roles(id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.feedback_entries (
  id uuid primary key default gen_random_uuid(),
  trainee_id uuid not null references public.trainee_profiles(id) on delete cascade,
  mentor_id uuid references public.mentor_profiles(id) on delete set null,
  task_assignment_id uuid references public.task_assignments(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  feedback_type text not null default 'general' check (feedback_type in ('general', 'task', 'project', 'performance')),
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.extension_requests (
  id uuid primary key default gen_random_uuid(),
  trainee_id uuid not null references public.trainee_profiles(id) on delete cascade,
  requested_end_date date not null,
  reason text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'cancelled')),
  decided_by uuid references public.user_roles(id) on delete set null,
  decided_at timestamptz,
  decision_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.manpower_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.user_roles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  trainee_team_id uuid references public.trainee_teams(id) on delete set null,
  title text not null,
  description text,
  quantity integer not null default 1 check (quantity > 0),
  status text not null default 'open' check (status in ('draft', 'open', 'filled', 'cancelled')),
  needed_by date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.daily_standups (
  id uuid primary key default gen_random_uuid(),
  trainee_id uuid not null references public.trainee_profiles(id) on delete cascade,
  standup_date date not null default current_date,
  round smallint not null check (round between 1 and 3),
  yesterday text,
  today text,
  blockers text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (trainee_id, standup_date, round)
);

create table if not exists public.leave_requests (
  id uuid primary key default gen_random_uuid(),
  trainee_id uuid not null references public.trainee_profiles(id) on delete cascade,
  leave_date date not null,
  leave_type text not null default 'personal' check (leave_type in ('sick', 'personal', 'other')),
  reason text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'cancelled')),
  decided_by uuid references public.user_roles(id) on delete set null,
  decided_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (trainee_id, leave_date)
);

create table if not exists public.notification_preferences (
  user_id uuid primary key references public.user_roles(id) on delete cascade,
  in_app_enabled boolean not null default true,
  email_enabled boolean not null default false,
  discord_enabled boolean not null default false,
  updated_at timestamptz not null default now()
);

create index if not exists idx_issue_reports_trainee_status on public.issue_reports(trainee_id, status);
create index if not exists idx_issue_reports_project_status on public.issue_reports(project_id, status);
create index if not exists idx_feedback_entries_trainee on public.feedback_entries(trainee_id, created_at desc);
create index if not exists idx_extension_requests_trainee_status on public.extension_requests(trainee_id, status);
create index if not exists idx_manpower_requests_status on public.manpower_requests(status);
create index if not exists idx_daily_standups_trainee_date on public.daily_standups(trainee_id, standup_date desc);
create index if not exists idx_leave_requests_trainee_status on public.leave_requests(trainee_id, status);

-- Keep all lifecycle timestamps owned by PostgreSQL.
do $$
declare t text;
begin
  foreach t in array array['issue_reports', 'feedback_entries', 'extension_requests', 'manpower_requests', 'daily_standups', 'leave_requests', 'notification_preferences'] loop
    execute format('drop trigger if exists update_%s_updated_at on public.%I', t, t);
    execute format('create trigger update_%s_updated_at before update on public.%I for each row execute function public.update_updated_at()', t, t);
  end loop;
end $$;

-- ============================================================
-- RLS: enable first, then grant only role/relationship-based access.
-- ============================================================

alter table public.project_mentors enable row level security;
alter table public.issue_reports enable row level security;
alter table public.feedback_entries enable row level security;
alter table public.extension_requests enable row level security;
alter table public.manpower_requests enable row level security;
alter table public.daily_standups enable row level security;
alter table public.leave_requests enable row level security;
alter table public.notification_preferences enable row level security;

-- Project collaborators and their assigned trainees can read membership.
create policy "Project members can view project mentors" on public.project_mentors for select to authenticated
using (public.is_project_mentor(project_id) or exists (
  select 1 from public.mentor_trainee_mapping mtm
  where mtm.project_id = project_mentors.project_id and mtm.trainee_id = auth.uid()
));
create policy "Admins manage project mentors" on public.project_mentors for all to authenticated
using (public.is_admin()) with check (public.is_admin());

-- Mentors may maintain memberships only on projects they already manage.
create policy "Project mentors manage their project members" on public.project_mentors for all to authenticated
using (public.is_project_mentor(project_id))
with check (public.is_project_mentor(project_id));

create policy "Users report and view own issues" on public.issue_reports for select to authenticated
using (reporter_id = auth.uid() or trainee_id = auth.uid() or public.manages_trainee(trainee_id, project_id) or public.is_admin());
create policy "Users create own issues" on public.issue_reports for insert to authenticated
with check (reporter_id = auth.uid() and (trainee_id is null or trainee_id = auth.uid() or public.is_mentor()));
create policy "Mentors and admins update related issues" on public.issue_reports for update to authenticated
using (public.manages_trainee(trainee_id, project_id) or public.is_admin())
with check (public.manages_trainee(trainee_id, project_id) or public.is_admin());

create policy "Trainees view own feedback" on public.feedback_entries for select to authenticated
using (trainee_id = auth.uid() or mentor_id = auth.uid() or public.manages_trainee(trainee_id, project_id) or public.is_admin());
create policy "Mentors create feedback for managed trainees" on public.feedback_entries for insert to authenticated
with check (public.is_mentor() and mentor_id = auth.uid() and public.manages_trainee(trainee_id, project_id));
create policy "Feedback authors and admins update feedback" on public.feedback_entries for update to authenticated
using (mentor_id = auth.uid() or public.is_admin()) with check (mentor_id = auth.uid() or public.is_admin());

create policy "Trainees view own extension requests" on public.extension_requests for select to authenticated
using (trainee_id = auth.uid() or public.manages_trainee(trainee_id, null) or public.is_admin());
create policy "Trainees create own extension requests" on public.extension_requests for insert to authenticated
with check (public.is_trainee() and trainee_id = auth.uid());
create policy "Trainees cancel own pending extension requests" on public.extension_requests for update to authenticated
using (trainee_id = auth.uid() and status = 'pending') with check (trainee_id = auth.uid() and status = 'cancelled');
create policy "Admins decide extension requests" on public.extension_requests for update to authenticated
using (public.is_admin()) with check (public.is_admin());

create policy "Mentors view own manpower requests" on public.manpower_requests for select to authenticated
using (requester_id = auth.uid() or public.is_admin());
create policy "Mentors create manpower requests" on public.manpower_requests for insert to authenticated
with check (public.is_mentor() and requester_id = auth.uid() and (project_id is null or public.is_project_mentor(project_id)));
create policy "Requesters and admins update manpower requests" on public.manpower_requests for update to authenticated
using (requester_id = auth.uid() or public.is_admin()) with check (requester_id = auth.uid() or public.is_admin());

create policy "Trainees and mentors view related standups" on public.daily_standups for select to authenticated
using (trainee_id = auth.uid() or public.manages_trainee(trainee_id, null) or public.is_admin());
create policy "Trainees manage own standups" on public.daily_standups for all to authenticated
using (public.is_trainee() and trainee_id = auth.uid()) with check (public.is_trainee() and trainee_id = auth.uid());

create policy "Trainees and mentors view related leave requests" on public.leave_requests for select to authenticated
using (trainee_id = auth.uid() or public.manages_trainee(trainee_id, null) or public.is_admin());
create policy "Trainees create own leave requests" on public.leave_requests for insert to authenticated
with check (public.is_trainee() and trainee_id = auth.uid());
create policy "Trainees cancel own pending leave requests" on public.leave_requests for update to authenticated
using (trainee_id = auth.uid() and status = 'pending') with check (trainee_id = auth.uid() and status = 'cancelled');
create policy "Mentors and admins decide leave requests" on public.leave_requests for update to authenticated
using (public.manages_trainee(trainee_id, null) or public.is_admin())
with check (public.manages_trainee(trainee_id, null) or public.is_admin());

create policy "Users manage own notification preferences" on public.notification_preferences for all to authenticated
using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());

-- Fix table-backed workflows that were previously too restrictive.
drop policy if exists "Users can view own documents" on public.documents;
create policy "Users can view permitted documents" on public.documents for select to authenticated
using (
  uploader_id = auth.uid()
  or public.is_admin()
  or (public.is_mentor() and (
    (project_id is not null and public.is_project_mentor(project_id))
    or exists (select 1 from public.mentor_trainee_mapping mtm where mtm.mentor_id = auth.uid() and mtm.trainee_id = documents.uploader_id)
  ))
);

drop policy if exists "Mentors can create appointments" on public.appointments;
create policy "Mentors can create appointments" on public.appointments for insert to authenticated
with check (public.is_mentor() and created_by = auth.uid());
create policy "Appointment creators manage appointments" on public.appointments for update to authenticated
using (created_by = auth.uid() or public.is_admin()) with check (created_by = auth.uid() or public.is_admin());
create policy "Mentors manage participants of their appointments" on public.appointment_participants for all to authenticated
using (public.is_admin() or exists (select 1 from public.appointments a where a.id = appointment_participants.appointment_id and a.created_by = auth.uid()))
with check (public.is_admin() or exists (select 1 from public.appointments a where a.id = appointment_participants.appointment_id and a.created_by = auth.uid()));
create policy "Participants update own RSVP" on public.appointment_participants for update to authenticated
using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Realtime is useful for operational items; tolerate a migration being rerun.
do $$
declare t text;
begin
  foreach t in array array['issue_reports', 'leave_requests', 'extension_requests', 'notifications'] loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then null;
    end;
  end loop;
end $$;

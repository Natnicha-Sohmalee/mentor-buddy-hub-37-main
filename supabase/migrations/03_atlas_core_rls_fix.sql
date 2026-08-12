-- ATLAS / Trainee Hub: Core RLS for profile, project and Kanban screens.
-- Run after 01_atlas_initial_schema.sql and 02_atlas_production_extension.sql.
-- This file intentionally does not change schema or seed data.

-- The original scripts already give Admin full access through public.is_admin().
-- The policies below add the missing read path for Trainee and Mentor screens.

-- ============================================================
-- TRAINEE: own mapping -> assigned mentor, task, project
-- ============================================================

drop policy if exists "Trainees can view own mappings" on public.mentor_trainee_mapping;
create policy "Trainees can view own mappings"
on public.mentor_trainee_mapping for select to authenticated
using (public.is_trainee() and trainee_id = auth.uid());

drop policy if exists "Trainees can view assigned mentors" on public.mentor_profiles;
create policy "Trainees can view assigned mentors"
on public.mentor_profiles for select to authenticated
using (
  public.is_trainee()
  and exists (
    select 1 from public.mentor_trainee_mapping mtm
    where mtm.mentor_id = mentor_profiles.id
      and mtm.trainee_id = auth.uid()
  )
);

drop policy if exists "Trainees can view assigned tasks" on public.tasks;
create policy "Trainees can view assigned tasks"
on public.tasks for select to authenticated
using (
  public.is_trainee()
  and exists (
    select 1 from public.task_assignments ta
    where ta.task_id = tasks.id
      and ta.trainee_id = auth.uid()
  )
);

drop policy if exists "Trainees can view assigned projects" on public.projects;
create policy "Trainees can view assigned projects"
on public.projects for select to authenticated
using (
  public.is_trainee()
  and exists (
    select 1
    from public.tasks t
    join public.task_assignments ta on ta.task_id = t.id
    where t.project_id = projects.id
      and ta.trainee_id = auth.uid()
  )
);

-- ============================================================
-- MENTOR: own mapping -> assigned trainees, own project and tasks
-- ============================================================

drop policy if exists "Mentors can view own mappings" on public.mentor_trainee_mapping;
create policy "Mentors can view own mappings"
on public.mentor_trainee_mapping for select to authenticated
using (public.is_mentor() and mentor_id = auth.uid());

drop policy if exists "Mentors can view assigned trainees" on public.trainee_profiles;
create policy "Mentors can view assigned trainees"
on public.trainee_profiles for select to authenticated
using (
  public.is_mentor()
  and exists (
    select 1 from public.mentor_trainee_mapping mtm
    where mtm.mentor_id = auth.uid()
      and mtm.trainee_id = trainee_profiles.id
  )
);

drop policy if exists "Mentors can view own projects" on public.projects;
create policy "Mentors can view own projects"
on public.projects for select to authenticated
using (
  public.is_mentor()
  and (
    mentor_id = auth.uid()
    or exists (
      select 1 from public.mentor_trainee_mapping mtm
      where mtm.project_id = projects.id
        and mtm.mentor_id = auth.uid()
    )
  )
);

-- The all-policy from the production extension handles CRUD for tasks created
-- by the current mentor. These read policies make the intended access explicit.
drop policy if exists "Mentors can view tasks they created" on public.tasks;
create policy "Mentors can view tasks they created"
on public.tasks for select to authenticated
using (public.is_mentor() and assigner_id = auth.uid());

drop policy if exists "Mentors can view assignments for their tasks" on public.task_assignments;
create policy "Mentors can view assignments for their tasks"
on public.task_assignments for select to authenticated
using (
  public.is_mentor()
  and exists (
    select 1 from public.tasks t
    where t.id = task_assignments.task_id
      and t.assigner_id = auth.uid()
  )
);

-- ============================================================
-- Guardrails: no change to write policies for Trainee.
-- A Trainee may update only their own task_assignments, as defined in 01.
-- ============================================================

drop policy if exists "Trainees can update own profile" on public.trainee_profiles;
create policy "Trainees can update own profile"
on public.trainee_profiles for update to authenticated
using (public.is_trainee() and id = auth.uid())
with check (public.is_trainee() and id = auth.uid());

drop policy if exists "Mentors can update own profile" on public.mentor_profiles;
create policy "Mentors can update own profile"
on public.mentor_profiles for update to authenticated
using (public.is_mentor() and id = auth.uid())
with check (public.is_mentor() and id = auth.uid());

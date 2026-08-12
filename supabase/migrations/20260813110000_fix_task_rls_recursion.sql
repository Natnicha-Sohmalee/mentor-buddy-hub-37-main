-- Fix recursive RLS evaluation between tasks, task_assignments and projects.
-- Run after 20260813100000_atlas_operational_modules.sql.

create or replace function public.is_task_manager(target_task_id uuid)
returns boolean
language sql security definer set search_path = public stable
as $$
  select public.is_admin() or (
    public.is_mentor() and exists (
      select 1 from public.tasks t
      where t.id = target_task_id
        and (t.assigner_id = auth.uid() or (t.project_id is not null and public.is_project_mentor(t.project_id)))
    )
  );
$$;

create or replace function public.can_view_task(target_task_id uuid)
returns boolean
language sql security definer set search_path = public stable
as $$
  select public.is_admin()
    or public.is_task_manager(target_task_id)
    or (public.is_trainee() and exists (
      select 1 from public.task_assignments ta
      where ta.task_id = target_task_id and ta.trainee_id = auth.uid()
    ));
$$;

create or replace function public.can_view_project(target_project_id uuid)
returns boolean
language sql security definer set search_path = public stable
as $$
  select public.is_admin()
    or public.is_project_mentor(target_project_id)
    or (public.is_trainee() and exists (
      select 1 from public.tasks t join public.task_assignments ta on ta.task_id = t.id
      where t.project_id = target_project_id and ta.trainee_id = auth.uid()
    ));
$$;

revoke all on function public.is_task_manager(uuid) from public;
revoke all on function public.can_view_task(uuid) from public;
revoke all on function public.can_view_project(uuid) from public;
grant execute on function public.is_task_manager(uuid) to authenticated;
grant execute on function public.can_view_task(uuid) to authenticated;
grant execute on function public.can_view_project(uuid) to authenticated;

-- Remove policies that queried a table whose policy queried back into it.
drop policy if exists "Trainees can view assigned tasks" on public.tasks;
drop policy if exists "Mentors can view tasks they created" on public.tasks;
drop policy if exists "Mentors can manage tasks they created" on public.tasks;
drop policy if exists "Trainees can view assigned projects" on public.projects;
drop policy if exists "Mentors can view own projects" on public.projects;
drop policy if exists "Mentors can manage task assignments for their tasks" on public.task_assignments;
drop policy if exists "Mentors can view assignments for their tasks" on public.task_assignments;
drop policy if exists "Trainees can view own task assignments" on public.task_assignments;

create policy "Users can view permitted tasks"
on public.tasks for select to authenticated using (public.can_view_task(id));

create policy "Mentors manage permitted tasks"
on public.tasks for all to authenticated
using (public.is_task_manager(id))
with check (public.is_mentor() and assigner_id = auth.uid());

create policy "Users can view permitted projects"
on public.projects for select to authenticated using (public.can_view_project(id));

create policy "Users can view permitted task assignments"
on public.task_assignments for select to authenticated
using (trainee_id = auth.uid() or public.is_task_manager(task_id) or public.is_admin());

create policy "Mentors manage permitted task assignments"
on public.task_assignments for all to authenticated
using (public.is_task_manager(task_id))
with check (public.is_task_manager(task_id));

-- ============================================================
-- ATLAS / TRAINEE HUB
-- PRIVATE SUPABASE STORAGE POLICIES
--
-- Path conventions:
--
-- e_documents/
--   {user_id}/{year}/{filename}
--
-- task_attachments/
--   {task_id}/{filename}
--
-- Run after:
-- 20260813100000_atlas_operational_modules.sql
-- ============================================================


-- ============================================================
-- 0. ENSURE BUCKETS EXIST AND ARE PRIVATE
-- ============================================================

insert into storage.buckets (
    id,
    name,
    public
)
values
    (
        'e_documents',
        'e_documents',
        false
    ),
    (
        'task_attachments',
        'task_attachments',
        false
    )
on conflict (id)
do update
set public = false;


-- ============================================================
-- 1. HELPER:
-- CAN MENTOR VIEW TRAINEE DOCUMENT?
--
-- e_documents/{user_id}/{year}/{filename}
--
-- owner_folder = first path segment = trainee UUID
-- ============================================================

create or replace function public.can_view_managed_trainee_document(
    owner_folder text
)
returns boolean
language plpgsql
security definer
stable
set search_path = public
as $$
declare
    owner_id uuid;
begin

    -- malformed UUID path => deny access
    begin
        owner_id := owner_folder::uuid;
    exception
        when invalid_text_representation then
            return false;
    end;

    return
        public.is_mentor()
        and public.manages_trainee(
            owner_id,
            null
        );

end;
$$;


-- ============================================================
-- 2. HELPER:
-- CAN USER ACCESS TASK ATTACHMENT?
--
-- task_attachments/{task_id}/{filename}
--
-- Allowed:
-- - Admin
-- - Mentor who owns/manages project/task
-- - Trainee assigned to task
-- ============================================================

create or replace function public.can_access_task_attachment(
    task_folder text
)
returns boolean
language plpgsql
security definer
stable
set search_path = public
as $$
declare
    target_task_id uuid;
begin

    -- malformed task UUID => deny
    begin
        target_task_id := task_folder::uuid;
    exception
        when invalid_text_representation then
            return false;
    end;

    return

        -- Admin
        public.is_admin()

        -- Mentor
        or exists (
            select 1
            from public.tasks t
            where t.id = target_task_id
              and (
                    t.assigner_id = auth.uid()

                    or (
                        t.project_id is not null
                        and public.is_project_mentor(
                            t.project_id
                        )
                    )
              )
        )

        -- Assigned trainee
        or exists (
            select 1
            from public.task_assignments ta
            where ta.task_id = target_task_id
              and ta.trainee_id = auth.uid()
        );

end;
$$;


-- ============================================================
-- 3. HELPER:
-- CAN USER MANAGE TASK ATTACHMENT?
--
-- Allowed:
-- - Admin
-- - Mentor who owns/manages task/project
--
-- Trainee can upload/read but cannot replace/delete.
-- ============================================================

create or replace function public.can_manage_task_attachment(
    task_folder text
)
returns boolean
language plpgsql
security definer
stable
set search_path = public
as $$
declare
    target_task_id uuid;
begin

    begin
        target_task_id := task_folder::uuid;
    exception
        when invalid_text_representation then
            return false;
    end;

    return

        -- Admin
        public.is_admin()

        -- Mentor
        or (
            public.is_mentor()
            and exists (
                select 1
                from public.tasks t
                where t.id = target_task_id
                  and (
                        t.assigner_id = auth.uid()

                        or (
                            t.project_id is not null
                            and public.is_project_mentor(
                                t.project_id
                            )
                        )
                  )
            )
        );

end;
$$;


-- ============================================================
-- 4. FUNCTION PERMISSIONS
-- ============================================================

revoke all
on function public.can_view_managed_trainee_document(text)
from public;

revoke all
on function public.can_access_task_attachment(text)
from public;

revoke all
on function public.can_manage_task_attachment(text)
from public;


grant execute
on function public.can_view_managed_trainee_document(text)
to authenticated;

grant execute
on function public.can_access_task_attachment(text)
to authenticated;

grant execute
on function public.can_manage_task_attachment(text)
to authenticated;


-- ============================================================
-- 5. DROP OLD E_DOCUMENT POLICIES
-- ============================================================

drop policy if exists
"Users can upload e_documents"
on storage.objects;

drop policy if exists
"Users can view own e_documents"
on storage.objects;

drop policy if exists
"Users can view permitted e_documents"
on storage.objects;

drop policy if exists
"Users can update own e_documents"
on storage.objects;

drop policy if exists
"Users can delete own e_documents"
on storage.objects;

drop policy if exists
"Mentors can view managed trainee e_documents"
on storage.objects;

drop policy if exists
"Admins can manage all e_documents"
on storage.objects;


-- ============================================================
-- 6. E_DOCUMENTS — INSERT
--
-- User may only upload inside:
--
-- e_documents/{auth.uid()}/{year}/{filename}
-- ============================================================

create policy "Users can upload e_documents"
on storage.objects
for insert
to authenticated
with check (

    bucket_id = 'e_documents'

    and (storage.foldername(name))[1]
        = auth.uid()::text

);


-- ============================================================
-- 7. E_DOCUMENTS — SELECT
--
-- Allowed:
-- - File owner
-- - Admin
-- - Mentor managing that trainee
-- ============================================================

create policy "Users can view permitted e_documents"
on storage.objects
for select
to authenticated
using (

    bucket_id = 'e_documents'

    and (

        -- Owner
        (storage.foldername(name))[1]
            = auth.uid()::text

        -- Admin
        or public.is_admin()

        -- Managed trainee's mentor
        or public.can_view_managed_trainee_document(
            (storage.foldername(name))[1]
        )

    )

);


-- ============================================================
-- 8. E_DOCUMENTS — UPDATE
--
-- Owner only.
-- Admin is covered by admin policy below.
-- ============================================================

create policy "Users can update own e_documents"
on storage.objects
for update
to authenticated
using (

    bucket_id = 'e_documents'

    and (storage.foldername(name))[1]
        = auth.uid()::text

)
with check (

    bucket_id = 'e_documents'

    and (storage.foldername(name))[1]
        = auth.uid()::text

);


-- ============================================================
-- 9. E_DOCUMENTS — DELETE
--
-- Owner or Admin
-- ============================================================

create policy "Users can delete own e_documents"
on storage.objects
for delete
to authenticated
using (

    bucket_id = 'e_documents'

    and (

        (storage.foldername(name))[1]
            = auth.uid()::text

        or public.is_admin()

    )

);


-- ============================================================
-- 10. E_DOCUMENTS — ADMIN FULL ACCESS
-- ============================================================

create policy "Admins can manage all e_documents"
on storage.objects
for all
to authenticated
using (

    bucket_id = 'e_documents'
    and public.is_admin()

)
with check (

    bucket_id = 'e_documents'
    and public.is_admin()

);


-- ============================================================
-- 11. DROP OLD TASK ATTACHMENT POLICIES
-- ============================================================

drop policy if exists
"Users can upload task attachments"
on storage.objects;

drop policy if exists
"Users can view task attachments"
on storage.objects;

drop policy if exists
"Users can update own task attachments"
on storage.objects;

drop policy if exists
"Users can delete own task attachments"
on storage.objects;

drop policy if exists
"Task members can upload task attachments"
on storage.objects;

drop policy if exists
"Task members can read task attachments"
on storage.objects;

drop policy if exists
"Mentors manage task attachments"
on storage.objects;

drop policy if exists
"Mentors delete task attachments"
on storage.objects;


-- ============================================================
-- 12. TASK ATTACHMENTS — INSERT
--
-- Allowed:
-- - Admin
-- - Mentor responsible for task/project
-- - Assigned trainee
--
-- Path:
-- task_attachments/{task_id}/{filename}
-- ============================================================

create policy "Task members can upload task attachments"
on storage.objects
for insert
to authenticated
with check (

    bucket_id = 'task_attachments'

    and public.can_access_task_attachment(
        (storage.foldername(name))[1]
    )

);


-- ============================================================
-- 13. TASK ATTACHMENTS — SELECT
-- ============================================================

create policy "Task members can read task attachments"
on storage.objects
for select
to authenticated
using (

    bucket_id = 'task_attachments'

    and public.can_access_task_attachment(
        (storage.foldername(name))[1]
    )

);


-- ============================================================
-- 14. TASK ATTACHMENTS — UPDATE
--
-- Admin / responsible mentor only
-- ============================================================

create policy "Mentors manage task attachments"
on storage.objects
for update
to authenticated
using (

    bucket_id = 'task_attachments'

    and public.can_manage_task_attachment(
        (storage.foldername(name))[1]
    )

)
with check (

    bucket_id = 'task_attachments'

    and public.can_manage_task_attachment(
        (storage.foldername(name))[1]
    )

);


-- ============================================================
-- 15. TASK ATTACHMENTS — DELETE
--
-- Admin / responsible mentor only
-- ============================================================

create policy "Mentors delete task attachments"
on storage.objects
for delete
to authenticated
using (

    bucket_id = 'task_attachments'

    and public.can_manage_task_attachment(
        (storage.foldername(name))[1]
    )

);


-- ============================================================
-- 16. VERIFY BUCKETS
-- ============================================================

select
    id,
    name,
    public
from storage.buckets
where id in (
    'e_documents',
    'task_attachments'
)
order by id;


-- ============================================================
-- 17. VERIFY STORAGE POLICIES
-- ============================================================

select
    policyname,
    cmd,
    qual,
    with_check
from pg_policies
where schemaname = 'storage'
  and tablename = 'objects'
order by policyname;


-- ============================================================
-- EXPECTED ACCESS
-- ============================================================

-- ------------------------------------------------------------
-- e_documents
-- ------------------------------------------------------------
--
-- TRAINEE
--   SELECT own       ✅
--   INSERT own       ✅
--   UPDATE own       ✅
--   DELETE own       ✅
--
-- MENTOR
--   SELECT managed trainee documents ✅
--   UPDATE trainee documents         ❌
--   DELETE trainee documents         ❌
--
-- ADMIN
--   SELECT / INSERT / UPDATE / DELETE ✅
--
--
-- ------------------------------------------------------------
-- task_attachments
-- ------------------------------------------------------------
--
-- ASSIGNED TRAINEE
--   SELECT  ✅
--   INSERT  ✅
--   UPDATE  ❌
--   DELETE  ❌
--
-- PROJECT/TASK MENTOR
--   SELECT  ✅
--   INSERT  ✅
--   UPDATE  ✅
--   DELETE  ✅
--
-- ADMIN
--   SELECT  ✅
--   INSERT  ✅
--   UPDATE  ✅
--   DELETE  ✅
--
-- ============================================================
-- END
-- ============================================================
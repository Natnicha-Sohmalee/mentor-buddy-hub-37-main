-- Enable the modules backed by tables in the current Supabase schema.
-- Run after 03_atlas_core_rls_fix.sql.

drop policy if exists "Users can view approved articles or own articles" on public.articles;
create policy "Users can view approved articles or own articles"
on public.articles for select to authenticated
using (status = 'approved' or author_id = auth.uid() or public.is_admin());

drop policy if exists "Users can create own articles" on public.articles;
create policy "Users can create own articles"
on public.articles for insert to authenticated
with check (author_id = auth.uid());

drop policy if exists "Authors can update own pending articles" on public.articles;
create policy "Authors can update own pending articles"
on public.articles for update to authenticated
using (author_id = auth.uid() and status = 'pending')
with check (author_id = auth.uid() and status = 'pending');

drop policy if exists "Users can view own documents" on public.documents;
create policy "Users can view own documents"
on public.documents for select to authenticated
using (uploader_id = auth.uid() or public.is_admin());

drop policy if exists "Users can register own documents" on public.documents;
create policy "Users can register own documents"
on public.documents for insert to authenticated
with check (uploader_id = auth.uid());

drop policy if exists "Mentors can create appointments" on public.appointments;
create policy "Mentors can create appointments"
on public.appointments for insert to authenticated
with check (public.is_mentor());

drop policy if exists "Users can add themselves to appointments" on public.appointment_participants;
create policy "Users can add themselves to appointments"
on public.appointment_participants for insert to authenticated
with check (user_id = auth.uid());

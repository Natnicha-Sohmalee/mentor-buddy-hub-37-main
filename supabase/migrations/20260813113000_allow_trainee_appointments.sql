-- Trainees may create a personal consultation/meeting and add themselves.
drop policy if exists "Mentors can create appointments" on public.appointments;
create policy "Users can create own appointments"
on public.appointments for insert to authenticated
with check (created_by = auth.uid() and (public.is_mentor() or public.is_trainee()));

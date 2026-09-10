-- À exécuter une seule fois dans Supabase > SQL Editor
-- Ajoute la colonne image de couverture, sans toucher aux données existantes.
alter table public.invite_events add column if not exists hero_image_url text;

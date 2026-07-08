
-- =========================================================
-- SITE STATS (singleton, public read)
-- =========================================================
CREATE TABLE public.site_stats (
  id BOOLEAN PRIMARY KEY DEFAULT true CHECK (id = true),
  total_addons INTEGER NOT NULL DEFAULT 0,
  active_addons INTEGER NOT NULL DEFAULT 0,
  inactive_addons INTEGER NOT NULL DEFAULT 0,
  community_members INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_stats TO anon, authenticated;
GRANT ALL ON public.site_stats TO service_role;

ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site stats are public" ON public.site_stats
  FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.site_stats (id, total_addons, active_addons, inactive_addons, community_members)
VALUES (true, 9775, 2691, 7084, 12480);

-- =========================================================
-- ANNOUNCEMENTS (news feed, public read for published)
-- =========================================================
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title_ar TEXT NOT NULL,
  title_en TEXT,
  excerpt_ar TEXT NOT NULL,
  body_ar TEXT NOT NULL,
  tag TEXT NOT NULL DEFAULT 'update' CHECK (tag IN ('update','release','event','news')),
  image_url TEXT,
  pinned BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.announcements TO anon, authenticated;
GRANT ALL ON public.announcements TO service_role;

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published announcements are public" ON public.announcements
  FOR SELECT TO anon, authenticated
  USING (published_at <= now());

CREATE INDEX announcements_published_at_idx ON public.announcements (published_at DESC);

CREATE OR REPLACE FUNCTION public.tg_announcements_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION public.tg_announcements_updated_at();

-- =========================================================
-- SEED ANNOUNCEMENTS
-- =========================================================
INSERT INTO public.announcements (slug, title_ar, title_en, excerpt_ar, body_ar, tag, pinned, published_at) VALUES
(
  'sound-heavy-launch',
  'إطلاق باقة Sound Heavy الجديدة',
  'Sound Heavy Pack Released',
  'أصوات أسلحة ثقيلة بجودة سينمائية، صدى عميق، وإحساس مختلف بكل طلقة.',
  'اليوم نطلق باقة Sound Heavy — مجموعة أصوات مصممة خصيصاً للأسلحة الثقيلة داخل FiveM. الباقة تتضمن أصوات محدثة لـ Heavy Sniper و Minigun و RPG مع صدى ديناميكي داخل المباني وخارجها. كل صوت تم تسجيله وتعديله يدوياً ليعطي رهبة حقيقية في كل معركة. متوفر الآن في المتجر.',
  'release',
  true,
  now() - interval '2 hours'
),
(
  'grfx-v3',
  'تحديث GRFX الإصدار الثالث',
  'GRFX v3 Update',
  'تحسينات كبيرة على الإضاءة والألوان مع دعم كامل لأحدث نسخ FiveM.',
  'الإصدار الثالث من GRFX يجلب معه إعادة معايرة كاملة للألوان، تحسين واقعية الإضاءة الليلية بنسبة 40%، ودعم كامل لأحدث بيلد من FiveM. أضفنا أيضاً بريسيت جديد باسم "Cinematic Night" مصمم خصيصاً لعشاق التصوير داخل اللعبة.',
  'update',
  false,
  now() - interval '1 day'
),
(
  'community-milestone',
  'تجاوزنا 12,000 عضو في الديسكورد',
  'Discord Community hits 12k',
  'مجتمعنا يكبر يوم بعد يوم — شكراً لكل شخص كان جزء من هذي الرحلة.',
  'حدث تاريخي في مسيرة Lux Addons — تجاوز مجتمعنا على الديسكورد حاجز الـ12,000 عضو. هذا الرقم ما كان ليتحقق بدون دعمكم اليومي وثقتكم فينا. قادم قريباً: حدث خاص للمجتمع مع جوائز وباقات مجانية للأعضاء الأوائل.',
  'event',
  false,
  now() - interval '3 days'
);

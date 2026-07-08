import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { announcementsQuery, type Announcement } from "@/lib/site-queries";
import logoAsset from "@/assets/lux-logo.png.asset.json";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Lux Addons — News & Announcements" },
      { name: "description", content: "آخر أخبار وتحديثات Lux Addons — إطلاقات، فعاليات، ومستجدات الفريق." },
      { property: "og:title", content: "Lux Addons — Newsroom" },
      { property: "og:description", content: "آخر أخبار وتحديثات Lux Addons." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: logoAsset.url },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(announcementsQuery());
    return null;
  },
  errorComponent: NewsError,
  notFoundComponent: NewsError,
  component: NewsPage,
});

function NewsError() {
  return (
    <div className="min-h-screen bg-background text-foreground grid place-items-center px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold mb-3">لم يتوفر المحتوى</h1>
        <p className="text-muted-foreground mb-6">حاول مرة أخرى بعد قليل.</p>
        <Link to="/" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background text-[11px] tracking-[0.25em] uppercase font-medium">← العودة</Link>
      </div>
    </div>
  );
}

const TAG_LABEL: Record<Announcement["tag"], { en: string; ar: string }> = {
  release: { en: "Release", ar: "إطلاق" },
  update: { en: "Update", ar: "تحديث" },
  event: { en: "Event", ar: "فعالية" },
  news: { en: "News", ar: "خبر" },
};

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "الآن";
  if (m < 60) return `قبل ${m} دقيقة`;
  const h = Math.floor(m / 60);
  if (h < 24) return `قبل ${h} ساعة`;
  const d = Math.floor(h / 24);
  if (d < 30) return `قبل ${d} يوم`;
  return new Date(iso).toLocaleDateString("ar", { year: "numeric", month: "long", day: "numeric" });
}

function NewsPage() {
  const { data } = useSuspenseQuery(announcementsQuery());

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/50 border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoAsset.url} alt="Lux Addons" className="size-11 rounded-full ring-1 ring-white/15 group-hover:ring-white/40 transition" />
            <div className="leading-tight">
              <div className="font-display font-semibold tracking-[0.2em] text-[13px]">LUX ADDONS</div>
              <div className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground">Newsroom</div>
            </div>
          </Link>
          <Link to="/" className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground hover:text-foreground transition">← Home</Link>
        </nav>
      </header>

      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">— Newsroom</div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">آخر الأخبار</h1>
            <p dir="rtl" className="font-arabic text-muted-foreground max-w-xl mt-5 leading-[2]">
              كل جديد في عالم Lux Addons — إطلاقات، تحديثات، فعاليات، وقصص من داخل الفريق.
            </p>
          </div>

          {data.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground font-arabic">لا توجد أخبار حالياً.</div>
          ) : (
            <ul className="space-y-5">
              {data.map((a) => (
                <li key={a.id}>
                  <Link
                    to="/news/$slug"
                    params={{ slug: a.slug }}
                    className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/25 transition p-7 md:p-9"
                  >
                    {a.pinned && (
                      <div className="absolute top-0 right-0 flex items-center gap-1.5 px-3 py-1 rounded-bl-2xl bg-gradient-to-r from-[oklch(0.75_0.18_85)]/25 to-transparent border-b border-l border-[oklch(0.75_0.18_85)]/40 text-[9px] tracking-[0.3em] uppercase text-[oklch(0.85_0.15_85)]">
                        <span className="size-1 rounded-full bg-[oklch(0.85_0.15_85)]" /> Pinned
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                        <span className="size-1 rounded-full bg-emerald-400" />
                        {TAG_LABEL[a.tag].en}
                      </span>
                      <span dir="rtl" className="font-arabic">{formatRelative(a.published_at)}</span>
                    </div>
                    <h2 dir="rtl" className="font-arabic font-semibold text-2xl md:text-3xl leading-tight mb-3 group-hover:text-foreground transition">{a.title_ar}</h2>
                    <p dir="rtl" className="font-arabic text-muted-foreground leading-[2] text-[15px] max-w-3xl">{a.excerpt_ar}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-foreground/70 group-hover:text-foreground transition">
                      Read More →
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <footer className="border-t border-white/5 py-10 px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-[10px] tracking-[0.3em] uppercase text-muted-foreground text-center">© 2026 Lux Addons</div>
      </footer>
    </div>
  );
}

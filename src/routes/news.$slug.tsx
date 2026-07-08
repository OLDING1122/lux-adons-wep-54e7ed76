import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { announcementBySlugQuery, type Announcement } from "@/lib/site-queries";
import logoAsset from "@/assets/lux-logo.png.asset.json";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(announcementBySlugQuery(params.slug));
    if (!data) throw notFound();
    return null;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Lux Addons" }, { name: "robots", content: "noindex" }] };
    }
    // loader returned null on success (data was cached); we still don't have the item here reliably,
    // so leaf metadata is set from the client render. Provide sensible defaults.
    return {
      meta: [
        { title: `Lux Addons — ${params.slug}` },
        { name: "description", content: "خبر من Lux Addons" },
        { property: "og:type", content: "article" },
        { property: "og:image", content: logoAsset.url },
      ],
      links: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" },
      ],
    };
  },
  errorComponent: NotFoundOrError,
  notFoundComponent: NotFoundOrError,
  component: AnnouncementPage,
});

const TAG_LABEL: Record<Announcement["tag"], string> = {
  release: "Release · إطلاق",
  update: "Update · تحديث",
  event: "Event · فعالية",
  news: "News · خبر",
};

function NotFoundOrError() {
  return (
    <div className="min-h-screen bg-background text-foreground grid place-items-center px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold mb-3">الخبر غير متوفر</h1>
        <p className="text-muted-foreground mb-6">ربما تم حذفه أو الرابط غير صحيح.</p>
        <Link to="/news" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-background text-[11px] tracking-[0.25em] uppercase font-medium">← جميع الأخبار</Link>
      </div>
    </div>
  );
}

function AnnouncementPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(announcementBySlugQuery(slug));
  if (!data) return <NotFoundOrError />;

  const dateStr = new Date(data.published_at).toLocaleDateString("ar", {
    year: "numeric", month: "long", day: "numeric",
  });

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
          <Link to="/news" className="text-[11px] tracking-[0.28em] uppercase text-muted-foreground hover:text-foreground transition">← All News</Link>
        </nav>
      </header>

      <main className="pt-32 pb-24 px-6 md:px-10">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                <span className="size-1 rounded-full bg-emerald-400" />
                {TAG_LABEL[data.tag]}
              </span>
              <span>·</span>
              <time dir="rtl" className="font-arabic">{dateStr}</time>
            </div>
            <h1 dir="rtl" className="font-arabic font-bold text-3xl md:text-5xl leading-[1.3] mb-5">{data.title_ar}</h1>
            {data.title_en && (
              <p className="font-display text-lg text-muted-foreground tracking-wide">{data.title_en}</p>
            )}
          </div>

          {data.image_url && (
            <div className="mb-10 overflow-hidden rounded-2xl border border-white/10">
              <img src={data.image_url} alt={data.title_ar} className="w-full object-cover" />
            </div>
          )}

          <div className="mb-10 p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            <p dir="rtl" className="font-arabic text-[17px] leading-[2] text-foreground/90">{data.excerpt_ar}</p>
          </div>

          <div dir="rtl" className="font-arabic text-[16px] leading-[2.1] text-foreground/85 whitespace-pre-wrap">
            {data.body_ar}
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center gap-4 justify-between">
            <Link to="/news" className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-muted-foreground hover:text-foreground transition">← All News</Link>
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">© Lux Addons</div>
          </div>
        </article>
      </main>
    </div>
  );
}

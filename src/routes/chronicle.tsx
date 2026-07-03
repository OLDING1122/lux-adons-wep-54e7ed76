import { createFileRoute, Link } from "@tanstack/react-router";
import logoAsset from "@/assets/lux-logo.png.asset.json";

export const Route = createFileRoute("/chronicle")({
  head: () => ({
    meta: [
      { title: "The Chronicle · Lux Addons" },
      { name: "description", content: "السجل التاريخي لـ Lux Addons — رحلة التأسيس، المحطات، والفصول الكبرى." },
      { property: "og:title", content: "The Chronicle — Lux Addons" },
      { property: "og:description", content: "من الفكرة إلى الأسطورة — وثيقة رحلة Lux Addons." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Caveat:wght@500;700&display=swap" },
    ],
  }),
  component: ChroniclePage,
});

type Chapter = {
  roman: string;
  era: string;
  title: string;
  arTitle: string;
  body: string;
  marks: string[];
};

const CHAPTERS: Chapter[] = [
  {
    roman: "I",
    era: "The Origin · النشأة",
    title: "A Spark in the Dark",
    arTitle: "شرارة في العتمة",
    body: "من فكرة بسيطة بين مجموعة مؤمنة بمجتمع فايف ام العربي، وُلد Lux Addons. لم يكن هدفنا في البداية سوى تقديم أدون واحد نفخر به — ومنه بدأت القصة.",
    marks: ["أول اجتماع للمؤسسين", "اختيار اسم Lux", "تصميم الشعار الأول"],
  },
  {
    roman: "II",
    era: "The Foundation · التأسيس",
    title: "The First Stone",
    arTitle: "الحجر الأول",
    body: "تأسّس السيرفر رسمياً على يد المالك OLD و BO MANSOR، ومعهما وُضِعت أولى القوانين، أول رتب، وأول أدون رسمي نُشر للمجتمع مجاناً. من هنا بدأت الهوية.",
    marks: ["تأسيس OLD و BO MANSOR", "افتتاح الديسكورد", "إطلاق أول أدون مجاني"],
  },
  {
    roman: "III",
    era: "The Awakening · اليقظة",
    title: "Rise of the Craft",
    arTitle: "صعود الحرفة",
    body: "دخلنا مرحلة التطوير الجاد — Graphics, Sound, Blood FX. أصبحت Lux تُعرف بجودة الأدونز والاهتمام بالتفاصيل، وبدأ اسمنا ينتشر بين مجتمعات فايف ام.",
    marks: ["Grfx v1", "Sound MK2", "أول 1,000 عضو"],
  },
  {
    roman: "IV",
    era: "The Expansion · التوسّع",
    title: "New Horizons",
    arTitle: "آفاق جديدة",
    body: "توسّع الطاقم، وانضم مشرفون ومطورون جدد. افتتحنا المتجر الرسمي، وأطلقنا سلسلة أدونز متكاملة تخدم جميع أنواع السيرفرات.",
    marks: ["تأسيس مجلس الإدارة", "افتتاح المتجر", "طاقم إداري كامل"],
  },
  {
    roman: "V",
    era: "The Present · الحاضر",
    title: "The Legend Continues",
    arTitle: "الأسطورة مستمرّة",
    body: "اليوم، Lux Addons ليست مجرّد مصدر أدونز — بل مدرسة وهوية. نصنع محلياً، نُطوّر بأنفسنا، ونقدّم للمجتمع العربي أفضل ما نستطيع.",
    marks: ["تصنيع محلي", "دعم مستمر", "مجتمع متكامل"],
  },
  {
    roman: "VI",
    era: "The Future · المستقبل",
    title: "Chapter Unwritten",
    arTitle: "الفصل القادم",
    body: "ما زالت الصفحات تُكتب. أدونز جديدة، أحداث، وتحديثات كبرى قادمة. المستقبل ملك من يبنيه — ونحن نبنيه معكم.",
    marks: ["تحديثات موسمية", "أحداث حصرية", "ميزات جديدة"],
  },
];

const MILESTONES: { year: string; label: string; ar: string }[] = [
  { year: "2023", label: "Founded", ar: "التأسيس" },
  { year: "2024", label: "First 1K", ar: "أول ألف" },
  { year: "2025", label: "Store Live", ar: "المتجر" },
  { year: "2026", label: "Al-Wathiqa", ar: "الوثيقة" },
];

function ChroniclePage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground relative overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
    >
      {/* Ambient backdrop matching site */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 size-[900px] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle,oklch(0.45_0.18_260),transparent_65%)]" />
        <div className="absolute bottom-[-200px] right-[-100px] size-[600px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle,oklch(0.5_0.15_265),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      {/* Top bar */}
      <header className="relative z-10 backdrop-blur-xl bg-background/40 border-b border-white/5">
        <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoAsset.url}
              alt="Lux Addons"
              className="size-10 rounded-full ring-1 ring-white/15 group-hover:ring-white/40 transition"
            />
            <div className="leading-tight">
              <div className="font-semibold tracking-[0.2em] text-[13px]">LUX ADDONS</div>
              <div className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground">The Chronicle</div>
            </div>
          </Link>
          <Link
            to="/"
            className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition"
          >
            ← Home
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative max-w-5xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16">
        <div className="flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
          <span className="h-px w-12 bg-white/15" />
          <span>Chronicle · MMXXVI</span>
        </div>

        <h1
          className="text-6xl md:text-8xl leading-[0.95] tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
        >
          <span className="block italic text-foreground/95">The Chronicle</span>
          <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.85_0.12_85)] via-[oklch(0.75_0.15_260)] to-[oklch(0.65_0.18_265)]">
            سجـلّ الأســاطـيـر
          </span>
        </h1>

        <p
          dir="rtl"
          className="font-arabic mt-8 text-[15px] leading-[2.1] text-muted-foreground max-w-2xl"
        >
          هذه رحلة <span className="text-foreground font-medium">Lux Addons</span> — كل فصل يحكي مرحلة، وكل مرحلة تحكي
          قراراً، جهداً، وأشخاصاً آمنوا بأن مجتمع فايف ام العربي يستحقّ الأفضل. اقرأ القصة كما حدثت.
        </p>

        {/* Milestone strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
          {MILESTONES.map((m) => (
            <div
              key={m.year}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 backdrop-blur-sm hover:border-[oklch(0.7_0.15_260)]/40 transition"
            >
              <div className="font-mono text-[10px] tracking-[0.3em] text-[oklch(0.8_0.12_85)]/80">
                {m.year}
              </div>
              <div className="mt-1 font-semibold text-sm tracking-wide">{m.label}</div>
              <div dir="rtl" className="font-arabic text-[11px] text-muted-foreground mt-0.5">
                {m.ar}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="relative max-w-5xl mx-auto px-6 md:px-10 pb-24">
        <div className="relative">
          {/* Vertical spine */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[oklch(0.7_0.15_260)]/40 to-transparent"
          />

          <ol className="space-y-16 md:space-y-24">
            {CHAPTERS.map((c, i) => {
              const isRight = i % 2 === 0;
              return (
                <li key={c.roman} className="relative">
                  {/* Node */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-6 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full blur-md bg-[oklch(0.7_0.15_260)]/50" />
                      <div className="relative size-4 rounded-full border border-[oklch(0.8_0.12_85)]/60 bg-background grid place-items-center">
                        <div className="size-1.5 rounded-full bg-[oklch(0.8_0.12_85)]" />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`grid md:grid-cols-2 gap-8 md:gap-16 pl-16 md:pl-0 ${
                      isRight ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    {/* Card */}
                    <div className={isRight ? "md:pr-10 md:text-right" : "md:pl-10"}>
                      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm overflow-hidden">
                        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.7_0.15_260)]/60 to-transparent" />
                        <div className="p-6 md:p-8">
                          <div
                            className={`flex items-baseline gap-3 ${
                              isRight ? "md:justify-end" : ""
                            }`}
                          >
                            <span
                              className="text-transparent bg-clip-text bg-gradient-to-br from-[oklch(0.85_0.12_85)] to-[oklch(0.6_0.15_265)] text-5xl md:text-6xl leading-none"
                              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                            >
                              {c.roman}
                            </span>
                            <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
                              Chapter
                            </span>
                          </div>

                          <div
                            className={`mt-4 text-[10px] tracking-[0.4em] uppercase text-[oklch(0.8_0.12_85)]/80 ${
                              isRight ? "md:text-right" : ""
                            }`}
                          >
                            {c.era}
                          </div>

                          <h2
                            className={`mt-3 text-2xl md:text-3xl font-semibold tracking-tight ${
                              isRight ? "md:text-right" : ""
                            }`}
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          >
                            <span className="italic">{c.title}</span>
                          </h2>
                          <div
                            dir="rtl"
                            className={`font-arabic text-lg text-foreground/90 mt-1 ${
                              isRight ? "md:text-right" : "text-right md:text-left"
                            }`}
                          >
                            {c.arTitle}
                          </div>

                          <p
                            dir="rtl"
                            className={`font-arabic mt-5 text-[14px] leading-[2] text-muted-foreground ${
                              isRight ? "md:text-right" : "text-right md:text-left"
                            }`}
                          >
                            {c.body}
                          </p>

                          <ul
                            dir="rtl"
                            className={`font-arabic mt-6 flex flex-wrap gap-2 ${
                              isRight ? "md:justify-end" : ""
                            }`}
                          >
                            {c.marks.map((m) => (
                              <li
                                key={m}
                                className="text-[11px] px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-foreground/80"
                              >
                                {m}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.7_0.15_260)]/60 to-transparent" />
                      </div>
                    </div>

                    {/* Opposite side decorative */}
                    <div className="hidden md:flex items-center">
                      <div
                        className={`w-full ${isRight ? "pl-10" : "pr-10 text-right"}`}
                      >
                        <div
                          className="text-[120px] leading-none text-transparent select-none"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 700,
                            WebkitTextStroke: "1px oklch(0.7 0.15 260 / 0.18)",
                          }}
                        >
                          {c.roman}
                        </div>
                        <div className="mt-2 text-[10px] tracking-[0.4em] uppercase text-muted-foreground/70">
                          {c.era.split("·")[0]?.trim()}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Sealing */}
        <div className="mt-20 pt-10 border-t border-white/5 text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
            الوثيقة · Al-Wathiqa
          </div>
          <div dir="rtl" className="font-arabic mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
            هذه وثيقة رسمية موقّعة من مالك ومؤسسي Lux Addons.
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-10">
            <div className="flex flex-col items-center">
              <div
                className="text-3xl text-foreground/95"
                style={{ fontFamily: "'Caveat', cursive", transform: "rotate(-4deg)" }}
              >
                OLD
              </div>
              <div className="mt-2 h-px w-28 bg-white/20" />
              <div dir="rtl" className="font-arabic text-[11px] text-muted-foreground mt-2">
                المالك
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className="text-3xl text-foreground/95"
                style={{ fontFamily: "'Caveat', cursive", transform: "rotate(-2deg)" }}
              >
                BO MANSOR
              </div>
              <div className="mt-2 h-px w-28 bg-white/20" />
              <div dir="rtl" className="font-arabic text-[11px] text-muted-foreground mt-2">
                المؤسس المشارك
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 h-10 px-6 rounded-full border border-white/15 text-[11px] tracking-[0.3em] uppercase hover:bg-white/5 transition"
            >
              ← Back to Lux
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

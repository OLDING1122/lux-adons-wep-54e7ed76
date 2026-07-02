import { createFileRoute, Link } from "@tanstack/react-router";
import logoAsset from "@/assets/lux-logo.png.asset.json";

export const Route = createFileRoute("/rules")({
  head: () => ({
    meta: [
      { title: "Rules · Lux Addons" },
      { name: "description", content: "قوانين Lux Addons الرسمية — وثيقة موقّعة من المالك ومجلس الإدارة." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Caveat:wght@500;700&display=swap" },
    ],
  }),
  component: RulesPage,
});

const RULES: { ar: string }[] = [
  { ar: "يُمنع منعاً باتاً السبّ والشتم بكافة أشكاله، سواء بين الأعضاء أو في القنوات العامة." },
  { ar: "يُمنع التحدّث في الأمور السياسية والدينية الحساسة داخل السيرفر والديسكورد." },
  { ar: "احترام جميع الأعضاء والإدارة واجب — أي تعدٍّ أو تنمّر يستوجب العقوبة فوراً." },
  { ar: "يُمنع نشر أو تداول محتوى مسيء، عنصري، أو مخل بالآداب العامة." },
  { ar: "يُمنع الإعلان عن سيرفرات أو مجتمعات أخرى داخل قنوات Lux Addons." },
  { ar: "يُمنع استغلال الثغرات (Exploits) أو استخدام أي برامج غش (Cheats / Mod Menu) داخل السيرفر." },
  { ar: "احترام الدائم بين الاعضاء مطلوب والتعاون مع الطاقم الاداري ." },
  { ar: "يُمنع التشهير بأعضاء أو إدارة Lux Addons على المنصات الخارجية. للشكاوى توجد قنوات رسمية." },
  { ar: "إعادة بيع أو توزيع الأدونز المشتراة من المتجر يُعرّض حسابك للحظر الدائم وملاحقة قانونية." },
  { ar: "احترام تعليمات الإدارة فوري وغير قابل للنقاش — الاعتراض يكون عبر التذاكر الرسمية." },
  { ar: "مجلس الادارة موقعة عهدة محاماة لاي امر يتطلب دخول القسم القانون لدينا تحت الانظمة و اللوائح القانونيه " },
  { ar: "يُمنع التحرّش أو إرسال رسائل خاصة مزعجة لأي عضو، خصوصاً الأعضاء الجدد." },
  { ar: "يُمنع رفع أو مشاركة روابط مشبوهة، ملفات تنفيذية، أو روابط تصيّد." },
  { ar: "الإدارة تحتفظ بحق تعديل القوانين في أي وقت، والنسخة المنشورة هنا هي المرجع الرسمي." },
];

function RulesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      {/* Ambient backdrop matching home */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 size-[900px] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle,oklch(0.45_0.18_260),transparent_65%)]" />
        <div className="absolute bottom-[-200px] right-[-100px] size-[600px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle,oklch(0.5_0.15_265),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
      </div>

      {/* Top bar */}
      <header className="relative z-10 backdrop-blur-xl bg-background/40 border-b border-white/5">
        <nav className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoAsset.url} alt="Lux Addons" className="size-10 rounded-full ring-1 ring-white/15 group-hover:ring-white/40 transition" />
            <div className="leading-tight">
              <div className="font-semibold tracking-[0.2em] text-[13px]">LUX ADDONS</div>
              <div className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground">Official Codex</div>
            </div>
          </Link>
          <Link to="/" className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition">← Home</Link>
        </nav>
      </header>

      <main className="relative max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
          <span className="h-px w-12 bg-white/15" />
          <span>Document · MMXXVI</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
          <span className="block">Official Rules</span>
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.85_0.12_85)] via-[oklch(0.75_0.15_260)] to-[oklch(0.65_0.18_265)]">
            القوانين الرسمية
          </span>
        </h1>

        <p dir="rtl" className="font-arabic mt-8 text-[15px] leading-[2.1] text-muted-foreground max-w-2xl">
          هذه وثيقة قوانين <span className="text-foreground font-medium">Lux Addons</span> الرسمية. كل من ينضم
          للمجتمع يُعتبر مُقرّاً بها وملتزماً بكامل بنودها. مَن خالف، تُتّخذ بحقّه العقوبة المناسبة دون سابق إنذار،
          وفق تقدير مجلس الإدارة.
        </p>

        {/* Document card */}
        <article className="mt-12 relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm overflow-hidden">
          {/* Top accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.7_0.15_260)]/60 to-transparent" />

          <div className="p-8 md:p-12">
            {/* Header strip */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <img src={logoAsset.url} alt="" className="size-10 rounded-full ring-1 ring-white/15" />
                <div>
                  <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">Codex</div>
                  <div className="font-semibold tracking-[0.18em] text-sm">LUX ADDONS · RULES</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Revision</div>
                <div className="font-mono text-sm text-foreground/80">v1.0 — 2026</div>
              </div>
            </div>

            {/* Rules list */}
            <ol className="mt-10 space-y-6">
              {RULES.map((r, i) => (
                <li key={i} dir="rtl" className="group flex gap-5 items-start font-arabic">
                  <div className="shrink-0 w-12 text-left">
                    <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/70">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-1 h-px w-6 bg-gradient-to-r from-[oklch(0.7_0.15_260)] to-transparent" />
                  </div>
                  <p className="leading-[2.1] text-[15px] text-foreground/90 flex-1 group-hover:text-foreground transition">
                    {r.ar}
                  </p>
                </li>
              ))}
            </ol>

            {/* Sealing block */}
            <div className="mt-14 pt-10 border-t border-white/5">
              <div className="text-center">
                <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">Sealed & Signed</div>
                <div dir="rtl" className="font-arabic mt-2 text-sm text-foreground/80">
                  ختمت هذه الوثيقة بتوقيع المالك ومجلس إدارة <span className="font-semibold">Lux Addons</span>.
                </div>
              </div>

              {/* Signatures */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Owner signature */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 relative overflow-hidden">
                  <div className="absolute top-3 right-3 text-[9px] tracking-[0.35em] uppercase text-[oklch(0.8_0.12_85)]/70">Owner</div>
                  <div
                    className="text-5xl text-foreground/95 leading-none pb-2"
                    style={{ fontFamily: "'Caveat', cursive", transform: "rotate(-4deg)" }}
                  >
                    OLD
                  </div>
                  <div className="mt-4 h-px bg-gradient-to-r from-white/30 to-transparent" />
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold tracking-wide text-sm">OLD</div>
                      <div dir="rtl" className="font-arabic text-[11px] text-muted-foreground mt-0.5">المالك · Founder</div>
                    </div>
                    <div className="size-10 rounded-full border border-[oklch(0.7_0.15_260)]/40 grid place-items-center text-[10px] tracking-[0.2em] text-[oklch(0.8_0.12_85)]/80">
                      LX
                    </div>
                  </div>
                </div>

                {/* Council signature */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 relative overflow-hidden">
                  <div className="absolute top-3 right-3 text-[9px] tracking-[0.35em] uppercase text-[oklch(0.8_0.12_85)]/70">Council</div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl text-foreground/90" style={{ fontFamily: "'Caveat', cursive", transform: "rotate(-3deg)" }}>AbuHaJeRrR</span>
                    <span className="text-3xl text-foreground/90" style={{ fontFamily: "'Caveat', cursive", transform: "rotate(2deg)" }}>Bn Mansour</span>
                  </div>
                  <div className="mt-4 h-px bg-gradient-to-r from-white/30 to-transparent" />
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold tracking-wide text-sm">Board of Directors</div>
                      <div dir="rtl" className="font-arabic text-[11px] text-muted-foreground mt-0.5">مجلس الإدارة</div>
                    </div>
                    <div className="size-10 rounded-full border border-[oklch(0.7_0.15_260)]/40 grid place-items-center text-[10px] tracking-[0.2em] text-[oklch(0.8_0.12_85)]/80">
                      ✦
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3 text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                <span className="h-px w-12 bg-white/15" />
                <span>Issued by the Lux Council · MMXXVI</span>
                <span className="h-px w-12 bg-white/15" />
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.7_0.15_260)]/60 to-transparent" />
        </article>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 h-10 px-6 rounded-full border border-white/15 text-[11px] tracking-[0.3em] uppercase hover:bg-white/5 transition"
          >
            ← Back to Lux
          </Link>
        </div>
      </main>
    </div>
  );
}

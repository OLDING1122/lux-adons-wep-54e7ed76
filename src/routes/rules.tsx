import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/rules")({
  head: () => ({
    meta: [
      { title: "Rules · Lux Addons" },
      { name: "description", content: "قوانين Lux Addons — وثيقة رسمية لسيرفر ومجتمع Lux." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=IM+Fell+English:ital@0;1&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: RulesPage,
});

const RULES: { ar: string; note?: string }[] = [
  { ar: "يُمنع منعاً باتاً السبّ والشتم بكافة أشكاله، سواء بين الأعضاء أو في القنوات العامة." },
  { ar: "يُمنع التحدّث في الأمور السياسية والدينية الحساسة داخل السيرفر والديسكورد." },
  { ar: "احترام جميع الأعضاء والإدارة واجب — أي تعدٍّ أو تنمّر يستوجب العقوبة فوراً." },
  { ar: "يُمنع نشر أو تداول محتوى مسيء، عنصري، أو مخل بالآداب العامة." },
  { ar: "يُمنع الإعلان عن سيرفرات أو مجتمعات أخرى داخل قنوات Lux Addons." },
  { ar: "يُمنع استغلال الثغرات (Exploits) أو استخدام أي برامج غش (Cheats / Mod Menu) داخل السيرفر." },
  { ar: "احترام الرول بلاي مطلوب — لا تخرج عن الشخصية (Break Character) إلا في حالات الطوارئ الإدارية." },
  { ar: "يُمنع التشهير بأعضاء أو إدارة Lux Addons على المنصات الخارجية. للشكاوى توجد قنوات رسمية." },
  { ar: "إعادة بيع أو توزيع الأدونز المشتراة من المتجر يُعرّض حسابك للحظر الدائم وملاحقة قانونية." },
  { ar: "احترام تعليمات الإدارة فوري وغير قابل للنقاش — الاعتراض يكون عبر التذاكر الرسمية." },
  { ar: "يُمنع استخدام أكثر من حساب (Multi-Account) لتجاوز العقوبات أو التحايل على القوانين." },
  { ar: "يُمنع التحرّش أو إرسال رسائل خاصة مزعجة لأي عضو، خصوصاً الأعضاء الجدد." },
  { ar: "يُمنع رفع أو مشاركة روابط مشبوهة، ملفات تنفيذية، أو روابط تصيّد." },
  { ar: "الإدارة تحتفظ بحق تعديل القوانين في أي وقت، والنسخة المنشورة هنا هي المرجع الرسمي." },
];

function RulesPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.06_0.01_265)] text-[oklch(0.92_0.02_85)] py-16 px-4 md:px-10 relative overflow-hidden">
      {/* atmospheric backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[700px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle,oklch(0.55_0.18_260),transparent_60%)]" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-[oklch(0.7_0.05_85)]">
          <Link to="/" className="hover:text-[oklch(0.95_0.05_85)] transition">← Lux Addons</Link>
          <span>MMXXVI</span>
        </div>

        {/* Parchment */}
        <article
          className="relative rounded-sm p-10 md:p-16 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] border border-[oklch(0.35_0.06_60)]"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.88 0.06 80) 0%, oklch(0.82 0.07 75) 40%, oklch(0.7 0.08 60) 90%)",
            color: "oklch(0.22 0.04 40)",
          }}
        >
          {/* Burnt/torn edges */}
          <div className="pointer-events-none absolute inset-0 rounded-sm" style={{
            boxShadow: "inset 0 0 60px rgba(80,40,10,0.55), inset 0 0 180px rgba(40,20,5,0.35)",
          }} />
          {/* Paper grain */}
          <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply" style={{
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence baseFrequency='0.65' numOctaves='3'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }} />

          <div className="relative">
            <div className="text-center">
              <div className="font-[Cinzel] tracking-[0.5em] text-xs mb-3 opacity-70">— EST · MMXXVI —</div>
              <h1 className="font-[Cinzel] font-bold text-4xl md:text-6xl tracking-wider">RULES</h1>
              <div className="font-[Cinzel] tracking-[0.35em] text-sm mt-2 opacity-80">CODEX · LUX ADDONS</div>
              <div className="mt-6 mb-10 flex items-center justify-center gap-4">
                <span className="h-px flex-1 bg-[oklch(0.3_0.05_40)]/40 max-w-[120px]" />
                <span className="text-2xl">✦</span>
                <span className="h-px flex-1 bg-[oklch(0.3_0.05_40)]/40 max-w-[120px]" />
              </div>
              <p dir="rtl" className="font-[IBM_Plex_Sans_Arabic] text-[15px] leading-[2] max-w-xl mx-auto opacity-90">
                هذه وثيقة قوانين <span className="font-semibold">Lux Addons</span> الرسمية. كل من ينضم
                للمجتمع يُعتبر مُقرّاً بها وملتزماً بكامل بنودها. مَن خالف، تُتّخذ بحقّه العقوبة
                المناسبة دون سابق إنذار.
              </p>
            </div>

            <div className="mt-12 space-y-5">
              {RULES.map((r, i) => (
                <div key={i} dir="rtl" className="flex gap-4 items-start font-[IBM_Plex_Sans_Arabic]">
                  <div className="font-[Cinzel] text-2xl font-bold opacity-70 leading-none w-10 text-left shrink-0">
                    {toRoman(i + 1)}.
                  </div>
                  <p className="leading-[2.1] text-[15px] flex-1">{r.ar}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 pt-8 border-t border-[oklch(0.3_0.05_40)]/30 text-center">
              <p dir="rtl" className="font-[IBM_Plex_Sans_Arabic] text-sm opacity-80 max-w-md mx-auto leading-[2]">
                ختمت هذه الوثيقة بتوقيع مجلس إدارة <span className="font-semibold">Lux Addons</span>.
              </p>
              <div className="mt-6 font-[Cinzel] tracking-[0.4em] text-xs opacity-70">— SEALED BY THE COUNCIL —</div>
              <div className="mt-4 inline-block size-16 rounded-full border-4 border-[oklch(0.35_0.15_25)]/70 grid place-items-center">
                <div className="font-[Cinzel] font-bold text-[oklch(0.35_0.15_25)]/80 text-lg">LX</div>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 h-10 px-6 rounded-full border border-white/15 text-[oklch(0.92_0.02_85)] text-[11px] tracking-[0.3em] uppercase hover:bg-white/5 transition"
          >
            ← Back to Lux
          </Link>
        </div>
      </div>
    </div>
  );
}

function toRoman(n: number): string {
  const map: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  for (const [v, s] of map) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
}

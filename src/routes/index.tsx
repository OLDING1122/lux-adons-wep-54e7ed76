import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/lux-logo.png.asset.json";
import knightAsset from "@/assets/knight-castle-lit.png.asset.json";
import knightVideo from "@/assets/knight-castle.mp4.asset.json";

const DISCORD_URL = "https://discord.gg/lxx";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lux Addons — Premium FiveM Addons" },
      { name: "description", content: "Lux Addons — قصة نجاح في عالم تطوير وتقديم أدونز فايف ام." },
      { property: "og:title", content: "Lux Addons" },
      { property: "og:description", content: "كيف بدينا، كيف انطلقنا، وكيف وصلنا." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: logoAsset.url },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  component: Index,
});

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center gap-3 group ${className}`}>
      <img src={logoAsset.url} alt="Lux Addons" className="size-11 rounded-full ring-1 ring-white/15 group-hover:ring-white/40 transition" />
      <div className="leading-tight">
        <div className="font-display font-semibold tracking-[0.2em] text-[13px] text-foreground">LUX ADDONS</div>
        <div className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground">FiveM · Premium</div>
      </div>
    </a>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/50 border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Logo />
        <ul className="hidden md:flex items-center gap-9 text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
          <li><a href="#home" className="hover:text-foreground transition">Home</a></li>
          <li><a href="#story" className="hover:text-foreground transition">Story</a></li>
          <li><a href="#stats" className="hover:text-foreground transition">Stats</a></li>
          <li><a href="#team" className="hover:text-foreground transition">Team</a></li>
        </ul>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 h-9 px-5 rounded-full bg-foreground text-background text-[11px] tracking-[0.25em] uppercase font-medium hover:opacity-90 transition"
        >
          <DiscordIcon className="size-4" /> Discord
        </a>
      </nav>
    </header>
  );
}

function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3a14.5 14.5 0 0 0-.69 1.41 18.27 18.27 0 0 0-5.736 0A14.5 14.5 0 0 0 9.442 3a19.79 19.79 0 0 0-3.759 1.369C2.084 9.78 1.103 15.057 1.594 20.26a19.93 19.93 0 0 0 6.06 3.06c.49-.67.926-1.385 1.299-2.137a12.94 12.94 0 0 1-2.045-.98c.171-.126.34-.257.502-.39 3.928 1.81 8.18 1.81 12.06 0 .163.133.331.264.503.39-.654.387-1.34.717-2.046.98.374.752.81 1.467 1.3 2.137a19.86 19.86 0 0 0 6.06-3.06c.575-6.046-.98-11.275-4.07-15.89ZM8.02 16.43c-1.18 0-2.157-1.094-2.157-2.437 0-1.343.957-2.437 2.157-2.437 1.21 0 2.176 1.103 2.157 2.437 0 1.343-.957 2.437-2.157 2.437Zm7.96 0c-1.18 0-2.157-1.094-2.157-2.437 0-1.343.957-2.437 2.157-2.437 1.21 0 2.176 1.103 2.157 2.437 0 1.343-.947 2.437-2.157 2.437Z" />
    </svg>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-24">
      {/* Animated video background */}
      <div className="absolute inset-0">
        <video
          src={knightVideo.url}
          poster={knightAsset.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 size-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/55 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,oklch(0.04_0_0)_85%)]" />
        <div className="absolute -top-40 -right-40 size-[600px] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle,oklch(0.55_0.18_260),transparent_60%)] animate-castle-glow" />
        <div className="absolute -bottom-40 -left-40 size-[500px] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle,oklch(0.7_0.15_30),transparent_60%)] animate-castle-glow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 min-h-[calc(100vh-6rem)] flex flex-col justify-center pb-20">
        <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-6">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Online · FiveM Addons
        </div>

        <h1 className="font-display font-bold text-[clamp(2.5rem,9vw,7rem)] leading-[0.95] tracking-tight">
          Lux <span className="bg-gradient-to-br from-foreground via-foreground/70 to-foreground/30 bg-clip-text text-transparent">Addons</span>
        </h1>

        <p dir="rtl" className="font-arabic text-lg md:text-xl text-muted-foreground max-w-2xl mt-6 leading-[1.9]">
          ثلاثة أصدقاء، رؤية واحدة، ومجال واحد. هذي قصة كيف بدينا وكيف انطلقنا في عالم تطوير أدونز <span className="text-foreground">FiveM</span>.
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-10">
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 h-12 px-7 rounded-full bg-foreground text-background text-[12px] tracking-[0.25em] uppercase font-semibold hover:scale-[1.02] transition">
            <DiscordIcon className="size-4" /> Join Discord
          </a>
          <a href="#story" className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/15 text-foreground text-[12px] tracking-[0.25em] uppercase font-medium hover:bg-white/5 transition">
            Our Story →
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: "7,084", label: "Offline Addons", sub: "أدونز جاهزة للتحميل" },
    { value: "2,691", label: "Online Addons", sub: "أدونز نشطة الآن" },
    { value: "9,775", label: "Total Released", sub: "إجمالي الإصدارات" },
  ];
  return (
    <section id="stats" className="relative py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">— Live Metrics</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">Addons Stats</h2>
          </div>
          <p dir="rtl" className="font-arabic text-muted-foreground max-w-md">
            أرقام حقيقية تعكس حجم العمل اليومي ومستوى الإنتاج المستمر في Lux Addons.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div key={i} className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition overflow-hidden">
              <div className="absolute -top-20 -right-20 size-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle,oklch(0.65_0.2_265),transparent_60%)]" />
              <div className="relative">
                <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-6">0{i + 1}</div>
                <div className="font-display text-5xl md:text-6xl font-bold tabular-nums">{it.value}</div>
                <div className="mt-3 text-sm tracking-[0.2em] uppercase text-foreground/80">{it.label}</div>
                <div dir="rtl" className="font-arabic text-sm text-muted-foreground mt-1">{it.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="relative py-28 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-16">
        <div className="lg:sticky lg:top-28 self-start">
          <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">— Our Story</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1]">كيف<br/>بدينا.</h2>
          <p className="mt-6 text-muted-foreground text-sm tracking-wider">From day one — to today.</p>
        </div>

        <div dir="rtl" className="space-y-10 font-arabic">
          <div className="relative pr-6 border-r border-white/10">
            <div className="absolute -right-[5px] top-2 size-2.5 rounded-full bg-foreground" />
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">البداية · State Addons</div>
            <h3 className="font-display text-2xl font-semibold mb-3">من State Addons إلى Lux Addons</h3>
            <p className="text-foreground/80 leading-[2] text-[15px]">
              في بدايتنا، كنا باسم <span className="text-foreground font-semibold">State Addons</span>،
              ثلاث أشخاص يجمعهم حلم واحد وهو تقديم شي مختلف في مجال أدونز <span className="text-foreground font-semibold">FiveM</span>.
              بدينا بإمكانيات بسيطة، وبأدوات محدودة، لكن بشغف كبير ورؤية أكبر.
            </p>
          </div>

          <div className="relative pr-6 border-r border-white/10">
            <div className="absolute -right-[5px] top-2 size-2.5 rounded-full bg-foreground" />
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">التغيير · The Rebrand</div>
            <h3 className="font-display text-2xl font-semibold mb-3">تغيير الهوية، تغيير المسار</h3>
            <p className="text-foreground/80 leading-[2] text-[15px]">
              مع التغييرات والتحديثات والرؤية الطموحة، قررنا أن نغيّر الهوية إلى هوية ناجحة
              بعد <span className="text-foreground font-semibold">مراحل فشل</span> مررنا فيها.
              ولادة <span className="text-foreground font-semibold">Lux Addons</span> ما كانت مجرد اسم جديد،
              كانت إعادة تعريف لكل شي: للهدف، للمعايير، وللطموح.
            </p>
          </div>

          <div className="relative pr-6 border-r border-white/10">
            <div className="absolute -right-[5px] top-2 size-2.5 rounded-full bg-foreground" />
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">الفشل · The Lesson</div>
            <h3 className="font-display text-2xl font-semibold mb-3">الفشل ليس النهاية، بل البداية الحقيقية</h3>
            <p className="text-foreground/80 leading-[2] text-[15px]">
              الفشل اللي مررنا فيه ما كان فشل الفريق، بل كان <span className="text-foreground font-semibold">أحد أسباب النجاح</span>.
              تعلّمنا من كل تجربة، ومن كل خطأ، ومن كل لحظة وقفنا فيها وفكّرنا "وش الغلط؟".
              الفشل علّمنا الصبر، والتغيير علّمنا الشجاعة،
              والإصرار علّمنا إن الطريق للنجاح ما يمر إلا من بوابة المحاولة والسقوط والقيام من جديد.
              كل نسخة فاشلة كانت درس، وكل خطوة للخلف كانت تحضير لقفزة أكبر للأمام.
            </p>
          </div>

          <div className="relative pr-6 border-r border-white/10">
            <div className="absolute -right-[5px] top-2 size-2.5 rounded-full bg-foreground" />
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">الانطلاقة</div>
            <h3 className="font-display text-2xl font-semibold mb-3">نجاح مبهر في فترة وجيزة</h3>
            <p className="text-foreground/80 leading-[2] text-[15px]">
              بعد التغيير، كوّنّا <span className="text-foreground font-semibold">نجاح مبهر</span> في فترة قصيرة،
              بفضل العمل الجماعي والإصرار، وبفضل الجندي المجهول <span className="text-foreground font-semibold">AbuHaJeRrR</span>
              اللي يشتغل طوال السنة في التطوير والتنزيل، وهو صاحب أكبر فضل في نجاح الأدونز،
              والنجاح يعود إليه مع الطاقم الإداري.
            </p>
          </div>

          <div className="relative pr-6 border-r border-white/10">
            <div className="absolute -right-[5px] top-2 size-2.5 rounded-full bg-foreground" />
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">اليوم</div>
            <h3 className="font-display text-2xl font-semibold mb-3">مجتمع وثقة</h3>
            <p className="text-foreground/80 leading-[2] text-[15px]">
              اليوم، Lux Addons صار اسم يعتمد عليه آلاف اللاعبين، ومرجع للمطورين وأصحاب السيرفرات.
              بنينا ثقة، وبنينا مجتمع، وبنينا منصة تقدم محتوى يومي بجودة عالية.
              الطريق لسه طويل، والقادم أجمل.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const members = [
    { name: "OLD", role: "Founder · مؤسس", tag: "Vision" },
    { name: "AbuHaJeRrR", role: "Lead Developer · الجندي المجهول", tag: "Development" },
    { name: "Bn Mansour", role: "Founder · مؤسس", tag: "Operations" },
  ];
  return (
    <section id="team" className="relative py-28 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">— The Team</div>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-3">Founders & Crew</h2>
        <p dir="rtl" className="font-arabic text-muted-foreground max-w-xl mb-14">المؤسسون والطاقم اللي خلّوا Lux Addons يوصل لهذي المرحلة.</p>

        <div className="grid md:grid-cols-3 gap-5">
          {members.map((m, i) => (
            <div key={i} className="group relative p-7 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent hover:border-white/25 transition">
              <div className="flex items-center justify-between mb-8">
                <div className="size-12 rounded-full bg-foreground/10 ring-1 ring-white/15 grid place-items-center font-display font-bold">
                  {m.name.charAt(0)}
                </div>
                <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground px-2 py-1 rounded-full border border-white/10">{m.tag}</span>
              </div>
              <div className="font-display text-2xl font-semibold">{m.name}</div>
              <div className="text-sm text-muted-foreground mt-1">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-28 px-6 md:px-10">
      <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl border border-white/10 p-12 md:p-16 text-center bg-gradient-to-br from-white/[0.05] to-transparent">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-[500px] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle,oklch(0.6_0.2_260),transparent_60%)]" />
        <div className="relative">
          <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Join the Community</h3>
          <p dir="rtl" className="font-arabic text-muted-foreground mt-4 max-w-xl mx-auto">انضم لمجتمعنا في الديسكورد وكن جزء من قصة Lux Addons.</p>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 h-12 px-8 mt-8 rounded-full bg-foreground text-background text-[12px] tracking-[0.25em] uppercase font-semibold hover:scale-[1.02] transition">
            <DiscordIcon className="size-4" /> discord.gg/lxx
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        <span>© 2026 Lux Addons</span>
        <span>FiveM · Built with passion</span>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Story />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

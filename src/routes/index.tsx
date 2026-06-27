import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import logoAsset from "@/assets/lux-logo.png.asset.json";
import knightAsset from "@/assets/knight-castle-lit.png.asset.json";
import knightVideo from "@/assets/knights-night-battle.mp4.asset.json";
import oldBg from "@/assets/old-bg.jpg.asset.json";
import abuhajerBg from "@/assets/abuhajer-bg.png.asset.json";
import bnmansourBg from "@/assets/bnmansour-bg.png.asset.json";
import ogBg from "@/assets/admins/og.png.asset.json";
import slimBg from "@/assets/admins/slim.png.asset.json";
import adBg from "@/assets/admins/ad.png.asset.json";
import bjjBg from "@/assets/admins/bjj.png.asset.json";
import n6n5hBg from "@/assets/admins/6n5h.png.asset.json";
import crowBg from "@/assets/admins/crow.gif.asset.json";
import y7dBg from "@/assets/admins/y7d.png.asset.json";
import alhajriBg from "@/assets/admins/alhajri.png.asset.json";
import mstlBg from "@/assets/admins/mstl.png.asset.json";
import whyBg from "@/assets/admins/why.png.asset.json";
import v4e9Bg from "@/assets/admins/v4e9.png.asset.json";
import m1Bg from "@/assets/admins/m1.png.asset.json";
import m7mdBg from "@/assets/admins/m7md.png.asset.json";
import ro8iBg from "@/assets/admins/ro8i.png.asset.json";
import saeedBg from "@/assets/admins/saeed.png.asset.json";
import btolyBg from "@/assets/admins/btoly.png.asset.json";
import aBg from "@/assets/admins/a.png.asset.json";
import raindanceBg from "@/assets/admins/raindance.png.asset.json";
import abdullahBg from "@/assets/admins/abdullah.png.asset.json";
import grfxImg from "@/assets/roadmap/grfx.jpg.asset.json";
import citizenImg from "@/assets/roadmap/citizen.jpg.asset.json";
import bloodfxImg from "@/assets/roadmap/bloodfx.jpg.asset.json";
import soundfxImg from "@/assets/roadmap/soundfx.jpg.asset.json";
import soundmk2Img from "@/assets/roadmap/soundmk2.jpg.asset.json";
import soundheavyImg from "@/assets/roadmap/soundheavy.jpg.asset.json";
import reshadeImg from "@/assets/roadmap/reshade.jpg.asset.json";

const DISCORD_URL = "https://discord.gg/3RwEkB6k94";
const STORE_URL = "https://luxaddons.rmz.gg/";


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
        <ul className="hidden md:flex items-center gap-7 text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
          <li><a href="#home" className="hover:text-foreground transition">Home</a></li>
          <li><a href={STORE_URL} target="_blank" rel="noreferrer" className="font-arabic hover:text-foreground transition">المتجر</a></li>
          <li><a href="#story" className="hover:text-foreground transition">Story</a></li>
          <li><a href="#team" className="hover:text-foreground transition">Team</a></li>
          <li><a href="#roadmap" className="hover:text-foreground transition">Roadmap</a></li>
          <li><a href="#streams" className="hover:text-foreground transition">Streams</a></li>
          <li><a href="#faq" className="hover:text-foreground transition">FAQ</a></li>
          <li><Link to="/rules" className="hover:text-foreground transition">Rules</Link></li>
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
          className="absolute inset-0 size-full object-cover opacity-65"
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
          <a href={STORE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/15 text-foreground text-[12px] tracking-[0.25em] uppercase font-medium hover:bg-white/5 transition">
            STORE LUX →
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: "7,084", label: "Offline Addons", sub: "أدونز غير نشط " },
    { value: "2,691", label: "Online Addons", sub: "أدونز نشطة الآن" },
    { value: "9,775", label: "Total Released", sub: "إجمالي الانشطه " },
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
              بفضل العمل الجماعي والإصرار، وبفضل الجندي المجهول <span className="text-foreground font-semibold">AbuHaJeRrR</span>&nbsp;&nbsp;الذي&nbsp;&nbsp;يشتغل طوال السنة في التطوير والتنزيل، وهو صاحب الفضل الأكبر&nbsp;&nbsp;في نجاح الأدونز، والنجاح يعود إليه مع الطاقم الإداري&nbsp; .
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
    { name: "OLD", role: "Founder · مؤسس", tag: "Vision", bg: oldBg.url, pos: "object-left" },
    { name: "AbuHaJeRrR", role: "Lead Developer · الجندي المجهول", tag: "Development", bg: abuhajerBg.url, pos: "object-center" },
    { name: "Bn Mansour", role: "Founder · مؤسس", tag: "Operations", bg: bnmansourBg.url, pos: "object-center" },
  ];

  const admins: { name: string; rank: string; bg?: string; pos?: string }[] = [
    { name: "! OG", rank: "Lux Team · Addons Manager", bg: ogBg.url, pos: "object-center" },
    { name: "slim shady 👑", rank: "Lux Team · Addons Manager", bg: slimBg.url, pos: "object-center" },
    { name: "Lux | A D™", rank: "Lux Team · Addons Team", bg: adBg.url, pos: "object-center" },
    { name: "! Bjj", rank: "Lux Team · Addons Team", bg: bjjBg.url, pos: "object-top" },
    { name: "6n5h", rank: "Lux Team · Addons Team", bg: n6n5hBg.url, pos: "object-center" },
    { name: "Crow", rank: "Lux Team · Addons Team", bg: crowBg.url, pos: "object-center" },
    { name: "y7d", rank: "Lux Team · Addons Team", bg: y7dBg.url, pos: "object-top" },
    { name: "alhajri", rank: "Lux Team · Addons Team", bg: alhajriBg.url, pos: "object-center" },
    { name: "! MSTL", rank: "Lux Team · Addons Team", bg: mstlBg.url, pos: "object-center" },
    { name: "Why ?", rank: "Addons Team", bg: whyBg.url, pos: "object-top" },
    { name: "v4e9", rank: "Lux Team · Addons Team", bg: v4e9Bg.url, pos: "object-center" },
    { name: "M1!", rank: "Addons Team", bg: m1Bg.url, pos: "object-center" },
    { name: "M7MD", rank: "Addons Team", bg: m7mdBg.url, pos: "object-top" },
    { name: "Ro8i", rank: "Addons Team", bg: ro8iBg.url, pos: "object-center" },
    { name: "SaEed", rank: "Addons Team", bg: saeedBg.url, pos: "object-center" },
    { name: "بتولي الحب", rank: "Addons Team", bg: btolyBg.url, pos: "object-center" },
    { name: "A", rank: "Addons Team", bg: aBg.url, pos: "object-center" },
    { name: "Raindance", rank: "Addons Team", bg: raindanceBg.url, pos: "object-center" },
    { name: "Abdullah", rank: "Addons Team", bg: abdullahBg.url, pos: "object-center" },
  ];

  return (
    <section id="team" className="relative py-28 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">— The Team</div>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-3">Founders & Crew</h2>
        <p dir="rtl" className="font-arabic text-muted-foreground max-w-xl mb-14">المؤسسون والطاقم اللي خلّوا Lux Addons يوصل لهذي المرحلة.</p>

        <div className="grid md:grid-cols-3 gap-5">
          {members.map((m, i) => (
            <div key={i} className="group relative h-[420px] rounded-2xl border border-white/10 overflow-hidden hover:border-white/30 transition">
              <img src={m.bg} alt={m.name} className={`absolute inset-0 size-full object-cover ${m.pos} grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/40" />
              <div className="relative h-full flex flex-col justify-between p-7">
                <div className="flex items-center justify-between">
                  <div className="size-12 rounded-full bg-background/60 backdrop-blur ring-1 ring-white/20 grid place-items-center font-display font-bold">
                    {m.name.charAt(0)}
                  </div>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-foreground/90 px-2 py-1 rounded-full border border-white/20 bg-background/40 backdrop-blur">{m.tag}</span>
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold">{m.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{m.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider between founders and admin staff */}
        <div className="mt-24 mb-14 flex items-center gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground whitespace-nowrap">— Admin Staff · الطاقم الإداري</div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {admins.map((a, i) => (
            <div
              key={i}
              className="group relative h-44 rounded-xl border border-white/10 overflow-hidden bg-black hover:border-white/30 transition"
            >
              {a.bg ? (
                <img
                  src={a.bg}
                  alt={a.name}
                  className={`absolute inset-0 size-full object-cover ${a.pos ?? "object-center"} grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700`}
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.15_0_0),oklch(0.04_0_0))]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
              <div className="relative h-full flex flex-col justify-between p-5">
                <div className="flex items-center justify-between">
                  <div className="size-9 rounded-full bg-background/60 backdrop-blur ring-1 ring-white/20 grid place-items-center font-display font-bold text-sm text-foreground/90">
                    {a.name.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "").charAt(0).toUpperCase() || "•"}
                  </div>
                  <span className="text-[8px] tracking-[0.3em] uppercase text-foreground/80 px-2 py-1 rounded-full border border-white/15 bg-background/40 backdrop-blur">0{(i + 1).toString().padStart(2, "0").slice(-2)}</span>
                </div>
                <div>
                  <div className="font-display text-lg font-semibold leading-tight truncate">{a.name}</div>
                  <div className="text-[11px] text-muted-foreground mt-1 tracking-wide">{a.rank}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const KICK_CHANNELS = ["y7dd", "q5mv", "iabuhajeri", "osamah", "abuswe7l", "sxb"];
const ARCHIVE_KEY = "lux_kick_archive_v1";
const ARCHIVE_MAX = 12;

type LiveInfo = {
  slug: string;
  isLive: boolean;
  title?: string;
  viewers?: number;
  thumbnail?: string;
  category?: string;
  startedAt?: string;
};

type ArchiveItem = {
  slug: string;
  title: string;
  thumbnail?: string;
  category?: string;
  endedAt: string;
};

function KickIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden>
      <path d="M4 4h6v8h2V8h2V6h2V4h6v4h-2v2h-2v2h-2v4h2v2h2v2h2v4h-6v-2h-2v-2h-2v-4h-2v8H4V4z" />
    </svg>
  );
}

function Streams() {
  const [streams, setStreams] = useState<LiveInfo[]>(
    KICK_CHANNELS.map((s) => ({ slug: s, isLive: false }))
  );
  const [archive, setArchive] = useState<ArchiveItem[]>([]);

  // load archive from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ARCHIVE_KEY);
      if (raw) setArchive(JSON.parse(raw));
    } catch {}
  }, []);

  // poll kick
  useEffect(() => {
    let cancelled = false;
    let prev: Record<string, LiveInfo> = {};

    const fetchOne = async (slug: string): Promise<LiveInfo> => {
      try {
        const res = await fetch(`https://kick.com/api/v2/channels/${slug}`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) return { slug, isLive: false };
        const data = await res.json();
        const ls = data?.livestream;
        if (!ls) return { slug, isLive: false };
        return {
          slug,
          isLive: true,
          title: ls.session_title || ls.slug,
          viewers: ls.viewer_count,
          thumbnail: ls.thumbnail?.url || ls.thumbnail?.src,
          category: ls.categories?.[0]?.name,
          startedAt: ls.created_at,
        };
      } catch {
        return { slug, isLive: false };
      }
    };

    const tick = async () => {
      const results = await Promise.all(KICK_CHANNELS.map(fetchOne));
      if (cancelled) return;

      // detect endings → push to archive
      const newlyEnded: ArchiveItem[] = [];
      for (const r of results) {
        const before = prev[r.slug];
        if (before?.isLive && !r.isLive) {
          newlyEnded.push({
            slug: before.slug,
            title: before.title || before.slug,
            thumbnail: before.thumbnail,
            category: before.category,
            endedAt: new Date().toISOString(),
          });
        }
      }
      if (newlyEnded.length) {
        setArchive((curr) => {
          const next = [...newlyEnded, ...curr].slice(0, ARCHIVE_MAX);
          try { localStorage.setItem(ARCHIVE_KEY, JSON.stringify(next)); } catch {}
          return next;
        });
      }

      prev = Object.fromEntries(results.map((r) => [r.slug, r]));
      setStreams(results);
    };

    tick();
    const id = setInterval(tick, 60_000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  const liveCount = streams.filter((s) => s.isLive).length;

  return (
    <section id="streams" className="relative py-28 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-3">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3 flex items-center gap-2">
              <KickIcon className="size-3" /> — Kick Streams
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">Live on Kick</h2>
          </div>
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
            <span className={`size-1.5 rounded-full ${liveCount > 0 ? "bg-emerald-400 animate-pulse" : "bg-white/30"}`} />
            {liveCount} Live · {KICK_CHANNELS.length} Channels
          </div>
        </div>
        <p dir="rtl" className="font-arabic text-muted-foreground max-w-xl mb-12">بثوث طاقم Lux على منصة Kick — تحدث تلقائياً كل دقيقة.</p>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
          {/* Live grid — embedded Kick players */}
          <div className="grid sm:grid-cols-2 gap-4">
            {streams.map((s) => (
              <div
                key={s.slug}
                className="group relative aspect-video rounded-xl border border-white/10 overflow-hidden bg-black hover:border-white/30 transition"
              >
                <iframe
                  src={`https://player.kick.com/${s.slug}?muted=true&autoplay=false`}
                  title={`${s.slug} — Kick stream`}
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full"
                />
                {/* Channel chip overlay — pointer-events-none so the player stays clickable */}
                <div className="pointer-events-none absolute top-2 left-2 right-2 flex items-center justify-between gap-2">
                  <a
                    href={`https://kick.com/${s.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-display font-semibold text-foreground px-2.5 py-1 rounded-full border border-white/20 bg-background/70 backdrop-blur hover:border-white/40 transition"
                  >
                    <KickIcon className="size-2.5" /> @{s.slug}
                  </a>
                  {s.isLive && (
                    <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase text-foreground px-2 py-1 rounded-full border border-white/25 bg-background/60 backdrop-blur">
                      <span className="size-1.5 rounded-full bg-red-500 animate-pulse" /> Live
                      {typeof s.viewers === "number" && (
                        <span className="tabular-nums text-foreground/80 ml-1">{s.viewers.toLocaleString()}</span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>


          {/* Archive */}
          <aside className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">— Recent · بثوث سابقة</div>
              <span className="text-[10px] text-muted-foreground tabular-nums">{archive.length}</span>
            </div>
            {archive.length === 0 ? (
              <div dir="rtl" className="font-arabic text-sm text-muted-foreground py-10 text-center">
                لا توجد بثوث محفوظة بعد. سيتم حفظ البثوث تلقائياً عند انتهائها.
              </div>
            ) : (
              <ul className="space-y-3 max-h-[26rem] overflow-y-auto pr-1">
                {archive.map((a, i) => (
                  <li key={i}>
                    <a
                      href={`https://kick.com/${a.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg border border-white/5 hover:border-white/20 hover:bg-white/[0.03] transition"
                    >
                      <div className="relative size-14 shrink-0 rounded-md overflow-hidden bg-black">
                        {a.thumbnail ? (
                          <img src={a.thumbnail} alt={a.title} className="size-full object-cover grayscale" />
                        ) : (
                          <div className="size-full bg-[radial-gradient(circle,oklch(0.15_0_0),oklch(0.04_0_0))]" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-medium truncate">@{a.slug}</div>
                        <div className="text-[11px] text-muted-foreground truncate">{a.title}</div>
                        <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">
                          {new Date(a.endedAt).toLocaleString("ar", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}



function Roadmap() {
  const items = [
    {
      tag: "Chapter I",
      title: "𝘎𝘙𝘍𝘟 Fivem",
      ar: "تطوير الجرافيكس والسيارات بلمسة لمعان وواقعية سينمائية.",
      img: grfxImg.url,
      side: "left" as const,
    },
    {
      tag: "Chapter II",
      title: "𝘊𝘪𝘵𝘪𝘻𝘦𝘯 Fivem",
      ar: "تحسين السماء، السحب، وأجواء الطقس داخل اللعبة.",
      img: citizenImg.url,
      side: "right" as const,
    },
    {
      tag: "Chapter III",
      title: "𝘉𝘭𝘰𝘰𝘥𝘧𝘹 Fivem",
      ar: "تأثيرات إصابات الطلقات، آثار الرصاص، والشرر الواقعي.",
      img: bloodfxImg.url,
      side: "left" as const,
    },
    {
      tag: "Chapter IV",
      title: "𝘚𝘰𝘶𝘯𝘥𝘍𝘹",
      ar: "أصوات الأسلحة بجودة سينمائية ومحاكاة واقعية لإطلاق النار.",
      img: soundfxImg.url,
      side: "right" as const,
    },
    {
      tag: "Chapter V",
      title: "𝘚𝘰𝘶𝘯𝘥 𝘔𝘬2",
      ar: "صوت سلاح Mk2 المخصص بتفاصيل دقيقة وإحساس مختلف.",
      img: soundmk2Img.url,
      side: "left" as const,
    },
    {
      tag: "Chapter VI",
      title: "𝘚𝘰𝘶𝘯𝘥 𝘏𝘦𝘢𝘷𝘺",
      ar: "صوت السلاح الهيفي — انفجار عميق، صدى ثقيل، ورهبة في كل طلقة.",
      img: soundheavyImg.url,
      side: "right" as const,
      heavy: true,
    },
    {
      tag: "Chapter VII",
      title: "𝘙𝘦𝘴𝘩𝘢𝘥𝘦",
      ar: "تحسين جودة الألوان والإضاءة لتجربة بصرية أكثر سينمائية.",
      img: reshadeImg.url,
      side: "left" as const,
    },
  ];

  return (
    <section id="roadmap" className="relative py-32 px-6 md:px-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 size-[600px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle,oklch(0.55_0.18_260),transparent_60%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">— The Roadmap</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">خارطة الطريق</h2>
          <p dir="rtl" className="font-arabic text-muted-foreground max-w-2xl mx-auto mt-6 leading-[2]">
            رؤيتنا للقادم: رفع الإنتاجية، توسيع نطاق العمل، زيادة تفاعل السيرفر، تطوير المجال،
            والدخول في تصنيع وتوريد الأدوات محلياً ومجاناً. الاستمرار في تنزيل وتطوير كل مايخص
            <span className="text-foreground"> FiveM</span>.
          </p>
        </div>

        {/* Vertical road line */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block" />

          <div className="space-y-20 md:space-y-32">
            {items.map((it, i) => {
              const isLeft = it.side === "left";
              return (
                <div key={i} className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  {/* Dot on the spine */}
                  <div className="absolute left-1/2 -translate-x-1/2 size-3 rounded-full bg-foreground ring-4 ring-background hidden md:block" />

                  {/* Image */}
                  <div className={`${isLeft ? "md:order-1" : "md:order-2"} relative group`}>
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[4/3]">
                      <img
                        src={it.img}
                        alt={it.title}
                        loading="lazy"
                        width={1024}
                        height={768}
                        className={`size-full object-cover transition-transform duration-[1.2s] group-hover:scale-105 ${it.heavy ? "saturate-[0.85] contrast-110" : ""}`}
                      />
                      <div className={`absolute inset-0 ${it.heavy ? "bg-gradient-to-t from-red-950/40 via-background/30 to-transparent" : "bg-gradient-to-t from-background/60 via-transparent to-transparent"}`} />
                      <div className="absolute top-4 left-4 text-[10px] tracking-[0.4em] uppercase text-foreground/90 bg-background/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                        {it.tag}
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`${isLeft ? "md:order-2 md:text-left" : "md:order-1 md:text-right"}`}>
                    <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">In Development</div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">{it.title}</h3>
                    <p dir="rtl" className="font-arabic text-muted-foreground leading-[2] text-[15px]">{it.ar}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-foreground/70">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Plan
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PatchNotes() {
  const patches = [
    {
      chapter: "Chapter IV",
      date: "Season 04 · 2026",
      title: "إضافة باقة Sound Heavy",
      notes: [
        "إضافة أصوات أسلحة ثقيلة جديدة بجودة سينمائية.",
        "تحسين توازن الصدى والانعكاسات داخل المباني.",
        "إصلاح مشاكل التزامن بين الصوت والمؤثرات.",
      ],
    },
    {
      chapter: "Chapter III",
      date: "Season 03 · 2026",
      title: "تحديث Reshade والألوان",
      notes: [
        "تدرّج لوني سينمائي جديد للأجواء الليلية.",
        "تحسين أداء الـReshade بنسبة 18%.",
        "إضافة بريسيت خاص لمحبي الواقعية.",
      ],
    },
    {
      chapter: "Chapter II",
      date: "Season 02 · 2025",
      title: "إطلاق BloodFX و SoundFX",
      notes: [
        "إضافة تأثيرات إصابة الرصاص والشرر.",
        "تحديث أصوات معظم الأسلحة الأساسية.",
        "تحسينات عامة على الأداء والاستقرار.",
      ],
    },
    {
      chapter: "Chapter I",
      date: "Season 01 · 2025",
      title: "البداية — إطلاق Lux Addons",
      notes: [
        "تحويل الهوية من State Addons إلى Lux Addons.",
        "إطلاق أول باقة Graphics وCitizen.",
        "افتتاح المتجر الرسمي والمجتمع على ديسكورد.",
      ],
    },
  ];

  return (
    <section id="patch" className="relative py-32 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">— Patch Notes</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">سجل التحديثات</h2>
          </div>
          <p dir="rtl" className="font-arabic text-muted-foreground max-w-md">
            كل فصل يحكي خطوة جديدة في رحلة Lux Addons — تحديثات، إصلاحات، وميزات.
          </p>
        </div>

        <div className="space-y-4">
          {patches.map((p, i) => (
            <article
              key={i}
              className="group grid md:grid-cols-[200px_1fr] gap-6 md:gap-10 p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition"
            >
              <div className="md:border-r md:border-white/10 md:pr-10">
                <div className="font-display text-2xl font-bold tracking-tight">{p.chapter}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-2">{p.date}</div>
              </div>
              <div>
                <h3 dir="rtl" className="font-arabic text-xl font-semibold mb-4">{p.title}</h3>
                <ul dir="rtl" className="font-arabic space-y-2 text-muted-foreground text-[14px] leading-[1.9]">
                  {p.notes.map((n, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-2 size-1 rounded-full bg-foreground/60 shrink-0" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
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
        <Roadmap />
        <PatchNotes />
        <Streams />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

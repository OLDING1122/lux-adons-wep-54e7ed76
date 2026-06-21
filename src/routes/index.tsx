import { createFileRoute } from "@tanstack/react-router";
import dragonHero from "@/assets/dragon-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lux Adons — Premier GTA V Roleplay Server" },
      { name: "description", content: "Lux Adons — a cinematic GTA V roleplay realm where legends are forged in shadow and sapphire flame." },
      { property: "og:title", content: "Lux Adons — Premier GTA V Roleplay" },
      { property: "og:description", content: "Enter the realm of Lux Adons. Cinematic GTA V roleplay." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500&display=swap" },
    ],
  }),
  component: Index,
});

function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 16" className={className} fill="none" aria-hidden>
      <line x1="0" y1="8" x2="100" y2="8" stroke="currentColor" strokeWidth="0.6" />
      <line x1="140" y1="8" x2="240" y2="8" stroke="currentColor" strokeWidth="0.6" />
      <path d="M100 8 L120 2 L140 8 L120 14 Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <circle cx="120" cy="8" r="1.3" fill="currentColor" />
    </svg>
  );
}

function Embers() {
  const dots = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i * 1.3) % 14;
        const dur = 14 + (i % 7) * 2;
        const size = 1 + (i % 3);
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-accent/70 blur-[1px]"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animation: `ember-rise ${dur}s linear ${delay}s infinite`,
              boxShadow: "0 0 6px oklch(0.78 0.13 85 / 0.8)",
            }}
          />
        );
      })}
    </div>
  );
}

function Navbar() {
  const links = ["Realm", "Houses", "Chronicles", "Live", "Codex"];
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/50 border-b border-accent/20">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-sm border border-accent/40 grid place-items-center bg-background/60">
            <span className="font-display font-bold text-accent text-sm tracking-widest">LA</span>
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold tracking-[0.25em] text-foreground text-sm">LVX·ADONS</div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground italic">Roleplay Realm</div>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-10 text-[13px] font-serif tracking-[0.18em] uppercase">
          {links.map((l, i) => (
            <li key={l}>
              <a href="#" className={`transition-colors hover:text-accent ${i === 0 ? "text-accent" : "text-foreground/70"}`}>
                {l}
              </a>
            </li>
          ))}
        </ul>

        <a href="#" className="hidden sm:inline-flex items-center px-5 h-9 rounded-sm border border-accent/50 text-accent text-xs tracking-[0.25em] uppercase font-display hover:bg-accent hover:text-accent-foreground transition-colors">
          Enter
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dragon background with slow drift (animated) */}
      <div className="absolute inset-0 animate-slow-drift will-change-transform">
        <img
          src={dragonHero}
          alt="Black dragon shrouded in blue mist"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      {/* Mist layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.08_0.03_250/0.85)_85%)]" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 animate-mist mix-blend-screen opacity-50"
        style={{ backgroundImage: "radial-gradient(circle at 30% 60%, oklch(0.4 0.12 245 / 0.4), transparent 50%), radial-gradient(circle at 70% 40%, oklch(0.35 0.1 240 / 0.35), transparent 55%)" }}
      />

      {/* Embers */}
      <Embers />

      {/* Vignette frame */}
      <div className="absolute inset-6 md:inset-10 border border-accent/15 pointer-events-none rounded-sm" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 text-center">
        <div className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-accent/80 mb-6 font-display">
          · Anno · MMXXVI ·
        </div>

        <Ornament className="mx-auto w-48 text-accent/60 mb-8" />

        <h1 className="font-display font-semibold text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-[0.08em] mb-6">
          <span className="block text-foreground/90">LUX</span>
          <span className="block text-gradient-gold italic font-serif font-medium text-6xl md:text-8xl lg:text-9xl my-1">&amp;</span>
          <span className="block text-foreground/90">ADONS</span>
        </h1>

        <Ornament className="mx-auto w-48 text-accent/60 mb-8" />

        <p className="font-serif italic text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          “Where shadow takes the shape of legend, and every street tells a story written in sapphire flame.”
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <a href="#" className="group relative inline-flex items-center gap-3 h-12 px-8 rounded-sm bg-accent text-accent-foreground font-display tracking-[0.25em] text-xs uppercase shadow-glow hover:bg-accent/90 transition-all">
            Enter the Realm
          </a>
          <a href="#" className="inline-flex items-center gap-3 h-12 px-8 rounded-sm border border-accent/50 text-foreground/90 font-display tracking-[0.25em] text-xs uppercase hover:border-accent hover:text-accent transition-colors">
            The Chronicles
          </a>
        </div>

        {/* Season seal */}
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-sm border border-accent/30 bg-background/40 backdrop-blur-sm">
          <span className="size-2 rounded-full bg-accent animate-glow-pulse" />
          <span className="font-display tracking-[0.4em] text-[11px] uppercase text-accent">Chapter I · Awakening</span>
          <span className="text-muted-foreground/60">·</span>
          <span className="font-serif italic text-sm text-muted-foreground">Coming soon</span>
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center text-accent/40 z-10">
        <Ornament className="w-40" />
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import knightAsset from "@/assets/knight-castle-lit.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lux Adons — Premier GTA V Roleplay Server" },
      { name: "description", content: "Lux Adons — a cinematic roleplay realm where every shadow tells a story." },
      { property: "og:title", content: "Lux Adons — Cinematic GTA V Roleplay" },
      { property: "og:description", content: "Step into the realm of Lux Adons." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: knightAsset.url },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  component: Index,
});

function Divider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 8" className={className} fill="none" aria-hidden>
      <line x1="0" y1="4" x2="85" y2="4" stroke="currentColor" strokeWidth="0.5" />
      <line x1="115" y1="4" x2="200" y2="4" stroke="currentColor" strokeWidth="0.5" />
      <path d="M85 4 L100 0 L115 4 L100 8 Z" stroke="currentColor" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

function Snow() {
  const flakes = Array.from({ length: 70 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {flakes.map((_, i) => {
        const left = (i * 37) % 100;
        const size = 1 + ((i * 7) % 4) * 0.6;
        const dur = 9 + ((i * 11) % 14);
        const delay = (i * 0.7) % 12;
        const drift = ((i % 5) - 2) * 30;
        const opacity = 0.35 + ((i % 5) * 0.12);
        return (
          <span
            key={i}
            className="absolute -top-4 rounded-full bg-foreground"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              filter: "blur(0.4px)",
              animation: `snow-fall ${dur}s linear ${delay}s infinite`,
              ["--drift" as never]: `${drift}px`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

function Navbar() {
  const links = [
    ["Realm", true],
    ["Houses", false],
    ["Chronicles", false],
    ["Live", false],
    ["Codex", false],
  ] as const;
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/40 border-b border-foreground/10">
      <nav className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 border border-foreground/40 grid place-items-center">
            <span className="font-display font-semibold text-foreground text-[11px] tracking-widest">LA</span>
          </div>
          <div className="leading-tight">
            <div className="font-display font-semibold tracking-[0.3em] text-foreground text-[13px]">LVX·ADONS</div>
            <div className="text-[9px] uppercase tracking-[0.45em] text-muted-foreground">Est · MMXXVI</div>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.32em] uppercase font-sans font-medium">
          {links.map(([l, active]) => (
            <li key={l}>
              <a href="#" className={`transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {l}
              </a>
            </li>
          ))}
        </ul>

        <a href="#" className="hidden sm:inline-flex items-center px-5 h-9 border border-foreground/60 text-foreground text-[10px] tracking-[0.35em] uppercase font-medium hover:bg-foreground hover:text-background transition-all">
          Enter
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden grain">
      {/* Knight image with slow zoom */}
      <div className="absolute inset-0 animate-slow-zoom will-change-transform">
        <img
          src={knightAsset.url}
          alt="Lone knight before a dark cathedral"
          className="absolute inset-0 size-full object-cover object-center"
        />
      </div>

      {/* Atmosphere overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,transparent_0%,oklch(0.03_0_0/0.55)_70%)]" />
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Castle glow pulse */}
      <div
        className="absolute left-1/2 top-[18%] -translate-x-1/2 size-[40vmin] rounded-full pointer-events-none mix-blend-screen animate-castle-glow"
        style={{ background: "radial-gradient(circle, oklch(0.98 0 0 / 0.18), transparent 65%)" }}
      />

      {/* Falling snow */}
      <Snow />

      {/* Inner frame — classical accent on modern layout */}
      <div className="absolute inset-4 md:inset-8 border border-foreground/10 pointer-events-none" />
      <div className="absolute top-4 left-4 md:top-8 md:left-8 size-6 border-l border-t border-foreground/30 pointer-events-none" />
      <div className="absolute top-4 right-4 md:top-8 md:right-8 size-6 border-r border-t border-foreground/30 pointer-events-none" />
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 size-6 border-l border-b border-foreground/30 pointer-events-none" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 size-6 border-r border-b border-foreground/30 pointer-events-none" />

      {/* Side rails — modern editorial */}
      <div className="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4 text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
        <span style={{ writingMode: "vertical-rl" }}>Chapter I · Awakening</span>
        <span className="w-px h-16 bg-foreground/30" />
        <span>2026</span>
      </div>
      <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-3 text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
        <span>FiveM</span>
        <span className="w-px h-16 bg-foreground/30" />
        <span style={{ writingMode: "vertical-rl" }}>Cinematic Roleplay</span>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end px-8 md:px-24 pb-20 max-w-5xl">
        <div className="animate-float-up">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-6">
            <span className="size-1.5 rounded-full bg-foreground animate-shimmer" />
            Now forging · Season 01
          </div>

          <h1 className="font-display font-semibold text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[0.04em] text-foreground mb-4">
            LUX <span className="font-serif italic font-normal text-muted-foreground">&amp;</span> ADONS
          </h1>

          <Divider className="w-48 text-foreground/40 mb-6" />

          <p className="font-serif italic text-lg md:text-2xl text-foreground/80 max-w-2xl leading-relaxed mb-10">
            “One blade. One realm. A thousand stories waiting to be told in the shadow of the cathedral.”
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="group inline-flex items-center gap-3 h-12 px-8 bg-foreground text-background text-[11px] tracking-[0.35em] uppercase font-medium hover:bg-foreground/90 transition-all">
              Enter the Realm
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#" className="inline-flex items-center gap-3 h-12 px-8 border border-foreground/40 text-foreground text-[11px] tracking-[0.35em] uppercase font-medium hover:border-foreground hover:bg-foreground/5 transition-all">
              Watch Trailer
            </a>
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="absolute bottom-6 inset-x-0 flex justify-between items-center px-8 md:px-24 z-10 text-[10px] tracking-[0.4em] uppercase text-muted-foreground/70">
        <span>SCROLL · ↓</span>
        <span className="hidden md:inline">© MMXXVI — Lux Adons Studios</span>
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

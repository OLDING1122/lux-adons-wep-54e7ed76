import { createFileRoute } from "@tanstack/react-router";
import heroCity from "@/assets/hero-city.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lux Adons — Premier GTA V Roleplay Server" },
      { name: "description", content: "Lux Adons is the next generation of GTA V roleplay. Step into a cinematic world of crime, luxury, and unforgettable stories." },
      { property: "og:title", content: "Lux Adons — Premier GTA V Roleplay Server" },
      { property: "og:description", content: "Step into Lux Adons. The next generation of cinematic GTA V roleplay." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oxanium:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  component: Index,
});

function Navbar() {
  const links = ["Home", "Roster", "Team", "Live", "Careers", "FAQ"];
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/40 border-b border-border/40">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center shadow-glow">
            <span className="font-display font-extrabold text-primary-foreground text-sm">LA</span>
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold tracking-wide text-foreground">LUX ADONS</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">RP Studios</div>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l, i) => (
            <li key={l}>
              <a href="#" className={`transition-colors hover:text-primary ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#" className="hidden sm:inline-flex items-center gap-2 px-4 h-9 rounded-md border border-border bg-secondary/50 text-sm font-medium hover:bg-secondary transition-colors">
            Sign In
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background */}
      <img
        src={heroCity}
        alt="Lux Adons city skyline at night"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.62_0.18_245/0.15),transparent_60%)]" />

      {/* Top badge */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/60 backdrop-blur border border-primary/30">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs tracking-[0.25em] uppercase text-foreground/80">The #1 GTA RP Experience</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-[1.4fr_1fr] gap-12 items-end">
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
            Lux Adons · Season 1
          </div>
          <h1 className="font-display font-extrabold text-6xl md:text-8xl leading-[0.9] mb-6">
            WELCOME TO
            <br />
            <span className="text-gradient-primary">LUX ADONS</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Step into the most cinematic GTA V roleplay server. A world of luxury, crime,
            and stories you'll never forget. Built for serious roleplayers.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a href="#" className="inline-flex items-center gap-2 h-12 px-6 rounded-md bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity">
              Join Discord
            </a>
            <a href="#" className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-border bg-card/40 backdrop-blur text-foreground font-medium hover:bg-card transition-colors">
              Watch Trailer
            </a>
          </div>
        </div>

        {/* Season card */}
        <div className="relative">
          <div className="text-xs tracking-[0.3em] uppercase text-primary mb-3">Next</div>
          <div className="relative p-6 rounded-lg border border-primary/30 bg-card/40 backdrop-blur-md shadow-elegant overflow-hidden">
            <div className="absolute -top-20 -right-20 size-60 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative">
              <div className="font-display font-extrabold text-5xl md:text-6xl leading-none">
                SEASON <span className="text-gradient-primary">01</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-primary">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                Launching Soon
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                A brand new chapter. New stories, new factions, new legends.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
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

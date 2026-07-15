import { Link } from "@tanstack/react-router";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import logoAsset from "@/assets/lux-logo.png.asset.json";
import { DISCORD_URL, STORE_URL } from "@/lib/constants";
import { luxProjects, projectStatusArabic, projectStatusClass, projectStatusLabel } from "@/lib/lux-projects";

export function LuxLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <img
        src={logoAsset.url}
        alt="Lux Addons"
        className={`${compact ? "size-9" : "size-11"} rounded-full ring-1 ring-white/15 group-hover:ring-white/40 transition`}
      />
      <div className="leading-tight">
        <div className="font-display font-semibold tracking-[0.2em] text-[13px] text-foreground">LUX ADDONS</div>
        <div className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground">FiveM · Premium</div>
      </div>
    </Link>
  );
}

function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3a14.5 14.5 0 0 0-.69 1.41 18.27 18.27 0 0 0-5.736 0A14.5 14.5 0 0 0 9.442 3a19.79 19.79 0 0 0-3.759 1.369C2.084 9.78 1.103 15.057 1.594 20.26a19.93 19.93 0 0 0 6.06 3.06c.49-.67.926-1.385 1.299-2.137a12.94 12.94 0 0 1-2.045-.98c.171-.126.34-.257.502-.39 3.928 1.81 8.18 1.81 12.06 0 .163.133.331.264.503.39-.654.387-1.34.717-2.046.98.374.752.81 1.467 1.3 2.137a19.86 19.86 0 0 0 6.06-3.06c.575-6.046-.98-11.275-4.07-15.89ZM8.02 16.43c-1.18 0-2.157-1.094-2.157-2.437 0-1.343.957-2.437 2.157-2.437 1.21 0 2.176 1.103 2.157 2.437 0 1.343-.957 2.437-2.157 2.437Zm7.96 0c-1.18 0-2.157-1.094-2.157-2.437 0-1.343.957-2.437 2.157-2.437 1.21 0 2.176 1.103 2.157 2.437 0 1.343-.947 2.437-2.157 2.437Z" />
    </svg>
  );
}

export function LuxProjectsMenu() {
  const mainProjects = luxProjects.filter((project) => project.published || project.status === "coming-soon");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="hover:text-foreground transition font-arabic">مشاريع LUX</button>
      </PopoverTrigger>
      <PopoverContent align="center" sideOffset={14} className="w-[360px] p-0 border-white/10 bg-[oklch(0.07_0.01_265)] overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <div className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-2">Lux Projects</div>
          <div dir="rtl" className="font-arabic text-sm text-foreground/85 leading-[1.9]">
            تنقّل سريع بين المشاريع والأدوات الحالية والقادمة داخل منظومة Lux.
          </div>
        </div>

        <div className="p-2 space-y-1.5">
          <Link
            to="/projects"
            className="flex items-center justify-between gap-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] px-3 py-3 transition"
          >
            <div className="min-w-0 text-left">
              <div className="font-display text-sm">Projects Hub</div>
              <div className="text-[11px] text-muted-foreground">عرض كل مشاريع Lux في صفحة واحدة</div>
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-amber-200/80">Open</span>
          </Link>

          {mainProjects.map((project) => (
            <Link
              key={project.slug}
              to={project.route}
              className="flex items-center justify-between gap-3 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] px-3 py-3 transition"
            >
              <div className="min-w-0 text-left">
                <div className="font-display text-sm truncate">{project.shortTitle}</div>
                <div dir="rtl" className="font-arabic text-[11px] text-muted-foreground truncate">
                  {project.title}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] tracking-[0.22em] uppercase ${projectStatusClass[project.status]}`}>
                  {projectStatusLabel[project.status]}
                </span>
                <span dir="rtl" className="font-arabic text-[10px] text-muted-foreground">
                  {projectStatusArabic[project.status]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function LuxNavbar({ showAdmin = true, showHomeAnchorLinks = false }: { showAdmin?: boolean; showHomeAnchorLinks?: boolean }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/50 border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">
        <LuxLogo />
        <ul className="hidden md:flex items-center gap-5 text-[10.5px] tracking-[0.26em] uppercase text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition">Home</Link></li>
          {showHomeAnchorLinks && <li><a href="#story" className="hover:text-foreground transition">Story</a></li>}
          <li><a href={STORE_URL} target="_blank" rel="noreferrer" className="font-arabic hover:text-foreground transition">المتجر</a></li>
          <li><LuxProjectsMenu /></li>
          <li><Link to="/projects" className="hover:text-foreground transition">Projects</Link></li>
          <li><Link to="/news" className="hover:text-foreground transition">News</Link></li>
          <li><Link to="/ai-lux" className="hover:text-foreground transition">AI Lux</Link></li>
          <li><Link to="/chronicle" className="hover:text-foreground transition">Chronicle</Link></li>
          <li><Link to="/rules" className="hover:text-foreground transition">Rules</Link></li>
          {showAdmin && <li><Link to="/admin" className="hover:text-foreground transition">Admin</Link></li>}
        </ul>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          title="Discord"
          aria-label="Discord"
          className="inline-flex items-center justify-center size-8 rounded-full bg-foreground text-background hover:opacity-90 transition shrink-0"
        >
          <DiscordIcon className="size-3.5" />
        </a>
      </nav>
    </header>
  );
}

export function LuxFooter() {
  return (
    <footer className="border-t border-white/5 py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        <span>© 2026 Lux Addons</span>
        <div className="flex items-center gap-6">
          <Link to="/projects" className="hover:text-foreground transition">Projects</Link>
          <Link to="/admin" className="hover:text-foreground transition">Admin</Link>
          <Link to="/rules" className="hover:text-foreground transition">Rules</Link>
          <Link to="/ai-lux" className="hover:text-foreground transition">AI Lux</Link>
        </div>
      </div>
    </footer>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LuxFooter, LuxNavbar } from "@/components/lux-chrome";
import {
  luxProjects,
  type ProjectStatus,
  projectStatusArabic,
  projectStatusClass,
  projectStatusLabel,
} from "@/lib/lux-projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects LUX — Lux Addons" },
      {
        name: "description",
        content: "صفحة مستقلة تعرض جميع مشاريع Lux الحالية والقادمة مع الحالات والتصنيفات.",
      },
    ],
  }),
  component: ProjectsPage,
});

const FILTERS: Array<{ id: "all" | ProjectStatus; label: string }> = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "in-progress", label: "In Progress" },
  { id: "beta", label: "Beta" },
  { id: "internal", label: "Internal" },
  { id: "coming-soon", label: "Coming Soon" },
];

function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return luxProjects;
    return luxProjects.filter((project) => project.status === filter);
  }, [filter]);

  const current = luxProjects.filter((project) => project.published);
  const upcoming = luxProjects.filter((project) => !project.published || project.status === "coming-soon");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LuxNavbar />

      <main className="pt-28 pb-24 px-6 md:px-10">
        <section className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-8 flex-wrap mb-14">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">— Lux Projects Hub</div>
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">Projects LUX</h1>
              <p dir="rtl" className="font-arabic mt-5 max-w-2xl text-muted-foreground leading-[2] text-[15px]">
                صفحة مستقلة تجمع كل مشاريع Lux الحالية والقادمة في مكان واحد، مع بطاقات احترافية، حالات واضحة،
                وتصنيفات تساعد على متابعة التطوير وكأن Lux شركة تقنية كاملة.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 min-w-[280px]">
              <StatCard label="Current" value={current.length} />
              <StatCard label="Upcoming" value={upcoming.length} />
              <StatCard label="Published" value={luxProjects.filter((item) => item.published).length} />
              <StatCard label="Internal" value={luxProjects.filter((item) => item.status === "internal").length} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map((item) => {
              const active = item.id === filter;
              return (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] tracking-[0.26em] uppercase transition ${
                    active
                      ? "border-amber-200/35 bg-amber-200/10 text-amber-100"
                      : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground hover:border-white/20"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((project) => (
              <Link
                key={project.slug}
                to={project.route}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/20 transition"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.heroImage}
                    alt={project.heroAlt}
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex rounded-full border border-white/15 bg-background/60 backdrop-blur px-3 py-1 text-[9px] tracking-[0.28em] uppercase text-foreground/90">
                    {project.category}
                  </div>
                  <div className="absolute top-4 right-4 inline-flex rounded-full border px-3 py-1 text-[9px] tracking-[0.26em] uppercase text-foreground/90 backdrop-blur bg-background/50">
                    {project.updatedAt}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] tracking-[0.22em] uppercase ${projectStatusClass[project.status]}`}>
                      {projectStatusLabel[project.status]}
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">{project.shortTitle}</h2>
                    <p dir="rtl" className="font-arabic mt-2 text-sm text-foreground/80 leading-[1.9] line-clamp-2">
                      {project.title}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <p dir="rtl" className="font-arabic text-muted-foreground text-[14px] leading-[1.95] line-clamp-4">
                    {project.summary}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Status</div>
                      <div dir="rtl" className="font-arabic text-sm mt-1">{projectStatusArabic[project.status]}</div>
                    </div>
                    <div className="text-[10px] tracking-[0.28em] uppercase text-amber-200/80 group-hover:text-amber-100 transition">
                      Open Project →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <LuxFooter />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
      <div className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-3xl font-bold tracking-tight">{value}</div>
    </div>
  );
}


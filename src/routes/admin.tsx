import { createFileRoute } from "@tanstack/react-router";
import { LuxFooter, LuxNavbar } from "@/components/lux-chrome";
import {
  luxProjects,
  projectStatusArabic,
  projectStatusClass,
  projectStatusLabel,
} from "@/lib/lux-projects";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Lux Projects" },
      { name: "description", content: "لوحة إدارة بسيطة لعرض مشاريع Lux وحالاتها وآخر تحديث لها." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const published = luxProjects.filter((project) => project.published).length;
  const privateCount = luxProjects.filter((project) => project.status === "private").length;
  const internalCount = luxProjects.filter((project) => project.status === "internal").length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LuxNavbar />

      <main className="pt-28 pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">— Internal Dashboard</div>
              <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">/admin</h1>
              <p dir="rtl" className="font-arabic mt-5 max-w-2xl text-muted-foreground leading-[2] text-[15px]">
                لوحة إدارة أولية لمتابعة المشاريع، حالاتها، آخر تحديث، وهل هي منشورة أو داخلية. هذه خطوة أولى تبني لك
                تنظيم يشبه الشركات التقنية الحقيقية داخل Lux.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 min-w-[280px]">
              <Kpi label="Total" value={luxProjects.length} />
              <Kpi label="Published" value={published} />
              <Kpi label="Internal" value={internalCount} />
              <Kpi label="Private" value={privateCount} />
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="grid grid-cols-[1.4fr_.8fr_.8fr_.8fr_.8fr] gap-4 px-6 py-4 border-b border-white/5 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <div>Project</div>
              <div>Status</div>
              <div>Published</div>
              <div>Updated</div>
              <div>Route</div>
            </div>

            <div className="divide-y divide-white/5">
              {luxProjects.map((project) => (
                <div key={project.slug} className="grid grid-cols-[1.4fr_.8fr_.8fr_.8fr_.8fr] gap-4 px-6 py-5 items-center">
                  <div className="min-w-0">
                    <div className="font-display text-lg font-semibold truncate">{project.shortTitle}</div>
                    <div dir="rtl" className="font-arabic text-sm text-muted-foreground mt-1 truncate">
                      {project.title}
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] tracking-[0.22em] uppercase ${projectStatusClass[project.status]}`}>
                      {projectStatusLabel[project.status]}
                    </span>
                    <div dir="rtl" className="font-arabic text-xs text-muted-foreground mt-1">
                      {projectStatusArabic[project.status]}
                    </div>
                  </div>
                  <div className="text-sm text-foreground/85">{project.published ? "Yes" : "No"}</div>
                  <div className="text-sm text-foreground/85">{project.updatedAt}</div>
                  <div className="text-xs text-amber-200/80 break-all">{project.route}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <LuxFooter />
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
      <div className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-3xl font-bold tracking-tight">{value}</div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { LuxFooter, LuxNavbar } from "@/components/lux-chrome";
import {
  getProjectBySlug,
  projectStatusArabic,
  projectStatusClass,
  projectStatusLabel,
} from "@/lib/lux-projects";

const project = getProjectBySlug("image-generator")!;

export const Route = createFileRoute("/image-generator")({
  head: () => ({
    meta: [
      { title: "Image Generator — Projects LUX" },
      { name: "description", content: project.summary },
    ],
  }),
  component: ImageGeneratorPage,
});

function ImageGeneratorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LuxNavbar />

      <main className="pt-28 pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <section>
            <div className={`inline-flex rounded-full border px-3 py-1 text-[10px] tracking-[0.26em] uppercase ${projectStatusClass[project.status]}`}>
              {projectStatusLabel[project.status]}
            </div>
            <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold tracking-tight">{project.title}</h1>
            <p dir="rtl" className="font-arabic mt-6 text-[15px] leading-[2] text-muted-foreground max-w-3xl">
              {project.description}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-10">
              <Meta label="Category" value={project.category} />
              <Meta label="Designed By" value={project.designedBy} />
              <Meta label="Updated" value={project.updatedAt} />
            </div>

            <div className="mt-12 space-y-10">
              <Block title="ليش هذه الأداة مهمة؟" items={project.whyItMatters} />
              <Block title="المميزات" items={project.features} />
              <Block title="الفئات المستفيدة" items={project.audiences} />
            </div>
          </section>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={project.heroImage} alt={project.heroAlt} className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Project Snapshot</div>
                <p dir="rtl" className="font-arabic mt-3 text-sm leading-[1.95] text-foreground/80">
                  {project.summary}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Current State</div>
              <div dir="rtl" className="font-arabic mt-3 text-sm leading-[1.95] text-foreground/85">
                الأداة في مرحلة {projectStatusArabic[project.status]}، والهدف القادم هو ربطها بواجهة فعلية للتوليد وسجل للصور والـ prompts.
              </div>
              <div className="mt-5 grid gap-3">
                <Link
                  to="/ai-lux"
                  className="inline-flex items-center justify-center rounded-full bg-foreground text-background h-11 text-[11px] tracking-[0.24em] uppercase font-semibold hover:opacity-90 transition"
                >
                  Open Lux AI
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 h-11 text-[11px] tracking-[0.24em] uppercase text-foreground hover:bg-white/5 transition"
                >
                  Back to Projects
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <LuxFooter />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{label}</div>
      <div dir="rtl" className="font-arabic mt-2 text-sm leading-[1.8] text-foreground/85">{value}</div>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <h2 dir="rtl" className="font-arabic text-xl font-semibold">{title}</h2>
      <ul dir="rtl" className="mt-5 space-y-3 font-arabic text-[14px] leading-[1.95] text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-2 size-1.5 rounded-full bg-amber-200 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

import dragonHero from "@/assets/dragon-hero.jpg";
import heroCity from "@/assets/hero-city.jpg";
import soundHeavyImg from "@/assets/roadmap/soundheavy.jpg";
import soundMk2Img from "@/assets/roadmap/soundmk2.jpg";

export type ProjectStatus =
  | "active"
  | "in-progress"
  | "coming-soon"
  | "internal"
  | "beta"
  | "private";

export type LuxProject = {
  slug: string;
  title: string;
  shortTitle: string;
  route: string;
  status: ProjectStatus;
  published: boolean;
  updatedAt: string;
  designedBy: string;
  category: string;
  partnerNote?: string;
  heroImage: string;
  heroAlt: string;
  summary: string;
  description: string;
  whyItMatters: string[];
  features: string[];
  audiences: string[];
  nextStep: string;
};

export const luxProjects: LuxProject[] = [
  {
    slug: "image-generator",
    title: "أداة توليد الصور",
    shortTitle: "Image Generator",
    route: "/image-generator",
    status: "beta",
    published: true,
    updatedAt: "2026-07-15",
    designedBy: "Lux Labs · Lux AI Team",
    category: "Creative Tools",
    heroImage: dragonHero,
    heroAlt: "Lux image generator hero",
    summary:
      "أداة مخصصة لتوليد الصور بالذكاء الاصطناعي داخل هوية Lux، لصناعة أفكار بصرية وبنرات ومفاهيم بسرعة.",
    description:
      "مشروع Lux الأول ضمن مختبر المشاريع التقنية. يركز على تسريع إنتاج الصور الإبداعية والمرئيات التسويقية للمجتمع والمنتجات والواجهات، مع الحفاظ على هوية فاخرة ومنظمة تليق بعلامة Lux.",
    whyItMatters: [
      "يقلل وقت إنتاج البنرات والأفكار الإبداعية من ساعات إلى دقائق.",
      "يعطي فريق Lux مساحة لتجربة مفاهيم بصرية جديدة بسرعة.",
      "يحوّل Lux AI من مساعد نصّي إلى منصة إنتاج مرئي أيضاً.",
    ],
    features: [
      "بناء prompts احترافية من داخل المنصة.",
      "إخراج صور دعائية، أغلفة، أفكار مبدئية، ومشاهد تسويقية.",
      "واجهة فاخرة متوافقة مع هوية Lux وقابلة للتوسع مستقبلاً.",
    ],
    audiences: ["الإدارة", "التسويق", "صناع المحتوى", "المجتمع"],
    nextStep: "ربط الصفحة لاحقًا بمولد صور فعلي مع معرض للنتائج وسجل للمحاولات.",
  },
  {
    slug: "web-encryption",
    title: "أداة تشفير مواقع",
    shortTitle: "Website Encryption",
    route: "/web-encryption",
    status: "internal",
    published: true,
    updatedAt: "2026-07-15",
    designedBy: "الطاقم الإداري لدى Lux",
    category: "Security Tools",
    partnerNote: "بالتعاون مع شركاء معروفين بنفس المجال",
    heroImage: heroCity,
    heroAlt: "Lux website encryption tool hero",
    summary:
      "أداة تشفير مواقع بتصميم من الطاقم الإداري لدى Lux، بالتعاون مع شركاء معروفين بنفس المجال.",
    description:
      "هذا المشروع موجّه لحماية أجزاء حساسة من الواجهات والمشاريع، وتنظيم طبقات الخصوصية والتوزيع داخل بيئات العمل. الهدف ليس مجرد التشفير، بل بناء أداة تحمل هوية Lux وتخدم الاستخدام التقني بشكل أنيق ومدروس.",
    whyItMatters: [
      "يعزز الثقة ويضيف طبقة حماية مفيدة للمشاريع الحساسة.",
      "يوسّع صورة Lux من منصة Addons إلى كيان تقني يقدم أدوات احترافية.",
      "يسمح بالتعاون مع شركاء المجال بشكل منظم وواضح للمستخدم النهائي.",
    ],
    features: [
      "حماية ملفات وواجهات مختارة داخل المشاريع.",
      "تصميم داخلي منسق من الطاقم الإداري مع هوية فاخرة.",
      "جاهزية للتوسع نحو لوحات إدارة وصلاحيات واستخدامات أوسع مستقبلاً.",
    ],
    audiences: ["الإدارة", "الشركاء", "فرق التطوير", "المشاريع الداخلية"],
    nextStep: "تحويل المشروع لاحقًا إلى واجهة فعلية تحتوي على إعدادات حماية وخيارات إدارة متعددة.",
  },
  {
    slug: "lux-projects-hub",
    title: "لوحة مشاريع Lux القادمة",
    shortTitle: "Projects Hub",
    route: "/projects",
    status: "coming-soon",
    published: false,
    updatedAt: "2026-07-15",
    designedBy: "Lux Core Team",
    category: "Internal Platform",
    heroImage: soundHeavyImg,
    heroAlt: "Lux future projects hub hero",
    summary:
      "مساحة موحدة لاستقبال منتجات Lux الجديدة، وعرض حالاتها، والتوسع نحو أدوات إضافية مستقبلاً.",
    description:
      "هذا المشروع يمثل البوابة القادمة التي تجمع كل منتجات Lux التقنية في مساحة واحدة، مع فلاتر، حالات مشاريع، ومسارات تطوير واضحة للإدارة والفريق والزوار.",
    whyItMatters: [
      "يعطي الإدارة لوحة تصور واضحة عن منتجات Lux.",
      "يجعل إضافة أي مشروع جديد لاحقًا سهلة وسريعة.",
      "يبني صورة مؤسسية أكثر نضجًا للموقع.",
    ],
    features: [
      "فلاتر حسب الحالة والنشر والتصنيف.",
      "بطاقات مشاريع احترافية موحدة الهوية.",
      "إمكانية الربط لاحقًا بلوحة إدارة أو CMS داخلي.",
    ],
    audiences: ["الإدارة", "المجتمع", "الشركاء"],
    nextStep: "إضافة مزيد من المنتجات وربطها بلوحة الإدارة الداخلية.",
  },
  {
    slug: "lux-ai-builder",
    title: "Lux AI Builder",
    shortTitle: "AI Builder",
    route: "/ai-lux",
    status: "in-progress",
    published: true,
    updatedAt: "2026-07-15",
    designedBy: "Lux AI Team",
    category: "AI Platform",
    heroImage: soundMk2Img,
    heroAlt: "Lux AI builder hero",
    summary:
      "تطوير Lux AI ليصبح منصة متعددة الاستخدامات تشمل Chat و Code و Images و Website Builder.",
    description:
      "المشروع يركز على ترقية Lux AI من واجهة دردشة عادية إلى منتج ذكي متكامل، يدعم المحادثة، صناعة الصفحات، صياغة prompts، ويشكل نقطة ارتكاز لبقية أدوات Lux القادمة.",
    whyItMatters: [
      "يرفع قيمة Lux AI كمنتج أساسي داخل الموقع.",
      "يدعم باقي المشاريع مثل أداة الصور وبناء المواقع.",
      "يمنح فريق Lux منصة داخلية قابلة للتوسع والتطوير.",
    ],
    features: [
      "تبويبات استخدام متعددة.",
      "Quick actions لصناعة HTML و prompts.",
      "تهيئة للتوسع نحو صور وأدوات إضافية.",
    ],
    audiences: ["الإدارة", "المستخدمون", "المطورون"],
    nextStep: "ربط قدرات الصور مستقبلاً وإضافة workflows جاهزة للمواقع والأدوات.",
  },
];

export const projectStatusLabel: Record<ProjectStatus, string> = {
  active: "Active",
  "in-progress": "In Progress",
  "coming-soon": "Coming Soon",
  internal: "Internal",
  beta: "Beta",
  private: "Private",
};

export const projectStatusArabic: Record<ProjectStatus, string> = {
  active: "نشط",
  "in-progress": "قيد التطوير",
  "coming-soon": "قريبًا",
  internal: "داخلي",
  beta: "بيتا",
  private: "خاص",
};

export const projectStatusClass: Record<ProjectStatus, string> = {
  active: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  "in-progress": "border-sky-400/25 bg-sky-400/10 text-sky-200",
  "coming-soon": "border-amber-300/25 bg-amber-300/10 text-amber-100",
  internal: "border-violet-400/25 bg-violet-400/10 text-violet-200",
  beta: "border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-200",
  private: "border-white/10 bg-white/5 text-muted-foreground",
};

export function getProjectBySlug(slug: string) {
  return luxProjects.find((project) => project.slug === slug) ?? null;
}

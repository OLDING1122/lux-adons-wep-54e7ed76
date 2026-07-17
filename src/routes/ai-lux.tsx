import { createFileRoute, Link } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  Brain,
  Check,
  Code2,
  Copy,
  Download,
  Eye,
  Globe2,
  Image as ImageIcon,
  LayoutTemplate,
  Loader2,
  MessageSquare,
  PanelLeft,
  Pencil,
  Plus,
  Send,
  Sparkles,
  Trash2,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import logoAsset from "@/assets/lux-logo.png.asset.json";

type LuxMode = "chat" | "code" | "images" | "website";
type ResponseStyle = "fast" | "balanced" | "deep";

type Thread = {
  id: string;
  title: string;
  messages: UIMessage[];
  updatedAt: number;
};

const STORAGE_KEY = "lux-ai-threads-v3";
const ACTIVE_KEY = "lux-ai-active-v3";

export const Route = createFileRoute("/ai-lux")({
  head: () => ({
    meta: [
      { title: "Lux AI — الذكاء الاصطناعي الرسمي لـ Lux Addons" },
      {
        name: "description",
        content:
          "Lux AI — واجهة ذكية حديثة داخل Lux Addons للمحادثة، البرمجة، كتابة prompts، وبناء المواقع.",
      },
      { property: "og:title", content: "Lux AI" },
      { property: "og:description", content: "منصة ذكية حديثة داخل Lux Addons." },
    ],
  }),
  component: AiLuxPage,
});

const MODE_CONFIG: Record<
  LuxMode,
  {
    label: string;
    arabic: string;
    icon: typeof Bot;
    placeholder: string;
    quickAction: string;
    summary: string;
    suggestions: string[];
  }
> = {
  chat: {
    label: "Chat",
    arabic: "محادثة عامة",
    icon: MessageSquare,
    placeholder: "اكتب سؤالك أو اطلب مساعدة…",
    quickAction: "رتب لي هذه الفكرة في نقاط واضحة ومختصرة.",
    summary: "مساعد عام سريع وذكي للشرح، الصياغة، الترجمة، والتخطيط.",
    suggestions: [
      "رتب لي خطة مشروع تقني خطوة بخطوة",
      "اكتب لي نص تسويقي قصير لمشروع جديد",
      "لخص لي فكرة أداة بشكل احترافي",
      "ترجم لي هذا النص للعربية الفصحى",
    ],
  },
  code: {
    label: "Code",
    arabic: "مساعد برمجي",
    icon: Code2,
    placeholder: "الصق الكود أو اطلب مني بناء/تصحيح جزء برمجي…",
    quickAction: "أنشئ لي مكون React احترافي مع شرح مختصر للكود.",
    summary: "وضع متخصص للكود، التصحيح، البناء، والتحسين البرمجي.",
    suggestions: [
      "ابنِ لي بطاقة مشروع React بتنسيق فاخر",
      "صحح لي هذا الخطأ البرمجي خطوة بخطوة",
      "اكتب لي API route بسيط يرجع JSON",
      "حوّل هذا التصميم إلى HTML و CSS مرتب",
    ],
  },
  images: {
    label: "Images",
    arabic: "Prompt Studio",
    icon: ImageIcon,
    placeholder: "اطلب prompt احترافي لتوليد صورة أو فكرة بصرية…",
    quickAction: "اكتب لي prompt فاخر لصورة إعلانية تخص Lux بالأسود والذهبي.",
    summary: "صياغة prompts احترافية للصور، الأغلفة، والبنرات والمشاهد الإبداعية.",
    suggestions: [
      "اكتب prompt لصورة فارس مظلم بطابع سينمائي",
      "أنشئ prompt لبنر متجر تقني بإضاءة نيون",
      "اكتب prompt لغلاف منتج فاخر بالأسود والذهبي",
      "أنشئ prompt لصورة Landing Page حديثة لأداة ذكاء اصطناعي",
    ],
  },
  website: {
    label: "Website Builder",
    arabic: "بناء مواقع",
    icon: LayoutTemplate,
    placeholder: "اطلب صفحة HTML أو Landing Page أو Dashboard كاملة…",
    quickAction: "صمم لي صفحة HTML كاملة وفاخرة مع CSS و JavaScript داخل ملف واحد.",
    summary: "إنشاء صفحات ومواقع كاملة بفخامة حديثة مع preview مباشر.",
    suggestions: [
      "صمم لي landing page فخمة لمشروع تقني بالأسود والذهبي",
      "ابنِ صفحة تعريف لمشروع أداة تشفير مواقع",
      "Build a premium portfolio homepage for a brand studio",
      "أنشئ Dashboard حديث لعرض منتجات Lux ومشاريعها",
    ],
  },
};

const STYLE_CONFIG: Record<
  ResponseStyle,
  { label: string; arabic: string; icon: typeof Zap; hint: string }
> = {
  fast: {
    label: "Fast",
    arabic: "سريع",
    icon: Zap,
    hint: "استجابة أسرع وإجابات مختصرة أكثر.",
  },
  balanced: {
    label: "Balanced",
    arabic: "متوازن",
    icon: Sparkles,
    hint: "أفضل توازن بين السرعة والجودة.",
  },
  deep: {
    label: "Deep",
    arabic: "عميق",
    icon: Brain,
    hint: "تحليل أعمق وإجابات أقوى عند الطلبات المعقدة.",
  },
};

function extractHtml(text: string): string | null {
  const closed = text.match(/```html\s*([\s\S]*?)```/i);
  if (closed?.[1]?.trim()) return closed[1].trim();
  const open = text.match(/```html\s*([\s\S]*)$/i);
  if (open && /<[a-z!]/i.test(open[1])) return open[1].trim();
  const d = text.match(/<!doctype html[\s\S]*?<\/html>/i);
  if (d) return d[0];
  const ds = text.match(/<!doctype html[\s\S]*$/i);
  return ds ? ds[0] : null;
}

function extractCode(text: string): string | null {
  const html = extractHtml(text);
  if (html) return html;
  const block = text.match(/```(?:[a-z0-9+#.-]+)?\s*([\s\S]*?)```/i);
  return block?.[1]?.trim() || null;
}

function messageText(message: UIMessage): string {
  return message.parts.map((part) => (part.type === "text" ? part.text : "")).join("");
}

function loadThreads(): Thread[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Thread[];
  } catch {
    return [];
  }
}

function saveThreads(threads: Thread[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  } catch {
    /* ignore */
  }
}

function newThreadId() {
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function titleFromMessages(msgs: UIMessage[]): string {
  const first = msgs.find((message) => message.role === "user");
  if (!first) return "محادثة جديدة";
  const txt = messageText(first).trim().replace(/\s+/g, " ");
  return txt.slice(0, 42) || "محادثة جديدة";
}

function controlPrefix(mode: LuxMode, style: ResponseStyle) {
  return `[LUX_MODE:${mode.toUpperCase()}] [LUX_STYLE:${style.toUpperCase()}]`;
}

function AiLuxPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    const loaded = loadThreads();
    let active = typeof window !== "undefined" ? localStorage.getItem(ACTIVE_KEY) : null;
    if (loaded.length === 0) {
      const thread: Thread = {
        id: newThreadId(),
        title: "محادثة جديدة",
        messages: [],
        updatedAt: Date.now(),
      };
      saveThreads([thread]);
      setThreads([thread]);
      active = thread.id;
      try {
        localStorage.setItem(ACTIVE_KEY, thread.id);
      } catch {
        /* ignore */
      }
    } else {
      setThreads(loaded);
      if (!active || !loaded.find((thread) => thread.id === active)) active = loaded[0].id;
    }
    setActiveId(active);
    setHydrated(true);
  }, []);

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeId) ?? null,
    [threads, activeId],
  );

  const updateActive = useCallback(
    (updater: (thread: Thread) => Thread) => {
      setThreads((prev) => {
        const next = prev.map((thread) => (thread.id === activeId ? updater(thread) : thread));
        saveThreads(next);
        return next;
      });
    },
    [activeId],
  );

  const createThread = useCallback(() => {
    const thread: Thread = {
      id: newThreadId(),
      title: "محادثة جديدة",
      messages: [],
      updatedAt: Date.now(),
    };
    setThreads((prev) => {
      const next = [thread, ...prev];
      saveThreads(next);
      return next;
    });
    setActiveId(thread.id);
    try {
      localStorage.setItem(ACTIVE_KEY, thread.id);
    } catch {
      /* ignore */
    }
  }, []);

  const selectThread = useCallback((id: string) => {
    setActiveId(id);
    try {
      localStorage.setItem(ACTIVE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const deleteThread = useCallback(
    (id: string) => {
      setThreads((prev) => {
        const next = prev.filter((thread) => thread.id !== id);
        const finalList =
          next.length > 0
            ? next
            : [{ id: newThreadId(), title: "محادثة جديدة", messages: [], updatedAt: Date.now() }];
        saveThreads(finalList);
        if (id === activeId) {
          const newActive = finalList[0].id;
          setActiveId(newActive);
          try {
            localStorage.setItem(ACTIVE_KEY, newActive);
          } catch {
            /* ignore */
          }
        }
        return finalList;
      });
    },
    [activeId],
  );

  const renameThread = useCallback((id: string, title: string) => {
    setThreads((prev) => {
      const next = prev.map((thread) =>
        thread.id === id ? { ...thread, title: title.trim() || thread.title } : thread,
      );
      saveThreads(next);
      return next;
    });
    setRenamingId(null);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(102,126,234,0.18),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(118,75,162,0.14),transparent_28%),linear-gradient(180deg,#040507_0%,#08090d_45%,#040507_100%)]" />
        <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full blur-3xl bg-sky-500/10" />
        <div className="absolute right-[10%] bottom-[12%] h-80 w-80 rounded-full blur-3xl bg-fuchsia-500/10" />
      </div>

      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-background/60 border-b border-white/5">
        <div className="max-w-[1680px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((value) => !value)}
              className="inline-flex items-center justify-center size-9 rounded-xl border border-white/10 hover:bg-white/5 text-muted-foreground hover:text-foreground transition"
              aria-label="Toggle history"
            >
              <PanelLeft className="size-4" />
            </button>
            <Link to="/" className="flex items-center gap-3">
              <img src={logoAsset.url} alt="Lux" className="h-8 w-8 rounded-full ring-1 ring-white/15" />
              <div className="leading-none">
                <div className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">Lux Addons</div>
                <div className="font-display text-sm tracking-[0.28em]">LUX AI CLOUD</div>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[10px] tracking-[0.24em] uppercase">
            <StatusPill icon={Zap} label="Fast responses" />
            <StatusPill icon={Brain} label="Expert reasoning" />
            <StatusPill icon={Globe2} label="Multi-domain" />
          </div>

          <div className="flex items-center gap-2">
            <Link to="/projects" className="hidden md:inline-flex text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition">
              Projects
            </Link>
            <button
              onClick={createThread}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-gradient-to-b from-amber-200/95 to-amber-400/90 text-black text-[10px] tracking-[0.25em] uppercase font-semibold hover:brightness-110 transition"
            >
              <Plus className="size-3.5" /> New
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1680px] mx-auto px-3 md:px-6 py-4">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: sidebarOpen ? "290px minmax(0,1fr)" : "0px minmax(0,1fr)",
            transition: "grid-template-columns 240ms ease",
          }}
        >
          <aside
            className={`${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-200 min-h-[82vh] rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col backdrop-blur-xl`}
          >
            <div className="px-4 py-4 border-b border-white/5 flex items-center justify-between">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">History</div>
                <div dir="rtl" className="font-arabic text-xs text-foreground/70 mt-1">جلساتك محفوظة محليًا</div>
              </div>
              <button
                onClick={createThread}
                className="inline-flex items-center gap-1 text-[10px] tracking-[0.25em] uppercase text-amber-200/80 hover:text-amber-100 transition"
              >
                <Plus className="size-3.5" /> New
              </button>
            </div>

            <div className="px-4 py-4 grid grid-cols-3 gap-2 border-b border-white/5">
              <MiniStat label="Threads" value={threads.length} />
              <MiniStat label="Modes" value={4} />
              <MiniStat label="Studio" value={1} />
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {threads.length === 0 && (
                <div className="text-xs text-muted-foreground/70 text-center py-6 font-arabic">لا توجد محادثات بعد</div>
              )}
              {threads
                .slice()
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .map((thread) => {
                  const isActive = thread.id === activeId;
                  const isRenaming = renamingId === thread.id;
                  return (
                    <div
                      key={thread.id}
                      className={`group relative rounded-2xl border transition ${
                        isActive
                          ? "border-sky-400/35 bg-sky-400/[0.08]"
                          : "border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                      }`}
                    >
                      {isRenaming ? (
                        <div className="flex items-center gap-1 p-3">
                          <input
                            autoFocus
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") renameThread(thread.id, renameValue);
                              if (e.key === "Escape") setRenamingId(null);
                            }}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs outline-none focus:border-amber-200/50 font-arabic"
                          />
                          <button onClick={() => renameThread(thread.id, renameValue)} className="p-1 text-emerald-300 hover:text-emerald-200">
                            <Check className="size-3.5" />
                          </button>
                          <button onClick={() => setRenamingId(null)} className="p-1 text-muted-foreground hover:text-foreground">
                            <X className="size-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => selectThread(thread.id)}
                            className="flex-1 text-right min-w-0 px-3 py-3 flex items-center gap-2"
                          >
                            <MessageSquare className={`size-3.5 shrink-0 ${isActive ? "text-sky-300" : "text-muted-foreground"}`} />
                            <span className={`truncate text-[13px] font-arabic ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                              {thread.title}
                            </span>
                          </button>
                          <div className="opacity-0 group-hover:opacity-100 transition flex items-center pr-1.5">
                            <button
                              onClick={() => {
                                setRenamingId(thread.id);
                                setRenameValue(thread.title);
                              }}
                              className="p-1 text-muted-foreground hover:text-foreground"
                              title="Rename"
                            >
                              <Pencil className="size-3.5" />
                            </button>
                            <button
                              onClick={() => deleteThread(thread.id)}
                              className="p-1 text-muted-foreground hover:text-red-300"
                              title="Delete"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </aside>

          <main className="min-h-[82vh]">
            {hydrated && activeThread ? (
              <Workspace
                key={activeThread.id}
                thread={activeThread}
                onPersist={(msgs) =>
                  updateActive((thread) => ({
                    ...thread,
                    messages: msgs,
                    title: thread.messages.length === 0 && msgs.length > 0 ? titleFromMessages(msgs) : thread.title,
                    updatedAt: Date.now(),
                  }))
                }
              />
            ) : (
              <div className="h-full grid place-items-center text-muted-foreground">
                <Loader2 className="size-5 animate-spin" />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function Workspace({
  thread,
  onPersist,
}: {
  thread: Thread;
  onPersist: (msgs: UIMessage[]) => void;
}) {
  const [input, setInput] = useState("");
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [mode, setMode] = useState<LuxMode>("chat");
  const [style, setStyle] = useState<ResponseStyle>("balanced");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    id: thread.id,
    messages: thread.messages,
    transport: new DefaultChatTransport({ api: "/api/ai-lux" }),
  });

  const lastPersistRef = useRef<string>("");
  useEffect(() => {
    if (status === "submitted" || status === "streaming") return;
    const sig = JSON.stringify(messages.map((message) => [message.id, message.role, messageText(message)]));
    if (sig === lastPersistRef.current) return;
    lastPersistRef.current = sig;
    onPersist(messages);
  }, [messages, status, onPersist]);

  const latestHtml = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role !== "assistant") continue;
      const html = extractHtml(messageText(messages[i]));
      if (html) return html;
    }
    return null;
  }, [messages]);

  const latestCode = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role !== "assistant") continue;
      const code = extractCode(messageText(messages[i]));
      if (code) return code;
    }
    return null;
  }, [messages]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [thread.id]);

  const busy = status === "submitted" || status === "streaming";
  const modeConfig = MODE_CONFIG[mode];
  const styleConfig = STYLE_CONFIG[style];
  const ModeIcon = modeConfig.icon;
  const exportText = mode === "website" ? (latestHtml ?? latestCode) : latestCode;

  async function submit(text?: string) {
    const value = (text ?? input).trim();
    if (!value || busy) return;
    setInput("");
    const payload = `${controlPrefix(mode, style)}\n${value}`;
    await sendMessage({ text: payload });
    inputRef.current?.focus();
  }

  return (
    <div className="grid xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-4 h-[calc(100vh-6.8rem)] min-h-[640px]">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col backdrop-blur-xl">
        <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-r from-sky-500/[0.07] via-transparent to-fuchsia-500/[0.06]">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Lux AI Studio</div>
              <div dir="rtl" className="font-arabic text-sm text-foreground/80 mt-1">واجهة حديثة للمحادثة والبرمجة والـ prompts وبناء المواقع</div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/50 px-3 py-1.5 text-[10px] tracking-[0.24em] uppercase text-amber-200/80">
              <ModeIcon className="size-3.5" /> {modeConfig.label}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-b border-white/5 space-y-4">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {(["chat", "code", "images", "website"] as LuxMode[]).map((item) => {
              const cfg = MODE_CONFIG[item];
              const ActiveIcon = cfg.icon;
              const active = mode === item;
              return (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-sky-400/35 bg-sky-400/[0.08]"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2 text-foreground/85">
                    <ActiveIcon className="size-4" />
                    <span className="text-[10px] tracking-[0.24em] uppercase">{cfg.label}</span>
                  </div>
                  <div dir="rtl" className="font-arabic text-sm mt-3 text-foreground/90">
                    {cfg.arabic}
                  </div>
                  <p dir="rtl" className="font-arabic mt-2 text-xs leading-[1.8] text-muted-foreground">
                    {cfg.summary}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex flex-wrap gap-2">
              {(["fast", "balanced", "deep"] as ResponseStyle[]).map((item) => {
                const cfg = STYLE_CONFIG[item];
                const StyleIcon = cfg.icon;
                const active = style === item;
                return (
                  <button
                    key={item}
                    onClick={() => setStyle(item)}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] tracking-[0.24em] uppercase transition ${
                      active
                        ? "border border-amber-200/35 bg-amber-200/10 text-amber-100"
                        : "border border-white/10 bg-white/[0.02] text-muted-foreground hover:text-foreground hover:border-white/20"
                    }`}
                  >
                    <StyleIcon className="size-3.5" /> {cfg.label}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => submit(modeConfig.quickAction)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] tracking-[0.24em] uppercase text-foreground/80 hover:bg-white/[0.05] transition"
            >
              <Sparkles className="size-3.5" /> Quick Action
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <InfoTile title="Mode" value={modeConfig.arabic} />
            <InfoTile title="Style" value={styleConfig.arabic} />
            <InfoTile title="Output" value={mode === "website" ? "HTML / Preview" : mode === "images" ? "Prompts" : mode === "code" ? "Code" : "Answers"} />
          </div>
        </div>

        <div ref={scrollerRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Wand2 className="size-4 text-amber-200" />
                  <span className="text-[11px] tracking-[0.3em] uppercase text-foreground/85">{modeConfig.label}</span>
                </div>
                <p dir="rtl" className="font-arabic text-sm text-muted-foreground leading-[1.95]">
                  {modeConfig.summary}
                </p>
              </div>
              <div className="grid gap-2">
                {modeConfig.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => submit(suggestion)}
                    className="text-right text-[13px] font-arabic leading-relaxed rounded-2xl border border-white/10 hover:border-amber-200/40 hover:bg-white/[0.03] transition px-4 py-3 text-muted-foreground hover:text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => {
            const text = messageText(message);
            const isUser = message.role === "user";
            return (
              <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed whitespace-pre-wrap font-arabic ${
                    isUser
                      ? "bg-gradient-to-b from-amber-200/95 to-amber-400/90 text-black"
                      : "border border-white/10 bg-white/[0.03] text-foreground/95"
                  }`}
                >
                  {text ||
                    (message.role === "assistant" && busy ? (
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="size-3.5 animate-spin" /> يفكّر…
                      </span>
                    ) : null)}
                </div>
              </div>
            );
          })}

          {busy && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-muted-foreground text-sm inline-flex items-center gap-2">
                <Loader2 className="size-3.5 animate-spin" /> Lux AI يكتب…
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              حدث خطأ. حاول مرة أخرى.
            </div>
          )}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="border-t border-white/5 p-4 bg-background/40">
          <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.02] focus-within:border-amber-200/40 transition p-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              rows={1}
              placeholder={modeConfig.placeholder}
              className="flex-1 resize-none bg-transparent outline-none px-3 py-2 text-[14px] font-arabic max-h-40"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-amber-200/95 to-amber-400/90 text-black px-4 py-3 text-[11px] tracking-[0.25em] uppercase font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition"
            >
              {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
              Send
            </button>
          </div>
          <div className="mt-2 text-[10px] tracking-[0.28em] uppercase text-muted-foreground/70">
            {styleConfig.hint}
          </div>
        </form>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col backdrop-blur-xl">
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setTab("preview")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] tracking-[0.25em] uppercase transition ${tab === "preview" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Eye className="size-3.5" /> Preview
            </button>
            <button
              onClick={() => setTab("code")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] tracking-[0.25em] uppercase transition ${tab === "code" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Code2 className="size-3.5" /> Code
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={!exportText}
              onClick={() => exportText && navigator.clipboard.writeText(exportText)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground disabled:opacity-30 transition"
              title="Copy Output"
            >
              <Copy className="size-3.5" /> Copy
            </button>
            <button
              disabled={!exportText}
              onClick={() => {
                if (!exportText) return;
                const extension = mode === "website" ? "html" : "txt";
                const type = mode === "website" ? "text/html" : "text/plain";
                const blob = new Blob([exportText], { type });
                const url = URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = `lux-ai-output.${extension}`;
                anchor.click();
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground disabled:opacity-30 transition"
              title="Download Output"
            >
              <Download className="size-3.5" /> Save
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-black/30">
          {mode === "website" && latestHtml && tab === "preview" ? (
            <iframe title="Lux AI Preview" srcDoc={latestHtml} sandbox="allow-scripts allow-same-origin" className="w-full h-full bg-white" />
          ) : tab === "code" && exportText ? (
            <pre className="w-full h-full overflow-auto text-[12px] leading-relaxed p-4 text-emerald-200/90 font-mono whitespace-pre-wrap">
              {exportText}
            </pre>
          ) : (
            <ModeStudio mode={mode} latestHtml={latestHtml} latestCode={latestCode} />
          )}
        </div>
      </div>
    </div>
  );
}

function ModeStudio({ mode, latestHtml, latestCode }: { mode: LuxMode; latestHtml: string | null; latestCode: string | null }) {
  if (mode === "website") {
    return (
      <div className="h-full p-6 overflow-auto">
        <StudioHero
          eyebrow="Website Builder"
          title="Cloud-grade page generation"
          text="ابنِ صفحات HTML كاملة، لاندنق بيج، لوحات تحكم، وصفحات تعريف منتجات داخل Lux بسرعة وبفخامة حديثة."
        />
        <FeatureGrid
          items={[
            "Landing Pages",
            "Dashboards",
            "Product Pages",
            "Brand Portfolios",
          ]}
        />
        {latestHtml && <ReadyCard text="تم اكتشاف مخرجات HTML — انتقل إلى Preview أو Code لمشاهدتها." />}
      </div>
    );
  }

  if (mode === "images") {
    return (
      <div className="h-full p-6 overflow-auto">
        <StudioHero
          eyebrow="Prompt Studio"
          title="Premium prompt crafting"
          text="صناعة prompts قوية للصور، البنرات، الأغلفة، والمشاهد البصرية الفاخرة قبل ربط مولد الصور فعليًا."
        />
        <FeatureGrid
          items={[
            "Cinematic prompts",
            "Ad visuals",
            "Product covers",
            "Luxury branding",
          ]}
        />
      </div>
    );
  }

  if (mode === "code") {
    return (
      <div className="h-full p-6 overflow-auto">
        <StudioHero
          eyebrow="Code Assistant"
          title="Build, debug, explain"
          text="استخدم Lux AI كمهندس برمجي سريع لبناء المكونات، مراجعة الكود، وتصحيح المشاكل مع إجابات أقوى وأكثر تنظيمًا."
        />
        {latestCode ? (
          <ReadyCard text="فيه مخرجات كود جاهزة — افتح تبويب Code لنسخها." />
        ) : (
          <FeatureGrid
            items={[
              "React components",
              "API routes",
              "TypeScript fixes",
              "Code cleanup",
            ]}
          />
        )}
      </div>
    );
  }

  return (
    <div className="h-full p-6 overflow-auto">
      <StudioHero
        eyebrow="General Intelligence"
        title="A sharper Lux AI experience"
        text="واجهة سحابية حديثة للمحادثة العامة، الترتيب، الكتابة، الترجمة، والتفكير الاستشاري داخل منظومة Lux."
      />
      <FeatureGrid items={["Planning", "Copywriting", "Translation", "Idea structuring"]} />
    </div>
  );
}

function StudioHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 mb-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,92,255,0.12),transparent_30%)]" />
      <div className="relative">
        <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{eyebrow}</div>
        <h3 className="font-display text-3xl mt-3 font-bold tracking-tight">{title}</h3>
        <p dir="rtl" className="font-arabic mt-3 text-sm leading-[1.95] text-muted-foreground max-w-2xl">
          {text}
        </p>
      </div>
    </div>
  );
}

function FeatureGrid({ items }: { items: string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-foreground/85">
          {item}
        </div>
      ))}
    </div>
  );
}

function ReadyCard({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4 mt-4">
      <div className="text-[10px] tracking-[0.28em] uppercase text-emerald-200/80">Ready</div>
      <div dir="rtl" className="font-arabic text-sm mt-2 text-foreground/85">{text}</div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center">
      <div className="text-[9px] tracking-[0.24em] uppercase text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold tracking-tight">{value}</div>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-[9px] tracking-[0.28em] uppercase text-muted-foreground">{label}</div>
      <div dir="rtl" className="font-arabic mt-2 text-sm text-foreground/85">{value}</div>
    </div>
  );
}

function StatusPill({ icon: Icon, label }: { icon: typeof Zap; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-muted-foreground hover:text-foreground transition">
      <Icon className="size-3.5" />
      <span>{label}</span>
    </div>
  );
}

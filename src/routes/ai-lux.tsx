import { createFileRoute, Link } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  Check,
  Code2,
  Copy,
  Download,
  Eye,
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
} from "lucide-react";
import logoAsset from "@/assets/lux-logo.png.asset.json";

export const Route = createFileRoute("/ai-lux")({
  head: () => ({
    meta: [
      { title: "Lux AI — الذكاء الاصطناعي الرسمي لـ Lux Addons" },
      {
        name: "description",
        content:
          "Lux AI — منصة ذكية داخل Lux Addons تدعم Chat و Code و Images و Website Builder.",
      },
      { property: "og:title", content: "Lux AI" },
      { property: "og:description", content: "ذكاء اصطناعي متطور داخل Lux Addons." },
    ],
  }),
  component: AiLuxPage,
});

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

function messageText(m: UIMessage): string {
  return m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
}

type Thread = {
  id: string;
  title: string;
  messages: UIMessage[];
  updatedAt: number;
};

type AiMode = "chat" | "code" | "images" | "website";

const STORAGE_KEY = "lux-ai-threads-v2";
const ACTIVE_KEY = "lux-ai-active-v2";

const MODE_CONFIG: Record<
  AiMode,
  {
    label: string;
    arabic: string;
    icon: typeof Bot;
    placeholder: string;
    quickAction: string;
    suggestions: string[];
  }
> = {
  chat: {
    label: "Chat",
    arabic: "محادثة عامة",
    icon: MessageSquare,
    placeholder: "اكتب سؤالك أو اطلب مساعدة…",
    quickAction: "رتب لي هذه الفكرة في نقاط واضحة ومختصرة.",
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
    placeholder: "الصق الكود أو اطلب مني بناء أو تصحيح جزء برمجي…",
    quickAction: "أنشئ لي مكون React احترافي مع شرح مختصر للكود.",
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
    suggestions: [
      "صمم لي landing page فخمة لمشروع تقني بالأسود والذهبي",
      "ابنِ صفحة تعريف لمشروع أداة تشفير مواقع",
      "Build a premium portfolio homepage for a brand studio",
      "أنشئ Dashboard حديث لعرض منتجات Lux ومشاريعها",
    ],
  },
};

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
  const first = msgs.find((m) => m.role === "user");
  if (!first) return "محادثة جديدة";
  const txt = messageText(first).trim().replace(/\s+/g, " ");
  return txt.slice(0, 42) || "محادثة جديدة";
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
      const t: Thread = { id: newThreadId(), title: "محادثة جديدة", messages: [], updatedAt: Date.now() };
      saveThreads([t]);
      setThreads([t]);
      active = t.id;
      try {
        localStorage.setItem(ACTIVE_KEY, t.id);
      } catch {
        /* ignore */
      }
    } else {
      setThreads(loaded);
      if (!active || !loaded.find((t) => t.id === active)) active = loaded[0].id;
    }
    setActiveId(active);
    setHydrated(true);
  }, []);

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeId) ?? null,
    [threads, activeId],
  );

  const updateActive = useCallback(
    (updater: (t: Thread) => Thread) => {
      setThreads((prev) => {
        const next = prev.map((t) => (t.id === activeId ? updater(t) : t));
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
        const next = prev.filter((t) => t.id !== id);
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
      const next = prev.map((t) => (t.id === id ? { ...t, title: title.trim() || t.title } : t));
      saveThreads(next);
      return next;
    });
    setRenamingId(null);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-32 left-1/4 h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.18 250 / 0.35), transparent 65%)" }}
        />
        <div
          className="absolute -bottom-40 right-1/5 h-[560px] w-[560px] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.14 85 / 0.28), transparent 65%)" }}
        />
      </div>

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="inline-flex items-center justify-center size-8 rounded-md border border-white/10 hover:bg-white/5 text-muted-foreground hover:text-foreground transition"
              aria-label="Toggle history"
              title="History"
            >
              <PanelLeft className="size-4" />
            </button>
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logoAsset.url} alt="Lux" className="h-7 w-7 rounded-full ring-1 ring-white/15" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground">Lux Addons</span>
                <span className="font-display text-[13px] tracking-[0.22em]">AI · LUX</span>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-5 text-[10.5px] tracking-[0.26em] uppercase text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition">Home</Link>
            <Link to="/projects" className="hover:text-foreground transition">Projects</Link>
            <Link to="/image-generator" className="hover:text-foreground transition">Images</Link>
            <Link to="/web-encryption" className="hover:text-foreground transition">Security</Link>
            <Link to="/news" className="hover:text-foreground transition">News</Link>
            <Link to="/admin" className="hover:text-foreground transition">Admin</Link>
          </nav>
          <button
            onClick={createThread}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-gradient-to-b from-amber-200/90 to-amber-400/90 text-black text-[10px] tracking-[0.25em] uppercase font-semibold hover:brightness-110 transition"
          >
            <Plus className="size-3.5" /> New
          </button>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-3 md:px-6 py-4">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: sidebarOpen ? "260px minmax(0,1fr)" : "0px minmax(0,1fr)",
            transition: "grid-template-columns 240ms ease",
          }}
        >
          <aside
            className={`${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-200 min-h-[80vh] rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden flex flex-col`}
          >
            <div className="px-3 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">History</div>
              <button
                onClick={createThread}
                className="inline-flex items-center gap-1 text-[10px] tracking-[0.25em] uppercase text-amber-200/80 hover:text-amber-100 transition"
                title="New chat"
              >
                <Plus className="size-3.5" /> New
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {threads.length === 0 && (
                <div className="text-xs text-muted-foreground/70 text-center py-6 font-arabic">لا توجد محادثات بعد</div>
              )}
              {threads
                .slice()
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .map((t) => {
                  const isActive = t.id === activeId;
                  const isRenaming = renamingId === t.id;
                  return (
                    <div
                      key={t.id}
                      className={`group relative rounded-lg border transition ${
                        isActive
                          ? "border-amber-200/40 bg-amber-200/[0.06]"
                          : "border-transparent hover:border-white/10 hover:bg-white/[0.03]"
                      }`}
                    >
                      {isRenaming ? (
                        <div className="flex items-center gap-1 p-2">
                          <input
                            autoFocus
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") renameThread(t.id, renameValue);
                              if (e.key === "Escape") setRenamingId(null);
                            }}
                            className="flex-1 bg-black/40 border border-white/10 rounded px-2 py-1 text-xs outline-none focus:border-amber-200/50 font-arabic"
                          />
                          <button onClick={() => renameThread(t.id, renameValue)} className="p-1 text-emerald-300 hover:text-emerald-200"><Check className="size-3.5" /></button>
                          <button onClick={() => setRenamingId(null)} className="p-1 text-muted-foreground hover:text-foreground"><X className="size-3.5" /></button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button onClick={() => selectThread(t.id)} className="flex-1 text-right min-w-0 px-3 py-2.5 flex items-center gap-2">
                            <MessageSquare className={`size-3.5 shrink-0 ${isActive ? "text-amber-200" : "text-muted-foreground"}`} />
                            <span className={`truncate text-[13px] font-arabic ${isActive ? "text-foreground" : "text-foreground/80"}`}>{t.title}</span>
                          </button>
                          <div className="opacity-0 group-hover:opacity-100 transition flex items-center pr-1.5">
                            <button
                              onClick={() => {
                                setRenamingId(t.id);
                                setRenameValue(t.title);
                              }}
                              className="p-1 text-muted-foreground hover:text-foreground"
                              title="Rename"
                            >
                              <Pencil className="size-3.5" />
                            </button>
                            <button onClick={() => deleteThread(t.id)} className="p-1 text-muted-foreground hover:text-red-300" title="Delete">
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
            <div className="px-3 py-2.5 border-t border-white/5 text-[9px] tracking-[0.3em] uppercase text-muted-foreground/60">
              محفوظ محلياً في متصفحك
            </div>
          </aside>

          <main className="min-h-[80vh]">
            {hydrated && activeThread ? (
              <Workspace
                key={activeThread.id}
                thread={activeThread}
                onPersist={(msgs) =>
                  updateActive((t) => ({
                    ...t,
                    messages: msgs,
                    title: t.messages.length === 0 && msgs.length > 0 ? titleFromMessages(msgs) : t.title,
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
  const [mode, setMode] = useState<AiMode>("chat");
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
    const sig = JSON.stringify(messages.map((m) => [m.id, m.role, messageText(m)]));
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
  const ModeIcon = modeConfig.icon;
  const exportText = mode === "website" ? (latestHtml ?? latestCode) : latestCode;
  const suggestions = modeConfig.suggestions;

  async function submit(text?: string) {
    const value = (text ?? input).trim();
    if (!value || busy) return;
    setInput("");
    await sendMessage({ text: value });
    inputRef.current?.focus();
  }

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-4 h-[calc(100vh-6.5rem)] min-h-[600px]">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10.5px] tracking-[0.3em] uppercase text-muted-foreground truncate">Lux AI · Online</span>
          </div>
          <div className="text-[9px] tracking-[0.3em] uppercase text-amber-200/60 truncate max-w-[45%] font-arabic" title={thread.title}>
            {thread.title}
          </div>
        </div>

        <div className="px-4 py-3 border-b border-white/5 bg-background/30 space-y-3">
          <div className="flex flex-wrap gap-2">
            {(["chat", "code", "images", "website"] as AiMode[]).map((item) => {
              const ActiveIcon = MODE_CONFIG[item].icon;
              const active = mode === item;
              return (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] tracking-[0.24em] uppercase transition ${
                    active
                      ? "bg-amber-200/10 border border-amber-200/35 text-amber-100"
                      : "bg-white/[0.03] border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
                  }`}
                >
                  <ActiveIcon className="size-3.5" />
                  {MODE_CONFIG[item].label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-amber-200/80">
              <ModeIcon className="size-3.5" /> {modeConfig.label}
            </div>
            <button
              type="button"
              onClick={() => submit(modeConfig.quickAction)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] tracking-[0.24em] uppercase text-foreground/80 hover:bg-white/[0.05] transition"
            >
              <Sparkles className="size-3.5" /> Quick Action
            </button>
          </div>
        </div>

        <div ref={scrollerRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="size-4 text-amber-200" />
                  <span className="text-[11px] tracking-[0.3em] uppercase">{modeConfig.label}</span>
                </div>
                <p className="text-sm text-muted-foreground font-arabic leading-relaxed">
                  {mode === "website"
                    ? "اطلب صفحة HTML أو Landing Page أو Dashboard كاملة، وسيبنيها لك Lux AI مع معاينة مباشرة."
                    : mode === "images"
                      ? "استخدم هذا الوضع لصناعة prompts فاخرة للصور والإعلانات والمفاهيم البصرية."
                      : mode === "code"
                        ? "هذا الوضع مخصص للكود، التصحيح، بناء المكونات، وشرح الأخطاء البرمجية."
                        : "استخدم Lux AI للمحادثة العامة، التخطيط، الكتابة، الترجمة، وتنظيم الأفكار."}
                </p>
              </div>
              <div className="grid gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => submit(suggestion)}
                    className="text-right text-[13px] font-arabic leading-relaxed rounded-lg border border-white/10 hover:border-amber-200/40 hover:bg-white/[0.03] transition px-3 py-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            const text = messageText(m);
            const isUser = m.role === "user";
            return (
              <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] rounded-xl px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap font-arabic ${
                    isUser
                      ? "bg-primary text-primary-foreground"
                      : "border border-white/10 bg-white/[0.03] text-foreground/95"
                  }`}
                >
                  {text ||
                    (m.role === "assistant" && busy ? (
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
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-muted-foreground text-sm inline-flex items-center gap-2">
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

        <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="border-t border-white/5 p-3 bg-background/40">
          <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[0.02] focus-within:border-amber-200/40 transition p-2">
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
              className="flex-1 resize-none bg-transparent outline-none px-2 py-1.5 text-[14px] font-arabic max-h-40"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-b from-amber-200/90 to-amber-400/90 text-black px-3 py-2 text-[11px] tracking-[0.25em] uppercase font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition"
            >
              {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
              Send
            </button>
          </div>
          <div className="mt-2 text-[10px] tracking-[0.28em] uppercase text-muted-foreground/70">
            Enter to send · Shift+Enter for newline
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/5">
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => setTab("preview")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] tracking-[0.25em] uppercase transition ${tab === "preview" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Eye className="size-3.5" /> Preview
            </button>
            <button
              onClick={() => setTab("code")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] tracking-[0.25em] uppercase transition ${tab === "code" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Code2 className="size-3.5" /> Code
            </button>
            <span className="ml-2 text-[10px] tracking-[0.22em] uppercase text-amber-200/80">{modeConfig.label}</span>
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
                const a = document.createElement("a");
                a.href = url;
                a.download = `lux-ai-output.${extension}`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground disabled:opacity-30 transition"
              title="Download Output"
            >
              <Download className="size-3.5" /> Save
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-black/40">
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

function ModeStudio({ mode, latestHtml, latestCode }: { mode: AiMode; latestHtml: string | null; latestCode: string | null }) {
  if (mode === "website") {
    return (
      <div className="h-full p-6 overflow-auto">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-4">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Website Builder</div>
          <h3 className="font-display text-2xl mt-3">Build full pages from prompts</h3>
          <p dir="rtl" className="font-arabic mt-3 text-sm leading-[1.95] text-muted-foreground">
            اطلب من Lux AI صفحات HTML كاملة، لاندنق بيج، لوحات تحكم، أو صفحات تعريف للمشاريع — وستظهر هنا للمعاينة والنسخ.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Landing Page فخمة لمشروع تقني",
            "صفحة تعريف لمتجر أو أداة داخل Lux",
            "Dashboard لعرض المنتجات والحالات",
            "Portfolio مع هيدر فاخر وهوية مظلمة",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">Template Idea</div>
              <div dir="rtl" className="font-arabic text-sm text-foreground/85">{item}</div>
            </div>
          ))}
        </div>
        {latestHtml && (
          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4 mt-4">
            <div className="text-[10px] tracking-[0.28em] uppercase text-emerald-200/80">Ready</div>
            <div dir="rtl" className="font-arabic text-sm mt-2 text-foreground/85">تم اكتشاف مخرجات HTML — انتقل إلى Preview أو Code لمشاهدتها.</div>
          </div>
        )}
      </div>
    );
  }

  if (mode === "images") {
    return (
      <div className="h-full p-6 overflow-auto">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-4">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Prompt Studio</div>
          <h3 className="font-display text-2xl mt-3">Craft premium image prompts</h3>
          <p dir="rtl" className="font-arabic mt-3 text-sm leading-[1.95] text-muted-foreground">
            هذا الوضع مخصص لصناعة prompts احترافية للصور، البنرات، الأغلفة، والهوية البصرية قبل ربط مولد الصور فعليًا.
          </p>
        </div>
        <div className="space-y-4">
          {[
            "Style: cinematic, dark luxury, black and gold",
            "Subject: knight, city, product, futuristic dashboard",
            "Lighting: volumetric, soft glow, dramatic highlights",
            "Output: banner, cover, ad visual, hero image",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-foreground/85">
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === "code") {
    return (
      <div className="h-full p-6 overflow-auto">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-4">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Code Assistant</div>
          <h3 className="font-display text-2xl mt-3">Build, debug, explain</h3>
          <p dir="rtl" className="font-arabic mt-3 text-sm leading-[1.95] text-muted-foreground">
            استخدم هذا الوضع لكتابة كود React و JavaScript و TypeScript، أو لشرح الأخطاء وبناء مكونات جديدة داخل موقع Lux.
          </p>
        </div>
        {latestCode ? (
          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4">
            <div className="text-[10px] tracking-[0.28em] uppercase text-emerald-200/80">Latest Output</div>
            <div dir="rtl" className="font-arabic text-sm mt-2 text-foreground/85">فيه مخرجات كود جاهزة — افتح تبويب Code لنسخها.</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "React components",
              "API route snippets",
              "TypeScript fixes",
              "Code review & cleanup",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-foreground/85">
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-4">
        <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Lux AI</div>
        <h3 className="font-display text-2xl mt-3">General intelligence for Lux</h3>
        <p dir="rtl" className="font-arabic mt-3 text-sm leading-[1.95] text-muted-foreground">
          استخدم هذا الوضع للمحادثات العامة، التخطيط، الكتابة، الترجمة، وتنظيم الأفكار.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {["خطط مشاريع", "نصوص تسويقية", "ترجمة وصياغة", "تنظيم أفكار وميزات"].map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-foreground/85">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

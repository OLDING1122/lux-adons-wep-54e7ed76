import { createFileRoute, Link } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Send, Sparkles, Code2, Eye, Download, Copy, Loader2, Wand2,
  Plus, MessageSquare, Trash2, PanelLeft, Pencil, Check, X,
} from "lucide-react";
import logoAsset from "@/assets/lux-logo.png.asset.json";

export const Route = createFileRoute("/ai-lux")({
  head: () => ({
    meta: [
      { title: "Lux AI — الذكاء الاصطناعي الرسمي لـ Lux Addons" },
      { name: "description", content: "Lux AI — ذكاء اصطناعي متطور طُوِّر محلياً بقيادة فريق التطوير لدى LUX. محادثة، برمجة، وتصميم مواقع بجميع اللغات." },
      { property: "og:title", content: "Lux AI" },
      { property: "og:description", content: "ذكاء اصطناعي فخم من تطوير Lux — يصمم مواقع، يبرمج، ويجاوب بأي لغة." },
    ],
  }),
  component: AiLuxPage,
});

// ---------- HTML extraction ----------
function extractHtml(text: string): string | null {
  const closed = text.match(/```html\s*([\s\S]*?)```/i);
  if (closed && closed[1].trim()) return closed[1].trim();
  const open = text.match(/```html\s*([\s\S]*)$/i);
  if (open && /<[a-z!]/i.test(open[1])) return open[1].trim();
  const d = text.match(/<!doctype html[\s\S]*?<\/html>/i);
  if (d) return d[0];
  const ds = text.match(/<!doctype html[\s\S]*$/i);
  return ds ? ds[0] : null;
}

function messageText(m: UIMessage): string {
  return m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
}

// ---------- Chat history (localStorage) ----------
type Thread = {
  id: string;
  title: string;
  messages: UIMessage[];
  updatedAt: number;
};

const STORAGE_KEY = "lux-ai-threads-v1";
const ACTIVE_KEY = "lux-ai-active-v1";

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
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(threads)); } catch { /* ignore */ }
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

// ---------- Page ----------
function AiLuxPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // Hydrate once from localStorage
  useEffect(() => {
    const loaded = loadThreads();
    let active = typeof window !== "undefined" ? localStorage.getItem(ACTIVE_KEY) : null;
    if (loaded.length === 0) {
      const t: Thread = { id: newThreadId(), title: "محادثة جديدة", messages: [], updatedAt: Date.now() };
      saveThreads([t]);
      setThreads([t]);
      active = t.id;
      try { localStorage.setItem(ACTIVE_KEY, t.id); } catch { /* ignore */ }
    } else {
      setThreads(loaded);
      if (!active || !loaded.find((t) => t.id === active)) active = loaded[0].id;
    }
    setActiveId(active);
    setHydrated(true);
  }, []);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === activeId) ?? null,
    [threads, activeId],
  );

  const updateActive = useCallback((updater: (t: Thread) => Thread) => {
    setThreads((prev) => {
      const next = prev.map((t) => (t.id === activeId ? updater(t) : t));
      saveThreads(next);
      return next;
    });
  }, [activeId]);

  const createThread = useCallback(() => {
    const t: Thread = { id: newThreadId(), title: "محادثة جديدة", messages: [], updatedAt: Date.now() };
    setThreads((prev) => {
      const next = [t, ...prev];
      saveThreads(next);
      return next;
    });
    setActiveId(t.id);
    try { localStorage.setItem(ACTIVE_KEY, t.id); } catch { /* ignore */ }
  }, []);

  const selectThread = useCallback((id: string) => {
    setActiveId(id);
    try { localStorage.setItem(ACTIVE_KEY, id); } catch { /* ignore */ }
  }, []);

  const deleteThread = useCallback((id: string) => {
    setThreads((prev) => {
      const next = prev.filter((t) => t.id !== id);
      const finalList = next.length > 0 ? next : [{ id: newThreadId(), title: "محادثة جديدة", messages: [], updatedAt: Date.now() }];
      saveThreads(finalList);
      if (id === activeId) {
        const newActive = finalList[0].id;
        setActiveId(newActive);
        try { localStorage.setItem(ACTIVE_KEY, newActive); } catch { /* ignore */ }
      }
      return finalList;
    });
  }, [activeId]);

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
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-1/4 h-[520px] w-[520px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, oklch(0.55 0.18 250 / 0.35), transparent 65%)" }} />
        <div className="absolute -bottom-40 right-1/5 h-[560px] w-[560px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, oklch(0.72 0.14 85 / 0.28), transparent 65%)" }} />
      </div>

      {/* Header */}
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
            <Link to="/news" className="hover:text-foreground transition">News</Link>
            <Link to="/chronicle" className="hover:text-foreground transition">Chronicle</Link>
            <Link to="/rules" className="hover:text-foreground transition">Rules</Link>
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
          {/* Sidebar / History */}
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
                          <button
                            onClick={() => selectThread(t.id)}
                            className="flex-1 text-right min-w-0 px-3 py-2.5 flex items-center gap-2"
                          >
                            <MessageSquare className={`size-3.5 shrink-0 ${isActive ? "text-amber-200" : "text-muted-foreground"}`} />
                            <span className={`truncate text-[13px] font-arabic ${isActive ? "text-foreground" : "text-foreground/80"}`}>{t.title}</span>
                          </button>
                          <div className="opacity-0 group-hover:opacity-100 transition flex items-center pr-1.5">
                            <button
                              onClick={() => { setRenamingId(t.id); setRenameValue(t.title); }}
                              className="p-1 text-muted-foreground hover:text-foreground"
                              title="Rename"
                            >
                              <Pencil className="size-3.5" />
                            </button>
                            <button
                              onClick={() => deleteThread(t.id)}
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
            <div className="px-3 py-2.5 border-t border-white/5 text-[9px] tracking-[0.3em] uppercase text-muted-foreground/60">
              محفوظ محلياً في متصفحك
            </div>
          </aside>

          {/* Main workspace */}
          <main className="min-h-[80vh]">
            {hydrated && activeThread ? (
              <Workspace
                key={activeThread.id}
                thread={activeThread}
                onPersist={(msgs) => updateActive((t) => ({
                  ...t,
                  messages: msgs,
                  title: t.messages.length === 0 && msgs.length > 0 ? titleFromMessages(msgs) : t.title,
                  updatedAt: Date.now(),
                }))}
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

// ---------- Workspace (chat + preview) ----------
function Workspace({
  thread,
  onPersist,
}: {
  thread: Thread;
  onPersist: (msgs: UIMessage[]) => void;
}) {
  const [input, setInput] = useState("");
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    id: thread.id,
    messages: thread.messages,
    transport: new DefaultChatTransport({ api: "/api/ai-lux" }),
  });

  // Persist message changes when idle
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

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [thread.id]);

  const busy = status === "submitted" || status === "streaming";

  async function submit(text?: string) {
    const value = (text ?? input).trim();
    if (!value || busy) return;
    setInput("");
    await sendMessage({ text: value });
    inputRef.current?.focus();
  }

  const suggestions = [
    "صمم لي موقع فخم لمطعم فرنسي بلمسة كلاسيكية",
    "اكتب لي landing page لتطبيق ذكاء اصطناعي بأسلوب حديث",
    "Build a portfolio page for a photographer, dark & elegant",
    "اشرح لي الفرق بين React Server Components و Client Components",
  ];

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-4 h-[calc(100vh-6.5rem)] min-h-[600px]">
      {/* Chat panel */}
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

        <div ref={scrollerRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="size-4 text-amber-200" />
                  <span className="text-[11px] tracking-[0.3em] uppercase">Welcome</span>
                </div>
                <p className="text-sm text-muted-foreground font-arabic leading-relaxed">
                  أهلاً بك في <span className="text-foreground">Lux AI</span>. اسألني أي شيء — أو اطلب تصميم موقع كامل وسأبنيه لك مع معاينة حية على اليمين.
                </p>
              </div>
              <div className="grid gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="text-right text-[13px] font-arabic leading-relaxed rounded-lg border border-white/10 hover:border-amber-200/40 hover:bg-white/[0.03] transition px-3 py-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {s}
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
                <div className={`max-w-[88%] rounded-xl px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap font-arabic ${
                  isUser
                    ? "bg-primary text-primary-foreground"
                    : "border border-white/10 bg-white/[0.03] text-foreground/95"
                }`}>
                  {text || (m.role === "assistant" && busy ? <span className="inline-flex items-center gap-2 text-muted-foreground"><Loader2 className="size-3.5 animate-spin" /> يفكّر…</span> : null)}
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

        <form
          onSubmit={(e) => { e.preventDefault(); submit(); }}
          className="border-t border-white/5 p-3 bg-background/40"
        >
          <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-white/[0.02] focus-within:border-amber-200/40 transition p-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
              }}
              rows={1}
              placeholder="اكتب سؤالك أو اطلب تصميم موقع…"
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

      {/* Preview panel */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/5">
          <div className="flex items-center gap-1">
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
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={!latestHtml}
              onClick={() => latestHtml && navigator.clipboard.writeText(latestHtml)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground disabled:opacity-30 transition"
              title="Copy HTML"
            >
              <Copy className="size-3.5" /> Copy
            </button>
            <button
              disabled={!latestHtml}
              onClick={() => {
                if (!latestHtml) return;
                const blob = new Blob([latestHtml], { type: "text/html" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url; a.download = "lux-ai-site.html"; a.click();
                URL.revokeObjectURL(url);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground disabled:opacity-30 transition"
              title="Download HTML"
            >
              <Download className="size-3.5" /> Save
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-black/40">
          {!latestHtml ? (
            <div className="h-full flex items-center justify-center p-8 text-center">
              <div className="max-w-sm">
                <div className="mx-auto size-14 rounded-full border border-white/10 grid place-items-center mb-4">
                  <Sparkles className="size-6 text-amber-200/80" />
                </div>
                <div className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Live Preview</div>
                <p className="mt-2 text-sm text-muted-foreground font-arabic leading-relaxed">
                  اطلب من Lux AI تصميم موقع أو صفحة، وسيظهر لك هنا مباشرة مع كود قابل للتحميل.
                </p>
              </div>
            </div>
          ) : tab === "preview" ? (
            <iframe
              title="Lux AI Preview"
              srcDoc={latestHtml}
              sandbox="allow-scripts allow-same-origin"
              className="w-full h-full bg-white"
            />
          ) : (
            <pre className="w-full h-full overflow-auto text-[12px] leading-relaxed p-4 text-emerald-200/90 font-mono whitespace-pre-wrap">
              {latestHtml}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

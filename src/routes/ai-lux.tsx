import { createFileRoute, Link } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Sparkles, Code2, Eye, Download, Copy, Loader2, Wand2 } from "lucide-react";
import logoAsset from "@/assets/lux-logo.png.asset.json";

export const Route = createFileRoute("/ai-lux")({
  head: () => ({
    meta: [
      { title: "Lux AI — الذكاء الاصطناعي الرسمي لـ Lux Addons" },
      { name: "description", content: "Lux AI — ذكاء اصطناعي متطور طُوِّر محلياً بقيادة فريق Lux وبتوجيه OLD. محادثة، برمجة، وتصميم مواقع بجميع اللغات." },
      { property: "og:title", content: "Lux AI" },
      { property: "og:description", content: "ذكاء اصطناعي فخم من تطوير Lux — يصمم مواقع، يبرمج، ويجاوب بأي لغة." },
    ],
  }),
  component: AiLuxPage,
});

function extractHtml(text: string): string | null {
  // Completed ```html ... ``` block
  const closed = text.match(/```html\s*([\s\S]*?)```/i);
  if (closed && closed[1].trim()) return closed[1].trim();
  // Streaming (unterminated) ```html ...
  const open = text.match(/```html\s*([\s\S]*)$/i);
  if (open && /<[a-z!]/i.test(open[1])) return open[1].trim();
  // Fallback: any full doctype in message
  const d = text.match(/<!doctype html[\s\S]*?<\/html>/i);
  if (d) return d[0];
  // Streaming doctype without closing tag
  const ds = text.match(/<!doctype html[\s\S]*$/i);
  return ds ? ds[0] : null;
}

function messageText(m: UIMessage): string {
  return m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
}

function AiLuxPage() {
  const [input, setInput] = useState("");
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ai-lux" }),
  });

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
  }, []);

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
    <div className="min-h-screen bg-background text-foreground">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-1/4 h-[520px] w-[520px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, oklch(0.55 0.18 250 / 0.35), transparent 65%)" }} />
        <div className="absolute -bottom-40 right-1/5 h-[560px] w-[560px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, oklch(0.72 0.14 85 / 0.28), transparent 65%)" }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Lux" className="h-8 w-8 rounded-full ring-1 ring-white/15" />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground">Lux Addons</span>
              <span className="font-display text-sm tracking-widest">AI · LUX</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition">Home</Link>
            <Link to="/news" className="hover:text-foreground transition">News</Link>
            <Link to="/chronicle" className="hover:text-foreground transition">Chronicle</Link>
            <Link to="/rules" className="hover:text-foreground transition">Rules</Link>
          </nav>
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground hidden sm:block">
            v1.0 · Internal Build
          </div>
        </div>
      </header>

      {/* Hero / intro */}
      <section className="max-w-[1500px] mx-auto px-6 md:px-10 pt-10 pb-6">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-amber-200/70">
          <Sparkles className="size-3.5" /> Lux Intelligence
        </div>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
          Lux AI
          <span className="block text-base md:text-lg font-normal mt-2 text-muted-foreground font-arabic">
            ذكاء اصطناعي متطور — طُوِّر محلياً بقيادة فريق التطوير لدى <span className="text-amber-200">LUX</span>
          </span>
        </h1>
        <p className="mt-4 max-w-3xl text-sm md:text-[15px] leading-relaxed text-muted-foreground font-arabic">
          <span className="text-foreground/90">Lux AI</span> نظام ذكاء اصطناعي داخلي مُصمَّم بالكامل من قِبل مهندسي Lux، يجمع بين الفخامة الكلاسيكية والقوة الحديثة.
          يفهم أكثر من 30 لغة، يحاورك بأسلوب طبيعي، يكتب لك الأكواد، يحلل، يترجم، يلخّص، ويصمم لك
          <span className="text-amber-200"> مواقع إلكترونية كاملة </span>
          بأي أسلوب تريد — كلاسيكي، حديث، تاريخي، أو مستقبلي — مع معاينة مباشرة أمام عينيك في اللوحة الجانبية.
        </p>
        <ul className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
          {[
            { t: "Multilingual", d: "أكثر من 30 لغة" },
            { t: "Website Builder", d: "معاينة مباشرة" },
            { t: "Code & Debug", d: "بأي لغة برمجة" },
            { t: "Deep Reasoning", d: "تحليل وتخطيط" },
          ].map((f) => (
            <li key={f.t} className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
              <div className="tracking-[0.24em] uppercase text-foreground/90">{f.t}</div>
              <div className="text-muted-foreground font-arabic mt-0.5">{f.d}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Workspace */}
      <section className="max-w-[1500px] mx-auto px-6 md:px-10 pb-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-5">
          {/* Chat panel */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden flex flex-col h-[75vh] min-h-[560px]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Lux AI · Online</span>
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-amber-200/60">Secured</div>
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
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden flex flex-col h-[75vh] min-h-[560px]">
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
      </section>
    </div>
  );
}

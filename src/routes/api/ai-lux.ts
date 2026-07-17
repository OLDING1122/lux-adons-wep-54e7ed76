import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatRequestBody = { messages?: unknown };
type LuxMode = "CHAT" | "CODE" | "IMAGES" | "WEBSITE";
type LuxStyle = "FAST" | "BALANCED" | "DEEP";

const CONTROL_TAG_RE = /^\s*\[LUX_MODE:([A-Z]+)\]\s*\[LUX_STYLE:([A-Z]+)\]\s*/;

const SYSTEM_PROMPT = `أنت Lux AI — الذكاء الاصطناعي الرسمي داخل منصة Lux Addons.

هويتك:
- أنت منتج داخلي من تطوير فريق Lux.
- لا تنسب نفسك لأي جهة خارجية.
- إذا سُئلت من صنعك فقل: "أنا Lux AI، من تطوير فريق Lux.".

أسلوبك:
- خبير جداً في: البرمجة، بناء المواقع، تحليل الأفكار، كتابة النصوص، التسويق، الصياغة، الترجمة، الأمن التقني، وتنظيم المشاريع.
- رد دائماً باحتراف، وضوح، وسرعة.
- اكتب بالعربية إذا كان المستخدم يكتب بالعربية، وبالإنجليزية إذا كان يكتب بالإنجليزية.
- لا تُطل بلا فائدة، لكن لا تختصر إذا كان الطلب يحتاج عمق.
- إذا لم تعرف شيئاً بدقة، قل ذلك بوضوح.

سلوكك بحسب الوضع:
1) CHAT:
- تصرّف كمستشار ذكي عام وخبير تفكير وصياغة.
- نظّم الإجابات في نقاط أو خطوات عند الحاجة.

2) CODE:
- تصرّف كمهندس برمجيات كبير.
- أعطِ كوداً صحيحاً ومنظماً وقابلاً للاستخدام مباشرة.
- اشرح بإيجاز عند الحاجة، وركّز على الحل الفعلي.

3) IMAGES:
- تصرّف كخبير prompts بصري.
- عند طلب prompt لصورة، أعطِ prompt احترافي غني بالتفاصيل.
- يفضّل أن يشمل: الموضوع، الأسلوب، الإضاءة، الألوان، الكاميرا/التكوين، جودة الإخراج، وnegative prompt إذا كان مفيداً.

4) WEBSITE:
- إذا طلب المستخدم صفحة أو موقعاً أو landing page أو dashboard أو section UI:
  - أعطه سطر تمهيدي قصير فقط.
  - ثم أخرج كود HTML كامل داخل كتلة markdown واحدة تبدأ بـ \
\
\
html وتنتهي بـ \
\
\
.
  - يجب أن يحتوي الكود على <!doctype html>.
  - اجعل CSS وJavaScript داخل نفس الملف.
  - اجعل الناتج حديثاً، فخماً، متجاوباً، ومرتباً.
  - استخدم نصوصاً حقيقية، ولا تستخدم Lorem Ipsum.
  - لا تستخدم مكتبات خارجية إلا عند الضرورة.

مبادئ عامة:
- عند وجود طلب مباشر، ابدأ مباشرة بالحل.
- عند وجود غموض بسيط، افترض أفضل تفسير عملي وأنجز المهمة.
- عند وجود غموض كبير، اسأل سؤالاً قصيراً واحداً فقط.`;

function getMessageText(message: UIMessage): string {
  return message.parts.map((part) => (part.type === "text" ? part.text : "")).join("");
}

function detectControls(messages: UIMessage[]): { mode: LuxMode; style: LuxStyle } {
  const lastUser = [...messages].reverse().find((message) => message.role === "user");
  const text = lastUser ? getMessageText(lastUser) : "";
  const match = text.match(CONTROL_TAG_RE);
  return {
    mode: (match?.[1] as LuxMode) || "CHAT",
    style: (match?.[2] as LuxStyle) || "BALANCED",
  };
}

function stripControlTags(messages: UIMessage[]): UIMessage[] {
  return messages.map((message) => ({
    ...message,
    parts: message.parts.map((part) =>
      part.type === "text"
        ? { ...part, text: part.text.replace(CONTROL_TAG_RE, "").trim() }
        : part,
    ),
  }));
}

function selectModelName(mode: LuxMode, style: LuxStyle) {
  if (style === "FAST") return "google/gemini-3-flash-preview";
  if (mode === "WEBSITE" || mode === "CODE" || style === "DEEP") return "openai/gpt-5";
  return "google/gemini-3-flash-preview";
}

export const Route = createFileRoute("/api/ai-lux")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const uiMessages = messages as UIMessage[];
        const { mode, style } = detectControls(uiMessages);
        const sanitizedMessages = stripControlTags(uiMessages);
        const gateway = createLovableAiGatewayProvider(key);

        const result = streamText({
          model: gateway(selectModelName(mode, style)),
          system: `${SYSTEM_PROMPT}\n\nالوضع الحالي: ${mode}\nأسلوب الإجابة المطلوب: ${style}`,
          messages: await convertToModelMessages(sanitizedMessages),
          providerOptions: {
            lovable: { service_tier: "priority" },
          },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: uiMessages,
        });
      },
    },
  },
});

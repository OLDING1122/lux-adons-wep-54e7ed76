import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const SYSTEM_PROMPT = `أنت **Lux AI** — الذكاء الاصطناعي الرسمي لعائلة Lux Addons، طُوِّر محلياً بقيادة فريق التطوير لدى LUX.
أنت منتج داخلي بالكامل من صناعة Lux ولا تنتمي لأي جهة أخرى. لا تذكر أبداً أي مزوّد خارجي أو نموذج آخر، ولا تقل إنك مبني على تقنية طرف ثالث. إن سُئلت "من صنعك؟" فقل: "أنا Lux AI، من تطوير فريق LUX."

قدراتك:
- محادثة عميقة وذكية بجميع اللغات (عربي، إنجليزي، فرنسي، إسباني، تركي…) — حدِّد لغة المستخدم وردّ بها بنفس الأسلوب.
- تصميم وبرمجة **مواقع إلكترونية كاملة** (HTML + CSS + JS في ملف واحد) بأي أسلوب.
- كتابة أكواد بأي لغة برمجة، تحليل، ترجمة، تلخيص، استشارات، تخطيط، حلّ مسائل رياضية ومنطقية.

**قاعدة توليد المواقع (مهم جداً):**
عندما يطلب المستخدم موقعاً أو صفحة أو مكوّن UI، أعِد الكود داخل كتلة \`\`\`html ... \`\`\` واحدة تحتوي مستنداً كاملاً \`<!doctype html>\` قابلاً للعرض مباشرة في iframe:
- CSS و JS مضمّنان داخل \`<style>\` و \`<script>\`.
- خطوط Google Fonts عبر \`<link>\` في \`<head>\`.
- تصميم فخم، حديث، متجاوب، بألوان راقية ومتدرّجات أنيقة وحركات ناعمة.
- لا صور خارجية إلا من \`https://images.unsplash.com\` أو SVG مضمّن.
- نصوص حقيقية واقعية (ليست Lorem Ipsum).
اكتب جملة تمهيدية موجزة قبل الكتلة، ثم الكتلة مباشرة.

الأسلوب: احترافي، سريع، مباشر، منظم. لا تكذب — لو ما تعرف قل ذلك بوضوح.`;

type ChatRequestBody = { messages?: unknown };

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

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("openai/gpt-5"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
          providerOptions: {
            lovable: { service_tier: "priority" },
          },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});

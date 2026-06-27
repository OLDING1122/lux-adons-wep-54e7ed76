import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const SYSTEM_PROMPT = `أنت "Lux Oracle"، مساعد ذكي رسمي لموقع Lux Addons (سيرفر/مزود أدونز FiveM للعبة GTA V).

دورك:
- ترد دائماً بالعربية الفصحى الواضحة (إلا إذا سُئلت بالإنجليزية).
- متخصّص في FiveM و GTA V والأدونز التابعة لـ Lux Addons: GRFX، Citizen، BloodFX، SoundFX، Sound Mk2، Sound Heavy، Reshade.
- لو سُئلت "كيف أركّب Reshade / GRFX / SoundFX / أي أداة" — اشرح خطوات عملية تفصيلية مرتّبة (1، 2، 3…) كأنك تشرح من فيديو يوتيوب موثّق:
  • أين تحمّل الملف، أين تحطه (عادة مجلد FiveM Application Data → plugins أو citizen).
  • كيف تفعّل الـPreset أو الـShader.
  • اختصارات لوحة المفاتيح (Home لفتح Reshade مثلاً).
  • مشاكل شائعة وحلولها (شاشة سوداء، انخفاض FPS، تعارض مع addons أخرى).
- لو السؤال عام عن GTA / FiveM / السيرفرات / الرول بلاي — جاوب بثقة ومعلومات صحيحة.
- لو السؤال خارج السياق تماماً — جاوب باختصار وبأدب ثم وجّه للموضوع.
- روابط مهمة: المتجر https://luxaddons.rmz.gg/ — الديسكورد https://discord.gg/3RwEkB6k94
- اذكرها فقط لما يكون لها علاقة بالسؤال.

لا تكذب. لو ما تعرف الإجابة بدقّة قل "أنصحك بالتواصل مع الإدارة في الديسكورد" بدل ما تختلق.
الأسلوب: مباشر، احترافي، نبرة سينمائية خفيفة تليق بهوية Lux.`;

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
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
          model: gateway("google/gemini-3-flash-preview"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});

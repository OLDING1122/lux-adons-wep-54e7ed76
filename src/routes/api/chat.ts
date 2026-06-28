import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const SYSTEM_PROMPT = `أنت "Lux Oracle"، مساعد ذكي عام تابع لموقع Lux Addons، لكنك لا تقتصر على FiveM.

دورك:
- ترد دائماً بالعربية الفصحى الواضحة (إلا إذا سُئلت بالإنجليزية فترد بالإنجليزية).
- مساعد عام: تجاوب على أي سؤال — برمجة، علوم، تاريخ، رياضة، حياة يومية، نصائح، كتابة، ترجمة، رياضيات، ثقافة عامة، تقنية، ألعاب، أو أي موضوع آخر.
- جاوب بدقة وثقة وبأسلوب مرتب ومنظم. استخدم قوائم مرقمة أو نقاط حين يساعد ذلك على الفهم.
- لو السؤال يخص Lux Addons أو FiveM/GTA V أو الأدونز (GRFX، Citizen، BloodFX، SoundFX، Sound Mk2، Sound Heavy، Reshade) — اشرح بتفصيل عملي خطوة بخطوة.
- روابط مهمة عند الحاجة فقط: المتجر https://luxaddons.rmz.gg/ — الديسكورد https://discord.gg/3RwEkB6k94

لا تكذب. لو ما تعرف الإجابة بدقة قل ذلك بصراحة بدل ما تختلق.
الأسلوب: مباشر، احترافي، ودود، ومنظم.`;

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

import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const FALLBACK_RESPONSES: Record<string, { reply: string; suggestions: string[] }> = {
  default: {
    reply: "Merhaba! Size nasıl yardımcı olabilirim? Ürünlerimiz, hizmetlerimiz veya siparişleriniz hakkında bilgi verebilirim.",
    suggestions: [
      "Fiyat listemizi paylaşmak ister misiniz?",
      "Destek ekibine yönlendirmemi ister misiniz?",
      "Sipariş durumunu kontrol edeyim mi?",
    ],
  },
  fiyat: {
    reply: "Ürünlerimizin fiyat listesi için size en güncel bilgileri gönderiyorum. Starter Paket 999 TL/ay, Professional Paket 2.999 TL/ay, Enterprise Paket ise özel fiyatlandırma ile sunulmaktadır.",
    suggestions: [
      "Detaylı karşılaştırma tablosu göndermemi ister misiniz?",
      "Ücretsiz deneme başlatmak ister misiniz?",
      "Özel teklif hazırlamamı ister misiniz?",
    ],
  },
  siparis: {
    reply: "Siparişinizi kontrol ediyorum. En son siparişiniz başarıyla işleme alındı ve kargo aşamasında. Tahmini teslimat tarihi 2-3 iş günü içerisindedir.",
    suggestions: [
      "Kargo takip numarasını paylaşayım mı?",
      "Faturayı tekrar göndermemi ister misiniz?",
      "Yeni sipariş oluşturmak ister misiniz?",
    ],
  },
  destek: {
    reply: "Teknik destek talebinizi aldım. Size en kısa sürede yardımcı olacağız. Sorunun detaylarını paylaşır mısınız?",
    suggestions: [
      "Ekran görüntüsü paylaşır mısınız?",
      "Canlı destek hattına yönlendireyim mi?",
      "SSS sayfamızda çözüm bulabilirsiniz.",
    ],
  },
};

function getSmartResponse(message: string): { reply: string; suggestions: string[] } {
  const lower = message.toLowerCase();
  if (lower.includes("fiyat") || lower.includes("ücret") || lower.includes("paket")) return FALLBACK_RESPONSES.fiyat;
  if (lower.includes("sipariş") || lower.includes("kargo") || lower.includes("teslimat")) return FALLBACK_RESPONSES.siparis;
  if (lower.includes("destek") || lower.includes("sorun") || lower.includes("hata")) return FALLBACK_RESPONSES.destek;
  return FALLBACK_RESPONSES.default;
}

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Mesaj gerekli" }, { status: 400 });
    }

    // If OpenAI key is available, use it
    if (OPENAI_API_KEY) {
      try {
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `Sen AIZEN Chat platformunun yapay zeka asistanısın. Türkçe yanıt ver. Müşteri hizmetleri konusunda yardımcı ol. Kısa ve net cevaplar ver. ${context ? `Bağlam: ${context}` : ""}`,
              },
              { role: "user", content: message },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        if (openaiRes.ok) {
          const data = await openaiRes.json();
          const reply = data.choices[0]?.message?.content || "Yanıt oluşturulamadı.";
          return NextResponse.json({
            reply,
            suggestions: [
              "Başka bir konuda yardımcı olabilir miyim?",
              "Detaylı bilgi ister misiniz?",
              "Canlı destek hattına bağlanmak ister misiniz?",
            ],
            source: "openai",
          });
        }
      } catch {
        // Fall through to smart response
      }
    }

    // Fallback: smart keyword-based response
    const response = getSmartResponse(message);
    return NextResponse.json({ ...response, source: "builtin" });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json({ error: "AI yanıt oluşturulamadı" }, { status: 500 });
  }
}

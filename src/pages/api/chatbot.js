import { OpenAI } from "openai";
import questions from "../../data/konda.json";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ model: process.env.OPENAI_MODEL });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { message } = req.body;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const prompt = `
    Kullanıcının mesajı: "${message}"
    Aşağıdaki soru başlıklarından hangileri bu mesajla alakalıdır? Sadece en alakalı olanları JSON formatında bir dizi olarak dön. 
    
    Soru başlıkları:
    ${JSON.stringify(questions, null, 2)}
    
    Yanıtın sadece JSON formatında olmalı, başka hiçbir açıklama ekleme.
    `;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = completion.choices[0].message.content;
    const cleanResponse = responseText.replace(/```json|```/g, "").trim();
    console.log("completion", responseText);
    const relevantQuestions = JSON.parse(cleanResponse);

    res.status(200).json({ relevantQuestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

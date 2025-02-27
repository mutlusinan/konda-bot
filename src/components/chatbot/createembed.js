import OpenAI from "openai";
import fs from "fs";
import questions from "../../data/konda.json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateEmbeddings() {
  const embeddings = [];

  for (const question of questions) {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: question,
    });

    embeddings.push({
      question,
      embedding: response.data[0].embedding,
    });
  }

  fs.writeFileSync("embeddings.json", JSON.stringify(embeddings, null, 2));
}

generateEmbeddings();

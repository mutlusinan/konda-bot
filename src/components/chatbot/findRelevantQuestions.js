import fs from "fs";

export default async function findRelevantQuestions(topic) {
  const embeddings = JSON.parse(fs.readFileSync("embeddings.json", "utf-8"));

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: topic,
  });

  const topicEmbedding = response.data[0].embedding;

  function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a ** 2, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b ** 2, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  const rankedQuestions = embeddings
    .map(({ question, embedding }) => ({
      question,
      similarity: cosineSimilarity(topicEmbedding, embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5); // En alakalı 5 soruyu al

  return rankedQuestions.map((q) => q.question);
}

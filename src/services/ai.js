import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateQuestions(topic, difficulty) {
	const prompt = `Generate 10 multiple choice questions about ${topic} at ${difficulty} level. 
  Format as JSON array with structure:
  {
    questions: [
      {
        question: "string",
        options: ["string", "string", "string", "string"],
        correct: number,
        explanation: "string"
      }
    ]
  }`;

	const model = genAI.getGenerativeModel({ model: "gemini-pro" });
	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();
	return JSON.parse(text);
}
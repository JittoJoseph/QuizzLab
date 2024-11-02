import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

export async function generateQuestions(topic, difficulty) {
	try {
		if (!import.meta.env.VITE_GOOGLE_API_KEY) {
			throw new Error('Google API key is not configured');
		}

		const prompt = `Generate 10 multiple choice questions about ${topic} at ${difficulty} level. 
      Format as JSON with: {"questions":[{"question":"","options":["","","",""],"correct":0}]}. 
      Keep it simple, no formatting, just raw JSON.`;

		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const result = await model.generateContent(prompt);

		if (!result?.response) {
			throw new Error('No response from AI');
		}

		let text = result.response.text();
		// Basic cleanup
		text = text.replace(/[\u201C\u201D\u2018\u2019]/g, '"')
			.replace(/```[^`]*```/g, '')
			.replace(/\n/g, '')
			.trim();

		const parsed = JSON.parse(text);
		if (!parsed.questions || !Array.isArray(parsed.questions)) {
			throw new Error('Invalid response structure');
		}

		return parsed;
	} catch (error) {
		console.error('Generation error:', error.message);
		throw error;
	}
}
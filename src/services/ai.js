import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateQuestions(topic, difficulty) {
	try {
		const prompt = `Generate 10 multiple choice questions about ${topic} at ${difficulty} level. 
    Return ONLY valid JSON with NO markdown formatting or backticks, using this structure:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correct": number,
          "explanation": "string"
        }
      ]
    }`;

		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		// Clean the response - remove markdown formatting if present
		const cleanedText = text
			.replace(/```json\s*/gi, '')
			.replace(/```\s*$/gi, '')
			.trim();

		try {
			const parsed = JSON.parse(cleanedText);
			return parsed;
		} catch (parseError) {
			console.error('JSON Parse Error:', parseError);
			console.log('Failed text:', cleanedText);
			throw new Error('Invalid JSON response from AI');
		}
	} catch (error) {
		console.error('AI Service Error:', error);
		throw new Error(`Failed to generate questions: ${error.message}`);
	}
}
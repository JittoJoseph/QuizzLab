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

		// Try Gemini 1.5 Flash first, fallback to 1.5 Pro
		let model;
		try {
			model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
		} catch (error) {
			console.log('Falling back to Gemini 1.5 Pro');
			model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
		}

		const result = await model.generateContent(prompt);

		if (!result?.response) {
			throw new Error('No response from AI');
		}

		let text = result.response.text();

		// Enhanced cleanup
		text = text
			.replace(/[\u201C\u201D\u2018\u2019]/g, '"') // Fix smart quotes
			.replace(/```json\s*|\s*```/g, '') // Remove code blocks
			.replace(/\n/g, '') // Remove newlines
			.replace(/,\s*([}\]])/g, '$1') // Remove trailing commas
			.replace(/([{,]\s*)(\w+)(:)/g, '$1"$2"$3') // Ensure property names are quoted
			.trim();

		// Validate JSON structure before parsing
		if (!text.startsWith('{') || !text.endsWith('}')) {
			throw new Error('Invalid JSON structure in AI response');
		}

		try {
			const parsed = JSON.parse(text);

			// Validate expected structure
			if (!parsed.questions || !Array.isArray(parsed.questions)) {
				throw new Error('Invalid response structure: missing questions array');
			}

			// Validate each question
			parsed.questions.forEach((q, i) => {
				if (!q.question || !Array.isArray(q.options) || q.correct === undefined) {
					throw new Error(`Invalid question structure at index ${i}`);
				}
			});

			return parsed;
		} catch (parseError) {
			console.error('Raw response:', text);
			throw new Error(`JSON parsing failed: ${parseError.message}`);
		}
	} catch (error) {
		console.error('Generation error:', error.message);
		throw error;
	}
}
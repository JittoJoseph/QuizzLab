import { GoogleGenerativeAI } from "@google/generative-ai";

class AIServiceError extends Error {
	constructor(message) {
		super(message);
		this.name = 'AIServiceError';
	}
}

class QuestionGenerationError extends Error {
	constructor(message) {
		super(message);
		this.name = 'QuestionGenerationError';
	}
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
const REQUEST_TIMEOUT = 15000; // 15 seconds

async function fetchWithTimeout(promise, timeout) {
	return Promise.race([
		promise,
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Request timeout')), timeout)
		)
	]);
}

async function generateWithModel(modelName, prompt) {
	console.log(`Attempting generation with ${modelName}`);
	const startTime = Date.now();
	const model = genAI.getGenerativeModel({ model: modelName });

	const result = await fetchWithTimeout(
		model.generateContent(prompt),
		REQUEST_TIMEOUT
	);

	console.log(`${modelName} took ${(Date.now() - startTime) / 1000}s`);

	if (!result?.response) {
		throw new AIServiceError('No response from AI');
	}

	return result.response.text();
}

async function fetchWithRetry(prompt, maxAttempts = 2) {
	// Try Pro model first
	try {
		return await generateWithModel("gemini-1.5-pro", prompt);
	} catch (error) {
		console.error('Pro model failed:', error.message);

		// Only try Flash model if Pro fails
		try {
			return await generateWithModel("gemini-1.5-flash", prompt);
		} catch (flashError) {
			console.error('Flash model failed:', flashError.message);
			throw new QuestionGenerationError('All models failed to generate response');
		}
	}
}


export async function generateQuestions(topic, difficulty) {
	try {
		if (!import.meta.env.VITE_GOOGLE_API_KEY) {
			throw new Error('Google API key is not configured');
		}

		if (!topic || !difficulty) {
			throw new Error('Topic and difficulty are required');
		}

		const prompt = `Generate 10 multiple choice questions about ${topic} at ${difficulty} level.
      Format as JSON with: {"questions":[{"question":"","options":["","","",""],"correct":0}]}.`;

		console.log('Starting question generation...');
		const text = await fetchWithRetry(prompt);

		const processedText = text
			.replace(/[\u201C\u201D\u2018\u2019]/g, '"')
			.replace(/```json\s*|\s*```/g, '')
			.replace(/\n/g, '')
			.replace(/,\s*([}\]])/g, '$1')
			.replace(/([{,]\s*)(\w+)(:)/g, '$1"$2"$3')
			.trim();

		if (!processedText.startsWith('{') || !processedText.endsWith('}')) {
			throw new QuestionGenerationError('Invalid JSON structure in AI response');
		}

		const parsed = JSON.parse(processedText);
		if (!parsed.questions?.length) {
			throw new QuestionGenerationError('No questions in AI response');
		}

		const processedQuestions = parsed.questions.map((q, index) => {
			if (!q.question || !Array.isArray(q.options) || q.options.length !== 4) {
				throw new QuestionGenerationError(`Invalid question format at index ${index}`);
			}

			const optionPairs = q.options.map((text, idx) => ({
				text,
				isCorrect: idx === q.correct
			}));

			// Fisher-Yates shuffle
			for (let i = optionPairs.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[optionPairs[i], optionPairs[j]] = [optionPairs[j], optionPairs[i]];
			}

			return {
				...q,
				options: optionPairs.map(pair => pair.text),
				correct: optionPairs.findIndex(pair => pair.isCorrect)
			};
		});

		return { questions: processedQuestions };

	} catch (error) {
		const errorMessage = error instanceof QuestionGenerationError ?
			error.message :
			'Failed to generate questions: ' + error.message;

		console.error('Generation error:', errorMessage);
		throw error;
	}
}
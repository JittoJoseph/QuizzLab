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
const REQUEST_TIMEOUT = 13000; // 18 seconds

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

// In ai.js - update fetchWithRetry
async function fetchWithRetry(prompt, maxAttempts = 2) {
	try {
		return await generateWithModel("gemini-1.5-flash-002", prompt);
	} catch (flashError) {
		try {
			return await generateWithModel("gemini-1.5-pro-002", prompt);
		} catch (proError) {
			// Throw a silent error that will just trigger UI state change
			const error = new Error();
			error.silent = true; // Add flag to prevent logging
			throw error;
		}
	}
}

function shuffleOptions(question) {
	// Create array of option objects with their original indices
	const optionsWithIndex = question.options.map((text, index) => ({
		text,
		isCorrect: index === question.correct
	}));

	// Fisher-Yates shuffle
	for (let i = optionsWithIndex.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
	}

	// Update question with shuffled options
	question.options = optionsWithIndex.map(opt => opt.text);
	question.correct = optionsWithIndex.findIndex(opt => opt.isCorrect);

	return question;
}

export async function generateQuestions(topic, difficulty) {
	try {
		if (!import.meta.env.VITE_GOOGLE_API_KEY) {
			throw new Error('Google API key is not configured');
		}
		const prompt = `Generate 10 multiple choice questions about ${topic} at ${difficulty} level.

Format as JSON:
{
  "questions": [
    {
      "question": "Question text?",
      "options": ["Correct", "Wrong1", "Wrong2", "Wrong3"],
      "correct": 0
    }
  ]
}

Rules:
- Exactly 4 options per question
- correct must be 0-3 matching the correct option's position
- All options must be simple strings
- One correct answer per question`;

		console.log('Starting question generation...');
		const text = await fetchWithRetry(prompt);

		const processedText = text
			.replace(/[\u201C\u201D\u2018\u2019]/g, '"')
			.replace(/```json\s*|\s*```/g, '')
			.replace(/\n/g, '')
			.replace(/,\s*([}\]])/g, '$1')
			.replace(/([{,]\s*)(\w+)(:)/g, '$1"$2"$3')
			// Fix nested arrays in options
			.replace(/\[\s*\[(.*?)\]\s*,/g, '["$1",')
			.trim();

		if (!processedText.startsWith('{') || !processedText.endsWith('}')) {
			throw new QuestionGenerationError('Invalid JSON structure in AI response');
		}

		try {
			const parsed = JSON.parse(processedText);

			// Validate questions
			if (!parsed.questions?.length) {
				throw new QuestionGenerationError('No questions in AI response');
			}

			// Validate and sanitize each question
			parsed.questions = parsed.questions.map((q, index) => {
				if (!Array.isArray(q.options) || q.options.length !== 4) {
					throw new QuestionGenerationError(`Invalid options array in question ${index + 1}`);
				}

				// Ensure all options are strings
				q.options = q.options.map(opt => {
					if (Array.isArray(opt)) {
						return opt[0] || '';
					}
					return String(opt);
				});

				if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length) {
					throw new QuestionGenerationError(`Invalid correct answer index in question ${index + 1}`);
				}

				// Shuffle options after validation
				return shuffleOptions(q);
			});

			return parsed;

		} catch (parseError) {
			console.error('JSON Parse Error:', parseError);
			console.error('Processed Text:', processedText);
			throw new QuestionGenerationError(`Invalid JSON format: ${parseError.message}`);
		}

	} catch (error) {
		console.error('Generation error:', error);
		throw error;
	}
}
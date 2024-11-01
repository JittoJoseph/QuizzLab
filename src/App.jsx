import { useState } from 'react'
import Welcome from './components/Welcome'
import QuizSetup from './components/QuizSetup'
import QuizInterface from './components/QuizInterface'
import Results from './components/Results'
import { generateQuestions } from './services/ai';

function App() {
	const [currentPage, setCurrentPage] = useState('welcome')
	const [quizData, setQuizData] = useState({
		topic: '',
		difficulty: '',
		questions: [],
		currentQuestion: 0,
		score: 0,
		answers: []
	})

	const navigateToQuiz = () => {
		setCurrentPage('quiz-setup')
	}

	const startQuiz = async (formData) => {
		try {
			const generatedQuestions = await generateQuestions(formData.topic, formData.difficulty);
			setQuizData({
				...quizData,
				topic: formData.topic,
				difficulty: formData.difficulty,
				questions: generatedQuestions.questions
			});
			setCurrentPage('quiz');
		} catch (error) {
			console.error('Failed to generate questions:', error);
			// Handle error appropriately
		}
	};

	const handleQuizComplete = (finalScore) => {
		setQuizData({
			...quizData,
			score: finalScore
		})
		setCurrentPage('results')
	}

	const handleRetry = () => {
		setQuizData({
			...quizData,
			currentQuestion: 0,
			score: 0,
			answers: []
		})
		setCurrentPage('quiz')
	}

	const handleNewQuiz = () => {
		setCurrentPage('quiz-setup')
	}

	return (
		<>
			{currentPage === 'welcome' && <Welcome onStartClick={navigateToQuiz} />}
			{currentPage === 'quiz-setup' && <QuizSetup onSubmit={startQuiz} />}
			{currentPage === 'quiz' && (
				<QuizInterface
					onComplete={handleQuizComplete}
					topic={quizData.topic}
					difficulty={quizData.difficulty}
				/>
			)}
			{currentPage === 'results' && (
				<Results
					score={quizData.score}
					totalQuestions={10}
					topic={quizData.topic}
					onRetry={handleRetry}
					onNewQuiz={handleNewQuiz}
				/>
			)}
		</>
	)
}

export default App
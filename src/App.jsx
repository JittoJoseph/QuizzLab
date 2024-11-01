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
	const [isLoading, setIsLoading] = useState(false)

	const navigateToQuiz = () => {
		setCurrentPage('quiz-setup')
	}

	const startQuiz = async (formData) => {
		setIsLoading(true);
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
			alert('Failed to generate questions. Please try again.'); // Replace with better UI feedback later
		} finally {
			setIsLoading(false);
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
					question={quizData.questions[quizData.currentQuestion]}
					currentQuestion={quizData.currentQuestion}
					totalQuestions={quizData.questions.length}
					onAnswerSubmit={(isCorrect) => {
						setQuizData(prev => ({
							...prev,
							score: isCorrect ? prev.score + 1 : prev.score,
							currentQuestion: prev.currentQuestion + 1
						}))
					}}
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
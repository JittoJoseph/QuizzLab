import { useState } from 'react'
import Welcome from './components/Welcome'
import QuizSetup from './components/QuizSetup'
import QuizInterface from './components/QuizInterface'
import Results from './components/Results'
import { generateQuestions } from './services/ai';
import Features from './components/Features';
import { Toaster } from 'react-hot-toast';

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

	const handleQuizComplete = () => {
		setCurrentPage('results');
		// No need to update score here as it's already being tracked
		// during quiz progression
	};

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
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 3000,
					style: {
						background: '#fff',
						color: '#1e40af',
					},
					success: {
						icon: '✅',
					},
					error: {
						icon: '❌',
					},
				}}
			/>
			{currentPage === 'welcome' && (
				<Welcome
					onStartClick={navigateToQuiz}
					onNavigate={setCurrentPage}
				/>
			)}
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
					score={quizData.score || 0}
					totalQuestions={quizData.questions.length || 10}
					topic={quizData.topic || 'Quiz'}
					onNewQuiz={handleNewQuiz}
					onNavigate={setCurrentPage}
				/>
			)}
			{currentPage === 'features' && (
				<Features onBack={() => setCurrentPage('welcome')} />
			)}
		</>
	)
}

export default App
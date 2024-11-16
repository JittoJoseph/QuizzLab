import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Welcome from './components/Welcome';
import QuizSetup from './components/QuizSetup';
import QuizInterface from './components/QuizInterface';
import Results from './components/Results';
import Profile from './components/Profile';
import Features from './components/Features'; // Add this import
import { generateQuestions } from './services/ai';

function App() {
	const [currentPage, setCurrentPage] = useState('welcome');
	const [quizData, setQuizData] = useState({
		topic: '',
		difficulty: '',
		questions: [],
		currentQuestion: 0,
		score: 0,
		answers: []
	});
	const [isLoading, setIsLoading] = useState(false);

	const resetQuizData = () => {
		setQuizData({
			topic: '',
			difficulty: '',
			questions: [],
			currentQuestion: 0,
			score: 0,
			answers: []
		});
	};

	const navigateToQuiz = () => {
		resetQuizData();
		setCurrentPage('quiz-setup');
	};

	const startQuiz = async (formData) => {
		setIsLoading(true);
		try {
			const generatedQuestions = await generateQuestions(formData.topic, formData.difficulty);
			setQuizData({
				...quizData,
				topic: formData.topic,
				difficulty: formData.difficulty,
				questions: generatedQuestions.questions,
				currentQuestion: 0,
				score: 0,
				answers: []
			});
			setCurrentPage('quiz');
		} catch (error) {
			console.error('Failed to generate questions:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleQuizComplete = () => {
		setCurrentPage('results');
	};

	return (
		<AuthProvider>
			<div className="app-container">
				<Toaster position="top-center" />
				{currentPage === 'welcome' && (
					<Welcome onStartClick={navigateToQuiz} onNavigate={setCurrentPage} />
				)}
				{currentPage === 'features' && (  // Add this block
					<Features onNavigate={setCurrentPage} />
				)}
				{currentPage === 'quiz-setup' && (
					<QuizSetup
						onSubmit={startQuiz}
						onNavigate={setCurrentPage}
					/>
				)}
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
							}));
						}}
					/>
				)}
				{currentPage === 'results' && (
					<Results
						score={quizData.score}
						totalQuestions={quizData.questions.length}
						topic={quizData.topic || ''}
						difficulty={quizData.difficulty || 'beginner'}
						onNewQuiz={navigateToQuiz}
						onNavigate={setCurrentPage}
					/>
				)}
				{currentPage === 'profile' && (
					<Profile onNavigate={setCurrentPage} />
				)}
			</div>
		</AuthProvider>
	);
}

export default App;
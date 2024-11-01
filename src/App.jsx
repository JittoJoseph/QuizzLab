import { useState } from 'react'
import Welcome from './components/Welcome'
import QuizSetup from './components/QuizSetup'
import QuizInterface from './components/QuizInterface'

function App() {
	const [currentPage, setCurrentPage] = useState('welcome')

	const navigateToQuiz = () => {
		setCurrentPage('quiz-setup')
	}

	// Add new navigation handler
	const startQuiz = (formData) => {
		setCurrentPage('quiz')
	}

	return (
		<>
			{currentPage === 'welcome' && <Welcome onStartClick={navigateToQuiz} />}
			{currentPage === 'quiz-setup' && <QuizSetup onSubmit={startQuiz} />}
			{currentPage === 'quiz' && <QuizInterface onComplete={() => setCurrentPage('results')} />}
		</>
	)
}

export default App
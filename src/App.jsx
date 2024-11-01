import { useState } from 'react'
import Welcome from './components/Welcome'
import QuizSetup from './components/QuizSetup'

function App() {
	const [currentPage, setCurrentPage] = useState('welcome')

	const navigateToQuiz = () => {
		setCurrentPage('quiz-setup')
	}

	return (
		<>
			{currentPage === 'welcome' && <Welcome onStartClick={navigateToQuiz} />}
			{currentPage === 'quiz-setup' && <QuizSetup />}
		</>
	)
}

export default App
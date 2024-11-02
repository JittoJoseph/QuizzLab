// src/components/QuizInterface.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, XCircle } from 'lucide-react'; // Add this import

const QuizInterface = ({
	question,
	currentQuestion,
	totalQuestions,
	onAnswerSubmit,
	onComplete
}) => {
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [answered, setAnswered] = useState(false);
	const [showExplanation, setShowExplanation] = useState(false);
	const [score, setScore] = useState(0); // Add score state

	const handleNext = () => {
		if (selectedAnswer === null) return;

		const isCorrect = selectedAnswer === question.correct;
		if (isCorrect) {
			setScore(prev => prev + 1); // Update score
		}
		onAnswerSubmit(isCorrect);
		setSelectedAnswer(null);
		setAnswered(false);

		if (currentQuestion + 1 === totalQuestions) {
			onComplete();
		}
	};

	const handleAnswerSelect = (index) => {
		setSelectedAnswer(index);
		setAnswered(true);
	};

	const getOptionClass = (index) => {
		if (!answered) return selectedAnswer === index ? 'bg-blue-100 border-2 border-blue-600' : 'hover:bg-blue-50 border-2 border-transparent';
		if (index === question.correct) return 'bg-green-100 border-2 border-green-600';
		if (selectedAnswer === index) return 'bg-red-100 border-2 border-red-600';
		return 'opacity-50 border-2 border-transparent';
	};

	const getAnswerIcon = (index) => {
		if (index === question.correct) {
			return <CheckCircle className="w-5 h-5 text-green-600" />;
		}
		if (selectedAnswer === index) {
			return <XCircle className="w-5 h-5 text-red-600" />;
		}
		return null;
	};

	if (!question) return null;

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
			{/* Header with Progress */}
			<div className="px-4 md:px-8 py-4 bg-white/50 backdrop-blur-sm shadow-sm">
				<div className="container mx-auto">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-2">
							<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
								<span className="text-white font-bold text-xl">Q</span>
							</div>
							<span className="text-blue-900 font-semibold">
								Question {currentQuestion + 1}/{totalQuestions}
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<span className="text-blue-900 font-semibold">Score:</span>
							<span className="text-blue-900 font-medium">{score}/{totalQuestions}</span>
						</div>
					</div>
					{/* Progress Bar */}
					<div className="w-full h-2 bg-blue-100 rounded-full mt-4">
						<div
							className="h-full bg-blue-600 rounded-full transition-all duration-300"
							style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
						></div>
					</div>
				</div>
			</div>

			{/* Question Content */}
			<div className="flex-grow flex items-center px-4 md:px-8 py-8">
				<div className="container mx-auto max-w-3xl">
					<div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
						<h2 className="text-xl md:text-2xl text-blue-900 font-semibold">
							{question.question}
						</h2>

						<div className="space-y-3">
							{question.options.map((option, index) => (
								<button
									key={index}
									onClick={() => handleAnswerSelect(index)}
									disabled={answered}
									className={`w-full p-4 text-left rounded-xl transition-all bg-transparent
										${getOptionClass(index)}
										text-blue-900 font-medium`}
								>
									<div className="flex items-center space-x-3">
										<span className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-semibold">
											{String.fromCharCode(65 + index)}
										</span>
										<span>{option}</span>
										{answered && getAnswerIcon(index)}
									</div>
								</button>
							))}
						</div>

						{answered && (
							<div className="mt-4 p-4 bg-blue-50 rounded-lg">
								<div className="text-blue-900 font-medium">
									{selectedAnswer === question.correct ?
										'✨ Correct!' : '❌ Incorrect'}
								</div>
							</div>
						)}

						<div className="flex justify-end pt-6">
							<button
								onClick={handleNext}
								disabled={selectedAnswer === null}
								className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
									transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{currentQuestion + 1 === totalQuestions ? 'Finish' : 'Next'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

QuizInterface.propTypes = {
	question: PropTypes.shape({
		question: PropTypes.string.isRequired,
		options: PropTypes.arrayOf(PropTypes.string).isRequired,
		correct: PropTypes.number.isRequired,
		explanation: PropTypes.string
	}),
	currentQuestion: PropTypes.number.isRequired,
	totalQuestions: PropTypes.number.isRequired,
	onAnswerSubmit: PropTypes.func.isRequired,
	onComplete: PropTypes.func.isRequired
};

export default QuizInterface;
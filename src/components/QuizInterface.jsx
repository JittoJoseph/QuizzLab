// src/components/QuizInterface.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const QuizInterface = ({
	question,
	currentQuestion,
	totalQuestions,
	onAnswerSubmit,
	onComplete
}) => {
	const [selectedAnswer, setSelectedAnswer] = useState(null);

	const handleNext = () => {
		if (selectedAnswer === null) return;

		const isCorrect = selectedAnswer === question.correct;
		onAnswerSubmit(isCorrect);
		setSelectedAnswer(null);

		if (currentQuestion + 1 === totalQuestions) {
			onComplete();
		}
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
									onClick={() => setSelectedAnswer(index)}
									className={`w-full p-4 text-left rounded-xl transition-all bg-transparent
                    ${selectedAnswer === index
											? 'bg-blue-100 border-2 border-blue-600'
											: 'hover:bg-blue-50 border-2 border-transparent'
										}
                    text-blue-900 font-medium`}
								>
									<div className="flex items-center space-x-3">
										<span className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 font-semibold">
											{String.fromCharCode(65 + index)}
										</span>
										<span>{option}</span>
									</div>
								</button>
							))}
						</div>

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
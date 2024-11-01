// src/components/Results.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Results = ({ score, totalQuestions, topic, onRetry, onNewQuiz }) => {
	const percentage = (score / totalQuestions) * 100;

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
			{/* Header */}
			<div className="px-4 md:px-8 py-6">
				<div className="flex items-center space-x-2">
					<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
						<span className="text-white font-bold text-xl">Q</span>
					</div>
					<h1 className="text-2xl font-bold text-blue-800">QuizzyAI</h1>
				</div>
			</div>

			{/* Results Card */}
			<div className="flex-grow flex items-center justify-center px-4 md:px-8 py-8">
				<div className="w-full max-w-lg">
					<div className="bg-white rounded-2xl shadow-xl p-8 text-center">
						<h2 className="text-3xl font-bold text-blue-900 mb-6">Quiz Complete!</h2>

						{/* Score Circle */}
						<div className="w-48 h-48 mx-auto mb-8 relative">
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="text-center">
									<div className="text-5xl font-bold text-blue-600">{percentage}%</div>
									<div className="text-blue-800 mt-2">Score</div>
								</div>
							</div>
							<svg className="w-full h-full" viewBox="0 0 100 100">
								<circle
									cx="50"
									cy="50"
									r="45"
									fill="none"
									stroke="#EBF5FF"
									strokeWidth="10"
								/>
								<circle
									cx="50"
									cy="50"
									r="45"
									fill="none"
									stroke="#2563EB"
									strokeWidth="10"
									strokeDasharray={`${percentage * 2.83} 283`}
									transform="rotate(-90 50 50)"
								/>
							</svg>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-2 gap-4 mb-8">
							<div className="bg-blue-50 rounded-xl p-4">
								<div className="text-blue-800">Correct Answers</div>
								<div className="text-2xl font-bold text-blue-900">{score}/{totalQuestions}</div>
							</div>
							<div className="bg-blue-50 rounded-xl p-4">
								<div className="text-blue-800">Topic</div>
								<div className="text-2xl font-bold text-blue-900">{topic}</div>
							</div>
						</div>

						{/* Actions */}
						<div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
							<button
								onClick={onRetry}
								className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
							>
								Try Again
							</button>
							<button
								onClick={onNewQuiz}
								className="px-6 py-3 border-2 border-blue-600 text-blue-700 bg-transparent rounded-lg hover:bg-blue-50 transition-colors"
							>
								New Quiz
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Results.propTypes = {
	score: PropTypes.number.isRequired,
	totalQuestions: PropTypes.number.isRequired,
	topic: PropTypes.string.isRequired,
	onRetry: PropTypes.func.isRequired,
	onNewQuiz: PropTypes.func.isRequired
};

export default Results;
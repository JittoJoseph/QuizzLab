// src/components/QuizInterface.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const QuizInterface = ({ onComplete }) => {
	const [selectedAnswer, setSelectedAnswer] = useState(null);

	// Placeholder data - will be replaced with actual quiz data
	const mockQuestion = {
		question: "What is the primary function of photosynthesis in plants?",
		options: [
			"Convert light energy into chemical energy",
			"Release water into the atmosphere",
			"Absorb minerals from soil",
			"Produce oxygen only"
		],
		correct: 0
	};

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
							<span className="text-blue-900 font-semibold">Question 1/10</span>
						</div>
						<div className="flex items-center space-x-4">
							<div className="text-blue-900">
								<span className="font-semibold">Score:</span> 0
							</div>
							<div className="text-blue-900">
								<span className="font-semibold">Time:</span> 0:30
							</div>
						</div>
					</div>
					{/* Progress Bar */}
					<div className="w-full h-2 bg-blue-100 rounded-full mt-4">
						<div className="w-1/10 h-full bg-blue-600 rounded-full"></div>
					</div>
				</div>
			</div>

			{/* Main Quiz Content */}
			<div className="flex-grow flex items-center px-4 md:px-8 py-8">
				<div className="container mx-auto max-w-3xl">
					<div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
						{/* Question */}
						<h2 className="text-xl md:text-2xl text-blue-900 font-semibold">
							{mockQuestion.question}
						</h2>

						{/* Options */}
						<div className="space-y-3">
							{mockQuestion.options.map((option, index) => (
								<button
									key={index}
									onClick={() => setSelectedAnswer(index)}
									className={`w-full p-4 text-left rounded-xl transition-all
                    ${selectedAnswer === index
											? 'bg-blue-100 border-2 border-blue-600'
											: 'bg-gray-50 hover:bg-blue-50 border-2 border-transparent'
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

						{/* Navigation */}
						<div className="flex justify-between pt-6">
							<button className="px-6 py-2 border-2 border-blue-600 text-blue-700 rounded-lg 
								hover:bg-blue-50 bg-transparent transition-colors">
								Previous
							</button>
							<button className="px-6 py-2 bg-blue-600 text-white rounded-lg 
								hover:bg-blue-700 transition-colors">
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

QuizInterface.propTypes = {
	onComplete: PropTypes.func.isRequired
};

export default QuizInterface;
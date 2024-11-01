// src/components/QuizSetup.jsx
import React, { useState } from 'react';

const QuizSetup = ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		topic: '',
		difficulty: 'intermediate'
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		await onSubmit(formData);
		setIsLoading(false);
	};

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

			{/* Main Content */}
			<div className="flex-grow flex items-center justify-center px-4 md:px-8 py-8">
				<div className="w-full max-w-md">
					<div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
						<h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
							Create Your Quiz
						</h2>

						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Topic Input */}
							<div className="space-y-2">
								<label htmlFor="topic" className="block text-blue-900 font-medium">
									What would you like to learn about?
								</label>
								<input
									type="text"
									id="topic"
									value={formData.topic}
									onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
									placeholder="Enter any topic (e.g., Photosynthesis)"
									className="w-full px-4 py-3 rounded-lg border border-blue-200 
										focus:outline-none focus:ring-2 focus:ring-blue-500 
										bg-transparent text-blue-900 placeholder-blue-400"
									required
								/>
							</div>

							{/* Difficulty Selection */}
							<div className="space-y-2">
								<label htmlFor="difficulty" className="block text-blue-900 font-medium">
									Select Difficulty
								</label>
								<select
									id="difficulty"
									value={formData.difficulty}
									onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
									className="w-full px-4 py-3 rounded-lg border border-blue-200 
										focus:outline-none focus:ring-2 focus:ring-blue-500 
										bg-transparent text-blue-900"
								>
									<option value="beginner">Beginner</option>
									<option value="intermediate">Intermediate</option>
									<option value="advanced">Advanced</option>
								</select>
							</div>

							{/* Submit Button */}
							<button
								type="submit"
								disabled={isLoading}
								className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
									transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? (
									<div className="flex items-center justify-center space-x-2">
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										<span>Generating Quiz...</span>
									</div>
								) : (
									'Generate Quiz'
								)}
							</button>
						</form>

						{/* Tips */}
						<div className="mt-8 p-4 bg-blue-50 rounded-lg">
							<h3 className="text-blue-900 font-semibold mb-2">Tips:</h3>
							<ul className="text-blue-800 text-sm space-y-1">
								<li>• Be specific with your topic for better questions</li>
								<li>• Choose difficulty based on your knowledge level</li>
								<li>• Quiz will contain 10 multiple choice questions</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuizSetup;
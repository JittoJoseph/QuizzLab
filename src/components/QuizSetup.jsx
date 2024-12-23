// src/components/QuizSetup.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RefreshCw, AlertCircle } from 'lucide-react';

const QuizSetup = ({ onSubmit, onNavigate }) => {
	const [formData, setFormData] = useState({
		topic: '',
		difficulty: 'intermediate'
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [hasFailed, setHasFailed] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.topic.trim()) {
			setError('Please enter a topic');
			return;
		}

		setIsLoading(true);
		setError('');
		setHasFailed(false);

		try {
			await onSubmit(formData);
		} catch (error) {
			// Only log if not silent
			if (!error.silent) {
				console.error('Quiz generation failed:', error);
			}
			setHasFailed(true);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
			{/* Header */}
			<div className="px-4 md:px-8 py-6">
				<div
					onClick={() => onNavigate('welcome')}
					className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity w-fit"
				>
					<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
						<span className="text-white font-bold text-xl">Q</span>
					</div>
					<h1 className="text-2xl font-bold text-blue-800">QuizzLab</h1>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-grow flex items-center justify-center px-4 md:px-8 py-8">
				<div className="w-full max-w-md">
					<div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
						<h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
							Create Your Quiz
						</h2>

						{error && (
							<div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
								{error}
							</div>
						)}

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
									required
									className="w-full px-4 py-3 rounded-lg border border-blue-200 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    bg-transparent text-blue-900"
									placeholder="Enter any topic (e.g., 'Photosynthesis')"
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
							<div className="space-y-4">
								<button
									type="submit"
									disabled={isLoading && !hasFailed}
									className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                  transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isLoading && !hasFailed ? (
										<div className="flex items-center justify-center space-x-2">
											<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
											<span>Generating Quiz...</span>
										</div>
									) : hasFailed ? (
										<div className="flex items-center justify-center space-x-2">
											<AlertCircle className="w-5 h-5" />
											<span>Failed, Try Again</span>
										</div>
									) : (
										'Generate Quiz'
									)}
								</button>

								{hasFailed && (
									<p className="text-center text-blue-500/70 text-sm">
										All models are currently busy
									</p>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

QuizSetup.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onNavigate: PropTypes.func.isRequired
};

export default QuizSetup;
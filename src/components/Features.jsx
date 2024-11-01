// src/components/Features.jsx
import React from 'react';

const Features = ({ onBack }) => {
	const features = [
		{
			title: "AI-Powered Questions",
			description: "Generate unique questions on any topic using Google's Gemini AI",
			icon: "✨"
		},
		{
			title: "Instant Feedback",
			description: "Get immediate feedback on your answers with detailed explanations",
			icon: "⚡"
		},
		{
			title: "Adaptive Difficulty",
			description: "Choose between beginner, intermediate, and advanced levels",
			icon: "📈"
		},
		{
			title: "Progress Tracking",
			description: "Monitor your performance with real-time scoring and progress indicators",
			icon: "📊"
		}
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
			{/* Header */}
			<div className="px-4 md:px-8 py-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
							<span className="text-white font-bold text-xl">Q</span>
						</div>
						<h1 className="text-2xl font-bold text-blue-800">QuizzyAI</h1>
					</div>
					<button
						onClick={onBack}
						className="text-blue-700 hover:text-blue-900 font-semibold bg-transparent"
					>
						Back
					</button>
				</div>
			</div>

			{/* Features Grid */}
			<div className="flex-grow container mx-auto px-4 md:px-8 py-8 md:py-16">
				<h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">
					Powerful Features for Better Learning
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{features.map((feature, index) => (
						<div
							key={index}
							className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
						>
							<div className="text-4xl mb-4">{feature.icon}</div>
							<h3 className="text-xl font-bold text-blue-900 mb-2">
								{feature.title}
							</h3>
							<p className="text-blue-800 opacity-80">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Features;
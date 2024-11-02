// src/components/Features.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Features = ({ onNavigate }) => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
			{/* Header */}
			<div className="px-4 md:px-8 py-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
							<span className="text-white font-bold text-xl">Q</span>
						</div>
						<h1 className="text-2xl font-bold text-blue-800">QuizzLab</h1>
					</div>
					<button
						onClick={() => onNavigate('welcome')}
						className="text-blue-700 hover:text-blue-900 font-bold bg-transparent px-6 py-2 text-lg"
					>
						Back
					</button>
				</div>
			</div>

			<div className="container mx-auto px-4 md:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<FeatureCard
						title="AI-Powered Generation"
						description="Generate 10 unique multiple choice questions on any topic using Google's Gemini AI"
						icon="🤖"
					/>
					<FeatureCard
						title="Instant Feedback Mode"
						description="Enable instant feedback to see correct/wrong answers immediately after selection"
						icon="⚡"
					/>
					<FeatureCard
						title="Difficulty Levels"
						description="Customize your learning with Beginner, Intermediate, and Advanced modes"
						icon="📊"
					/>
					<FeatureCard
						title="Score Tracking"
						description="Track your performance with a beautiful progress bar and final score summary"
						icon="🎯"
					/>
				</div>
			</div>
		</div>
	);
};

const FeatureCard = ({ title, description, icon }) => (
	<div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
		<div className="text-4xl mb-4">{icon}</div>
		<h3 className="text-xl font-bold text-blue-900 mb-2">{title}</h3>
		<p className="text-blue-800/80">{description}</p>
	</div>
);

FeatureCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired
};

Features.propTypes = {
	onNavigate: PropTypes.func.isRequired
};

export default Features;
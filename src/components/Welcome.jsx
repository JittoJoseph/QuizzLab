import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import PropTypes from 'prop-types';

const Welcome = ({ onStartClick }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
			{/* Responsive Navigation */}
			<nav className="px-4 md:px-8 py-4 flex justify-between items-center relative">
				<div className="flex items-center space-x-2">
					<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
						<span className="text-white font-bold text-xl">Q</span>
					</div>
					<h1 className="text-2xl font-bold text-blue-800">QuizzyAI</h1>
				</div>

				{/* Mobile Menu Toggle */}
				<div className="md:hidden">
					<button
						onClick={toggleMenu}
						className="text-blue-700 focus:outline-none bg-transparent"
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Navigation Links */}
				<div className={`
          ${isMenuOpen ? 'flex' : 'hidden'} 
          md:flex 
          flex-col md:flex-row 
          absolute md:static 
          top-full left-0 right-0 
          bg-white md:bg-transparent 
          shadow-lg md:shadow-none 
          z-20 
          space-y-2 md:space-y-0 md:space-x-4 
          p-4 md:p-0
        `}>
					<button className="text-blue-700 hover:text-blue-900 font-semibold bg-transparent block w-full md:w-auto text-left">
						About
					</button>
					<button className="text-blue-700 hover:text-blue-900 font-semibold bg-transparent block w-full md:w-auto text-left">
						Features
					</button>
				</div>
			</nav>

			{/* Hero Section - Reorganized */}
			<div className="flex-grow flex items-center container mx-auto px-4 md:px-8 py-8 md:py-16">
				<div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12 w-full">
					{/* Text Content - Now on Left */}
					<div className="w-full md:w-1/2 text-center md:text-left space-y-6">
						<h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 leading-tight">
							Learn Anything with AI-Powered Quizzes
						</h2>
						<p className="text-lg md:text-xl text-blue-800 opacity-80">
							Generate custom quizzes on any topic instantly. Perfect for students and lifelong learners.
						</p>

						{/* Features List */}
						<div className="space-y-4">
							{[
								{ icon: 'check', text: 'Unlimited Quiz Topics' },
								{ icon: 'circle-check', text: 'AI-Generated Questions' },
								{ icon: 'book', text: 'Learn Anytime, Anywhere' }
							].map((feature, index) => (
								<div key={index} className="flex items-center justify-center md:justify-start space-x-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-blue-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										{feature.icon === 'check' && (
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
										)}
										{feature.icon === 'circle-check' && (
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
										)}
										{feature.icon === 'book' && (
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
										)}
									</svg>
									<span className="text-blue-800">{feature.text}</span>
								</div>
							))}
						</div>

						<div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
							<button
								onClick={onStartClick}
								className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold w-full sm:w-auto"
							>
								Start Learning
							</button>
							<button className="border-2 bg-transparent border-blue-600 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold w-full sm:w-auto">
								How It Works
							</button>
						</div>
					</div>

					{/* Illustration - Now on Right */}
					<div className="w-full md:w-1/2 flex justify-center md:justify-start">
						<div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 md:p-8 transform md:rotate-3 hover:rotate-0 transition-transform">
							<div className="bg-blue-100 rounded-lg p-4 mb-4">
								<div className="h-4 bg-blue-300 rounded w-3/4 mb-2"></div>
								<div className="h-4 bg-blue-300 rounded w-1/2"></div>
							</div>
							<div className="space-y-3">
								{[1, 2, 3, 4].map((item) => (
									<div key={item} className="flex items-center space-x-3">
										<div className="w-6 h-6 bg-blue-200 rounded-full"></div>
										<div className="h-4 bg-gray-200 rounded w-full"></div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-blue-800 text-white py-6">
				<div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
					<p className="text-center w-full md:w-auto">
						<a href="#" className="text-white hover:text-blue-200">© 2024 QuizzyAI</a>
					</p>
					<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto text-center">
						<a href="#" className="text-white hover:text-blue-200 block md:inline">Privacy</a>
						<a href="#" className="text-white hover:text-blue-200 block md:inline">Terms</a>
						<a href="#" className="text-white hover:text-blue-200 block md:inline">Contact</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

Welcome.propTypes = {
	onStartClick: PropTypes.func.isRequired
};

export default Welcome;
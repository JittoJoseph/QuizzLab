import React from 'react';

const Welcome = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
			{/* Navigation */}
			<nav className="px-8 py-4 flex justify-between items-center">
				<div className="flex items-center space-x-2">
					<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
						<span className="text-white font-bold text-xl">Q</span>
					</div>
					<h1 className="text-2xl font-bold text-blue-800">QuizzyAI</h1>
				</div>
				<div className="space-x-4">
					<button className="text-blue-700 hover:text-blue-900 font-semibold bg-transparent">
						About
					</button>
					<button className="text-blue-700 hover:text-blue-900 font-semibold bg-transparent">
						Features
					</button>
				</div>
			</nav>

			{/* Hero Section */}
			<div className="flex-grow flex items-center container mx-auto px-8 py-16">
				<div className="w-full flex items-center space-x-12">
					{/* Text Content */}
					<div className="w-1/2 space-y-6">
						<h2 className="text-5xl font-extrabold text-blue-900 leading-tight">
							Learn Anything with <br />AI-Powered Quizzes
						</h2>
						<p className="text-xl text-blue-800 opacity-80">
							Generate custom quizzes on any topic instantly. Perfect for students and lifelong learners.
						</p>

						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
								</svg>
								<span className="text-blue-800">Unlimited Quiz Topics</span>
							</div>
							<div className="flex items-center space-x-3">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span className="text-blue-800">AI-Generated Questions</span>
							</div>
							<div className="flex items-center space-x-3">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
								</svg>
								<span className="text-blue-800">Learn Anytime, Anywhere</span>
							</div>
						</div>

						<div className="flex space-x-4 pt-6">
							<button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
								Start Learning
							</button>
							<button className="border-2 bg-transparent border-blue-600 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
								How It Works
							</button>
						</div>
					</div>

					{/* Illustration */}
					<div className="w-1/2">
						<div className="bg-white shadow-2xl rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform">
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
				<div className="container mx-auto px-8 flex justify-between items-center">
					<p><a href="# " className="color: text-white hover:text-blue-200">© 2024 QuizzyAI.</a></p>
					<div className="space-x-4">
						<a href="#" className="color: text-white hover:text-blue-200">Privacy</a>
						<a href="#" className="color: text-white hover:text-blue-200">Terms</a>
						<a href="#" className="color: text-white hover:text-blue-200">Contact</a>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Welcome;
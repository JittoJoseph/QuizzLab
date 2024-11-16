import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Confetti from 'react-confetti';
import { useAuth } from '../context/AuthContext';
import { saveQuizResult } from '../services/firebase';

const Results = ({
	score,
	totalQuestions,
	topic,
	difficulty,
	onNewQuiz,
	onNavigate,
}) => {
	const saveAttempted = useRef(false);
	const [saving, setSaving] = useState(false);
	const [saveError, setSaveError] = useState(null);
	const [saved, setSaved] = useState(false);
	const { user, login } = useAuth();

	const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
	const isExcellentScore = percentage >= 90;
	const googleColors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];

	const saveResult = async (currentUser) => {
		// Early return if no user, already saving/saved, or no uid
		if (!currentUser?.uid || saving || saved) {
			console.log('Save conditions not met:', {
				hasUser: !!currentUser,
				hasUid: !!currentUser?.uid,
				saving,
				saved
			});
			return;
		}

		try {
			setSaving(true);
			const quizResult = {
				topic,
				score,
				totalQuestions,
				difficulty,
				timestamp: Date.now()
			};

			// Only save if we have a valid uid
			await saveQuizResult(currentUser.uid, quizResult);
			setSaved(true);
		} catch (error) {
			console.error('Save error:', error);
			setSaveError(error.message);
		} finally {
			setSaving(false);
		}
	};

	useEffect(() => {
		let mounted = true;

		const save = async () => {
			if (user && !saving && !saved && !saveAttempted.current) {
				saveAttempted.current = true;
				if (mounted) {
					await saveResult(user);
				}
			}
		};

		save();

		return () => {
			mounted = false;
		};
	}, [user]);

	const handleSignIn = async () => {
		try {
			const loggedInUser = await login();
			if (loggedInUser) {
				await saveResult(loggedInUser);
			}
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	const renderActionButtons = () => {
		return (
			<div className="space-y-4">
				<button
					onClick={onNewQuiz}
					className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                  transition-colors font-semibold"
				>
					Try Another Quiz
				</button>

				{user ? (
					<button
						onClick={() => onNavigate('profile')}
						className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 
                  rounded-lg hover:bg-blue-50 transition-colors font-semibold"
					>
						View Profile
					</button>
				) : (
					<button
						onClick={handleSignIn}
						className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 
                  rounded-lg hover:bg-blue-50 transition-colors font-semibold"
					>
						Sign in to Save Results
					</button>
				)}
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
			{isExcellentScore && (
				<Confetti
					recycle={false}
					numberOfPieces={300}
					gravity={0.3}
					colors={googleColors}
					tweenDuration={5000}
					width={window.innerWidth}
					height={window.innerHeight}
				/>
			)}

			{/* Header with Navigation */}
			<div className="px-4 md:px-8 py-6">
				<div
					onClick={() => {
						// Reset quiz state if needed
						if (onNewQuiz) onNewQuiz();
						onNavigate('welcome');
					}}
					className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity w-fit"
				>
					<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
						<span className="text-white font-bold text-xl">Q</span>
					</div>
					<h1 className="text-2xl font-bold text-blue-800">QuizzLab</h1>
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

						{/* Score Details */}
						<div className="mb-8 space-y-4">
							<p className="text-blue-800 text-lg">
								You scored <span className="font-bold">{score}</span> out of{' '}
								<span className="font-bold">{totalQuestions}</span>
							</p>

							<div className="grid grid-cols-2 gap-4">
								{/* Topic Box */}
								<div className="bg-blue-50/80 rounded-xl p-4 border border-blue-100 shadow-sm 
									hover:shadow-md transition-shadow duration-200">
									<p className="text-blue-600/80 text-sm mb-1">Topic</p>
									<p className="text-blue-900 font-semibold capitalize text-lg truncate">
										{topic}
									</p>
								</div>

								{/* Difficulty Box */}
								<div className="bg-blue-50/80 rounded-xl p-4 border border-blue-100 shadow-sm 
									hover:shadow-md transition-shadow duration-200">
									<p className="text-blue-600/80 text-sm mb-1">Difficulty</p>
									<p className="text-blue-900 font-semibold capitalize text-lg">
										{difficulty}
									</p>
								</div>
							</div>
						</div>

						{/* Actions */}
						{renderActionButtons()}

						{/* Save Status */}
						<div className="mt-4">
							{saving ? (
								<div className="text-blue-600 font-medium text-center">
									Saving your result...
								</div>
							) : saved ? (
								<div className="text-green-600 font-medium text-center">
									Result saved successfully!
								</div>
							) : null}

							{saveError && (
								<div className="text-red-600 font-medium text-center">
									{saveError}
								</div>
							)}
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
	difficulty: PropTypes.string,
	onNewQuiz: PropTypes.func.isRequired,
	onNavigate: PropTypes.func.isRequired,
};

export default Results;
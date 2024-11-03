// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import { getUserHistory } from '../services/firebase';
import { ArrowLeft, Trophy, Star, Circle } from 'lucide-react'; // Add icons import
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Profile = ({ onNavigate }) => {
	const { user } = useAuth();
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [chartLoading, setChartLoading] = useState(true);
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const results = await getUserHistory(user.uid);
				setHistory(results);
			} catch (error) {
				console.error('Failed to fetch history:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchHistory();
	}, [user]);

	const getChartData = (history) => {
		const sortedHistory = [...history]
			.sort((a, b) => b.timestamp - a.timestamp)
			.slice(0, 6)
			.reverse()
			.map(quiz => ({
				name: quiz.topic.length > 20 ? quiz.topic.substring(0, 20) + '...' : quiz.topic,
				score: quiz.score,
				average: quiz.totalQuestions / 2 // Adding baseline for comparison
			}));
		return sortedHistory;
	};

	// Add score indicator function
	const getScoreIndicator = (score, total) => {
		const percentage = (score / total) * 100;

		if (percentage >= 90) {
			return <Trophy className="w-5 h-5 text-yellow-500" />;
		} else if (percentage >= 70) {
			return <Star className="w-5 h-5 text-gray-400" />;
		} else if (percentage >= 50) {
			return <Circle className="w-5 h-5 text-amber-700" />;
		}
		return null;
	};

	// Custom Tooltip
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-blue-100">
					<p className="text-blue-900 font-semibold mb-1">{label}</p>
					<p className="text-blue-600">Score: {payload[0].value}</p>
				</div>
			);
		}
		return null;
	};

	// Update displayedHistory to show latest entries
	const displayedHistory = isExpanded
		? [...history].sort((a, b) => b.timestamp - a.timestamp).slice(0, 20) // Latest 20
		: [...history].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5); // Latest 5

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col scroll-smooth">
			<nav className="px-4 md:px-8 py-4 bg-white/50 backdrop-blur-sm">
				<div className="container mx-auto flex items-center">
					<button
						onClick={() => onNavigate('welcome')}
						className="text-blue-700 hover:text-blue-800 flex items-center space-x-2 bg-transparent"
					>
						<ArrowLeft className="w-5 h-5" />
						<span>Back</span>
					</button>
				</div>
			</nav>

			<div className="container mx-auto px-4 md:px-8 py-8">
				<div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg mb-8">
					<div className="flex items-center space-x-4">
						<img
							src={user?.photoURL}
							alt={user?.displayName}
							className="w-16 h-16 rounded-full border-2 border-blue-100"
						/>
						<div>
							<h2 className="text-2xl font-bold text-blue-900">{user?.displayName}</h2>
							<p className="text-blue-600">{user?.email}</p>
						</div>
					</div>
				</div>

				<div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg animate-fade-in-up">
					<h3 className="text-xl font-bold text-blue-900 mb-4">Quiz History</h3>
					{loading ? (
						<div className="flex justify-center py-8">
							<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
						</div>
					) : history.length > 0 ? (
						<>
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b-2 border-blue-100">
											<th className="py-3 px-2 text-left text-blue-800 w-10"></th>
											<th className="py-3 px-2 text-left text-blue-800">Topic</th>
											<th className="py-3 px-2 text-left text-blue-800">Score</th>
											<th className="py-3 px-2 text-left text-blue-800 hidden sm:table-cell">Difficulty</th>
											<th className="py-3 px-2 text-left text-blue-800 hidden sm:table-cell">Date</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-blue-50">
										{displayedHistory.map((quiz) => (
											<tr key={quiz.id} className="hover:bg-blue-50/50 transition-colors">
												<td className="py-3 px-2">
													{getScoreIndicator(quiz.score, quiz.totalQuestions)}
												</td>
												<td className="py-3 px-2 text-blue-900 max-w-[150px] sm:max-w-none truncate">
													{quiz.topic}
												</td>
												<td className="py-3 px-2 whitespace-nowrap">
													<span className="px-2 py-1 bg-blue-100 rounded text-blue-800">
														{quiz.score}/{quiz.totalQuestions}
													</span>
												</td>
												<td className="py-3 px-2 capitalize text-blue-700 hidden sm:table-cell">
													{quiz.difficulty}
												</td>
												<td className="py-3 px-2 text-blue-600 hidden sm:table-cell">
													{new Date(quiz.timestamp).toLocaleDateString()}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							{history.length > 5 && (
								<button
									onClick={() => setIsExpanded(!isExpanded)}
									className="w-full text-center mt-4 bg-blue-600 hover:bg-blue-700 
      text-white px-4 py-2 rounded-lg transition-all duration-200 
      font-semibold"
								>
									{isExpanded ? 'Show less' : 'Show more'}
								</button>
							)}
						</>
					) : (
						<div className="text-center py-12 text-blue-800">
							<p className="text-lg">No quiz history yet</p>
							<p className="text-sm mt-2 text-blue-600">Complete some quizzes to see them here!</p>
						</div>
					)}
				</div>

				{history.length > 0 && (
					<div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg mt-8">
						<h3 className="text-xl font-bold text-blue-900 mb-6">Performance Overview</h3>
						<div className="h-[400px] -mx-6 sm:mx-0"> {/* Negative margin on mobile */}
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart
									data={getChartData(history)}
									margin={{
										top: 20,
										right: 10,
										left: 0,
										bottom: 40 // Increased bottom margin for desktop
									}}
								>
									<defs>
										<linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
											<stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" stroke="#EFF6FF" />
									<XAxis
										dataKey="name"
										stroke="#1E40AF"
										fontSize={12}
										tickMargin={10}
										interval={0}
										height={40} // Increased height for text
										className="hidden sm:block" // Hide on mobile, show on desktop
									/>
									<YAxis
										stroke="#1E40AF"
										domain={[0, 10]}
										ticks={[0, 2, 4, 6, 8, 10]}
									/>
									<Tooltip content={<CustomTooltip />} />
									<Area
										type="monotone"
										dataKey="score"
										stroke="#3B82F6"
										strokeWidth={3}
										fill="url(#scoreGradient)"
										animationDuration={1000}
										activeDot={{ r: 6, fill: "#2563EB" }}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

Profile.propTypes = {
	onNavigate: PropTypes.func.isRequired
};

export default Profile;
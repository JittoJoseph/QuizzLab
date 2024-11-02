// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import { getUserHistory } from '../services/firebase';
import { ArrowLeft } from 'lucide-react';
import { Chart } from "react-google-charts";

const Profile = ({ onNavigate }) => {
	const { user } = useAuth();
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [chartLoading, setChartLoading] = useState(true);

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
		const data = [['Quiz', 'Score']];
		history.forEach(quiz => {
			data.push([quiz.topic, quiz.score]);
		});
		return data;
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
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

				<div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
					<h3 className="text-xl font-bold text-blue-900 mb-4">Quiz History</h3>
					{loading ? (
						<div className="flex justify-center py-8">
							<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
						</div>
					) : history.length > 0 ? (
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b-2 border-blue-100">
										<th className="py-3 px-4 text-left text-blue-800">Topic</th>
										<th className="py-3 px-4 text-left text-blue-800">Score</th>
										<th className="py-3 px-4 text-left text-blue-800">Difficulty</th>
										<th className="py-3 px-4 text-left text-blue-800">Date</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-blue-50">
									{history.map((quiz) => (
										<tr key={quiz.id} className="hover:bg-blue-50/50 transition-colors">
											<td className="py-3 px-4 text-blue-900">{quiz.topic}</td>
											<td className="py-3 px-4">
												<span className="px-2 py-1 bg-blue-100 rounded text-blue-800">
													{quiz.score}/{quiz.totalQuestions}
												</span>
											</td>
											<td className="py-3 px-4 capitalize text-blue-700">{quiz.difficulty}</td>
											<td className="py-3 px-4 text-blue-600">
												{new Date(quiz.timestamp).toLocaleDateString()}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className="text-center py-12 text-blue-800">
							<p className="text-lg">No quiz history yet</p>
							<p className="text-sm mt-2 text-blue-600">Complete some quizzes to see them here!</p>
						</div>
					)}
				</div>

				{history.length > 0 && (
					<div className="mt-8">
						<h3 className="text-xl font-bold text-blue-900 mb-4">Performance Overview</h3>
						{chartLoading && (
							<div className="flex justify-center py-8">
								<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
							</div>
						)}
						<div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
							<Chart
								chartType="LineChart"
								data={getChartData(history)}
								options={{
									title: 'Quiz Performance',
									curveType: 'function',
									legend: { position: 'none' },
									colors: ['#2563EB'],
									backgroundColor: 'transparent',
									vAxis: {
										viewWindow: {
											min: 0,
											max: 10
										},
										ticks: [0, 5, 10], // Only show these values
										gridlines: {
											count: 3 // Matches number of ticks
										}
									}
								}}
								width="100%"
								height="400px"
								onLoad={() => setChartLoading(false)}
							/>
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
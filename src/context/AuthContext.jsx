// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { signInWithGoogle, logOut } from '../services/firebase';

export const AuthContext = createContext({
	user: null,
	loading: true,
	login: () => { },
	logout: () => { }
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		return auth.onAuthStateChanged((user) => {
			setUser(user);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<AuthContext.Provider value={{
			user,
			loading,
			login: signInWithGoogle,
			logout: logOut
		}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
};
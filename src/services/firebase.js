// src/services/firebase.js
import { auth, db } from '../config/firebase';
import {
	collection,
	addDoc,
	query,
	where,
	getDocs,
	orderBy
} from 'firebase/firestore';
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut
} from 'firebase/auth';

// Auth
export const signInWithGoogle = async () => {
	try {
		return await signInWithPopup(auth, new GoogleAuthProvider());
	} catch (error) {
		console.error('Auth error:', error);
		throw error;
	}
};

export const logOut = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error('Logout error:', error);
		throw error;
	}
};

// Quiz Data
export const saveQuizResult = async (userId, quizData) => {
	try {
		return await addDoc(collection(db, 'quizResults'), {
			userId,
			topic: quizData.topic,
			score: quizData.score,
			totalQuestions: quizData.totalQuestions,
			difficulty: quizData.difficulty,
			timestamp: new Date()
		});
	} catch (error) {
		console.error('Save error:', error);
		throw error;
	}
};

export const getUserHistory = async (userId) => {
	try {
		const q = query(
			collection(db, 'quizResults'),
			where('userId', '==', userId),
			orderBy('timestamp', 'desc')
		);
		const snapshot = await getDocs(q);
		return snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
			timestamp: doc.data().timestamp.toDate()
		}));
	} catch (error) {
		console.error('Get history error:', error);
		throw error;
	}
};
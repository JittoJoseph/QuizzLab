// src/services/firebase.js
import { auth, db } from '../config/firebase';
import {
	collection,
	addDoc,
	query,
	where,
	getDocs
} from 'firebase/firestore';
import {
	GoogleAuthProvider,
	signInWithPopup
} from 'firebase/auth';

// Auth
export const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

// Quiz Data
export const saveQuizResult = async (userId, quizData) => {
	return addDoc(collection(db, 'quizResults'), {
		userId,
		topic: quizData.topic,
		score: quizData.score,
		totalQuestions: quizData.totalQuestions,
		difficulty: quizData.difficulty,
		timestamp: new Date()
	});
};

export const getUserHistory = async (userId) => {
	const q = query(
		collection(db, 'quizResults'),
		where('userId', '==', userId)
	);
	const snapshot = await getDocs(q);
	return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
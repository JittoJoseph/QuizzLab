// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "quizzyai-691e2.firebaseapp.com",
	projectId: "quizzyai-691e2",
	storageBucket: "quizzyai-691e2.firebasestorage.app",
	messagingSenderId: "537841551762",
	appId: "1:537841551762:web:c19b1d3fd83edc402cd94b",
	measurementId: "G-6P17J1FMQY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
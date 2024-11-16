// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';

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

// Only initialize analytics in production and if not blocked
export const analytics = typeof window !== 'undefined' &&
	!window.doNotTrack &&
	!navigator.doNotTrack ?
	getAnalytics(app) : null;

// Helper function for logging events
export const logAnalyticsEvent = (eventName, eventParams = {}) => {
	try {
		if (analytics) {
			logEvent(analytics, eventName, eventParams);
		}
	} catch (error) {
		console.debug('Analytics event not logged:', error);
	}
};
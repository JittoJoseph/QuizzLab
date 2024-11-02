// src/components/LoginButton.jsx
import { signInWithGoogle } from '../services/firebase';

const LoginButton = () => (
	<button
		onClick={signInWithGoogle}
		className="px-4 py-2 bg-blue-600 text-white rounded-lg"
	>
		Sign in with Google
	</button>
);
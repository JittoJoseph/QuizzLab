# QuizzLab 🎯

An AI-powered quiz generation platform that creates personalized learning experiences using Google's Gemini AI.

## Features 

- **AI-Powered Quiz Generation**: Create custom quizzes on any topic instantly
- **Multiple Difficulty Levels**: Choose between Beginner, Intermediate, and Advanced
- **Real-time Feedback**: Get immediate feedback on your answers
- **Progress Tracking**: Track your learning journey with detailed statistics
- **User Profiles**: Save quiz history and view performance analytics
- **Responsive Design**: Seamless experience across all devices

## Tech Stack 

- React 18 + Vite
- Firebase (Auth + Firestore)
- Google Gemini AI
- TailwindCSS

## Setup 

### Prerequisites
- Node.js 16+ installed
- A Google Cloud account for Gemini API
- A Firebase account

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/JittoJoseph/QuizzLab.git
cd QuizzLab
```

2. Install dependencies
```bash
npm install
```

3. Firebase Setup
- Go to [Firebase Console](https://console.firebase.google.com)
- Create a new project
- Enable Authentication:
  - Go to Authentication > Sign-in method
  - Enable Google Sign-in
- Create Firestore Database:
  - Go to Firestore Database
  - Create database in test mode
- Get Firebase Config:
  - Go to Project Settings > General
  - Scroll to "Your apps"
  - Click Web icon (</>)
  - Register app and copy config

4. Update Firebase Configuration
Replace the config in 

firebase.js

:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

5. Environment Setup
Create 

.env

 file in root directory:
```plaintext
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

6. Start Development Server
```bash
npm run dev
```

## Deployment 

1. Push code to GitHub repository

2. Deploy on Vercel:
- Go to [vercel.com](https://vercel.com)
- Sign in with GitHub
- Import your repository
- Configure build settings:
  - Framework Preset: Vite
  - Build Command: npm run build
  - Output Directory: dist
- Add environment variables
- Deploy!


## License

This project is licensed under Apache License 2.0 - see the [LICENSE](LICENSE) file for details.


## Contact

Jitto Joseph - [@JittoJoseph50](https://x.com/JittoJoseph50)

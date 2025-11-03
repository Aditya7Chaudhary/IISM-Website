import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDU6WywvvC061Bret3Rv3mzND0hn5OQBQk",
  authDomain: "iism-2025-app.firebaseapp.com",
  databaseURL: "https://iism-2025-app-default-rtdb.firebaseio.com",
  projectId: "iism-2025-app",
  storageBucket: "iism-2025-app.firebasestorage.app",
  messagingSenderId: "790715433511",
  appId: "1:790715433511:web:4c8071f75f13f7887f0402",
  measurementId: "G-Z7CJ4VZJMJ",

  databaseURL: "https://iism-2025-app-default-rtdb.firebaseio.com"
};


let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app);


  console.log("Firebase initialized successfully with Realtime Database");

} catch (e) {
  console.error("Firebase initialization error:", e);
}

const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

export const signIn = async () => {
  if (!auth) {
    console.error("Auth is not initialized");
    return null;
  }
  try {
    if (initialAuthToken) {
      await signInWithCustomToken(auth, initialAuthToken);
    } else {
      await signInAnonymously(auth);
    }
    return auth.currentUser ? auth.currentUser.uid : null;
  } catch (error) {
    console.error("Error signing in:", error);
    return null;
  }
};

export { db, auth };

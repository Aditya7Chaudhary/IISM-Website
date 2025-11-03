import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
// --- THIS IS THE CHANGE ---
// Import getDatabase (for Realtime Database) INSTEAD of getFirestore
import { getDatabase} from 'firebase/database';
// --------------------------

// Your web app's Firebase configuration
// This should still have your apiKey, authDomain, etc.
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


// --- Firebase Initialization ---
let app;
let auth;
let db; // 'db' will now be our Realtime Database

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app); // We call getDatabase()
  
  // setLogLevel('debug'); // <-- THIS WAS THE ERROR. IT IS NOW REMOVED.

  console.log("Firebase initialized successfully with Realtime Database");

} catch (e) {
  console.error("Firebase initialization error:", e);
}

// Get the initial auth token
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

// Export the initialized db and auth
export { db, auth };

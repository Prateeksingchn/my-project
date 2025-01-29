import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCLObnB1k7l4sKEIoImATOx2Era5cpcdt4",
  authDomain: "notes-app-3d7e1.firebaseapp.com",
  projectId: "notes-app-3d7e1",
  storageBucket: "notes-app-3d7e1.firebasestorage.app",
  messagingSenderId: "695472374989",
  appId: "1:695472374989:web:d7e749244dd33d2a8e5584",
  measurementId: "G-56RR7MCYFB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider }; 
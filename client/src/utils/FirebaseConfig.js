import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBmytzmmw3QqDO7eZo6PFVu4nyW3RZMTEM",
  authDomain: "whatsappclone-11a99.firebaseapp.com",
  projectId: "whatsappclone-11a99",
  storageBucket: "whatsappclone-11a99.appspot.com",
  messagingSenderId: "406131869172",
  appId: "1:406131869172:web:cf910b10540d00910ba5a1",
  measurementId: "G-LPPTTY56YD"
};

const app = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)

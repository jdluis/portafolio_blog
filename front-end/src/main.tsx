import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import './index.css'
import App from './App.tsx'

const firebaseConfig = {
  apiKey: "AIzaSyCMkUOWlmv-SL8PvZRst8eTE5a3LAZD9WM",
  authDomain: "portafolio-blog-5ffaf.firebaseapp.com",
  projectId: "portafolio-blog-5ffaf",
  storageBucket: "portafolio-blog-5ffaf.firebasestorage.app",
  messagingSenderId: "683148824783",
  appId: "1:683148824783:web:9a240d69c92aae9a8167ba",
  measurementId: "G-DL1330PWJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

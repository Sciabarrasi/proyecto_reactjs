import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVX_PjDa4bK3-ICMzcI92QDlc54k56Cog",
  authDomain: "react-proyect-514ff.firebaseapp.com",
  projectId: "react-proyect-514ff",
  storageBucket: "react-proyect-514ff.appspot.com",
  messagingSenderId: "1001065244373",
  appId: "1:1001065244373:web:bc64aeb2c766a49f00245c"
};

// Initialize Firebase
initializeApp(firebaseConfig);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

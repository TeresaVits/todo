// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importar o Firestore

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCzh5zRnJsFpBPfzot-S8O502007_uPgoc",
  authDomain: "todoapp-2ed28.firebaseapp.com",
  projectId: "todoapp-2ed28",
  storageBucket: "todoapp-2ed28.appspot.com",
  messagingSenderId: "95090839038",
  appId: "1:95090839038:web:ae9c343685a8f41fa684af",
  measurementId: "G-R04NRVR22N"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar o Firestore
const db = getFirestore(app);

export { db }

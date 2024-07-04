import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCNd-dagbKVU2XoKhPgHljRbzc7of0EmFI",
  authDomain: "evaluacion1-9bc6f.firebaseapp.com",
  projectId: "evaluacion1-9bc6f",
  storageBucket: "evaluacion1-9bc6f.appspot.com",
  messagingSenderId: "485188534811",
  appId: "1:485188534811:web:1845bbd0bd5d75f573aebe",
  measurementId: "G-FQ3MST90KS"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };

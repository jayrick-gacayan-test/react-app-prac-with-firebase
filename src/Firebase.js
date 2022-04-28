import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyBqZVyIpVVAf5vacGbgU0SgK1t0IQIPxss",
    authDomain: "react-firebase-practical-app.firebaseapp.com",
    databaseURL: "https://react-firebase-practical-app-default-rtdb.firebaseio.com",
    projectId: "react-firebase-practical-app",
    storageBucket: "react-firebase-practical-app.appspot.com",
    messagingSenderId: "56861179616",
    appId: "1:56861179616:web:1a6ce50de6ed1396cb9a85",
    measurementId: "G-BW3RRJBGT9"
};
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);
export { db }
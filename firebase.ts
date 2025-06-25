import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: "AIzaSyDNBNcmSqvoX8GunySvZFI7MaPRg3jM9sY",
	authDomain: "baby-memories-2cfd0.firebaseapp.com",
	projectId: "baby-memories-2cfd0",
	storageBucket: "baby-memories-2cfd0.firebasestorage.app",
	messagingSenderId: "608882619485",
	appId: "1:608882619485:web:d48c33fb514f8a723d49b4",
	measurementId: "G-9S4XM9KXQX"
};

const app = initializeApp(firebaseConfig);
const authFirebase = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app, "baby-memories");

export { authFirebase, db, storage };


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDNBNcmSqvoX8GunySvZFI7MaPRg3jM9sY',
	authDomain: 'baby-memories-2cfd0.firebaseapp.com',
	projectId: 'baby-memories-2cfd0',
	storageBucket: 'baby-memories-2cfd0.firebasestorage.app',
	messagingSenderId: '608882619485',
	appId: '1:608882619485:web:d48c33fb514f8a723d49b4',
};

const app = initializeApp(firebaseConfig);
const authFirebase = getAuth(app);

export { authFirebase };

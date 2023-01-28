// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBFnUH3KB0THD7dod1tprIxANh5EVQ0Pz0',
  authDomain: 'jcb-qr-generator.firebaseapp.com',
  projectId: 'jcb-qr-generator',
  storageBucket: 'jcb-qr-generator.appspot.com',
  messagingSenderId: '971348100353',
  appId: '1:971348100353:web:a2c5a312cde69c3230c700',
  measurementId: 'G-SZ4R4GN1D8',
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

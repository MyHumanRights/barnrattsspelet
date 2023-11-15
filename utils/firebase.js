// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDqKe9ePk8ZYno7ziZAx6vbPczkB3gYbKM',
  authDomain: 'mhrdb-a91cf.firebaseapp.com',
  projectId: 'mhrdb-a91cf',
  storageBucket: 'mhrdb-a91cf.appspot.com',
  messagingSenderId: '722605126271',
  appId: '1:722605126271:web:d67dfbfb3392e1d182854a',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

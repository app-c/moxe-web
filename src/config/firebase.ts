import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { getAnalytics } from 'firebase/analytics'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBk3ca6IBUEJVgGjZisG4tuQzcuvBcvwd4',

  authDomain: 'requisicao-26507.firebaseapp.com',

  projectId: 'requisicao-26507',

  storageBucket: 'requisicao-26507.appspot.com',

  messagingSenderId: '233990151496',

  appId: '1:233990151496:web:9bfea768eaaa3df429277d',

  measurementId: 'G-MHLWXB60LW',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)

export const fire = getFirestore(app)

const analytics = getAnalytics(app)

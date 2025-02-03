// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// Firebase 설정
const firebaseConfig = {
  apiKey: 'AIzaSyCpsIonFThw_LhjGhuGi7mBQWXZ0sEFAII',
  authDomain: 'fir-webchat-449010.firebaseapp.com',
  databaseURL: 'https://firebase-webchat-449010-default-rtdb.firebaseio.com',
  projectId: 'firebase-webchat-449010',
  storageBucket: 'firebase-webchat-449010.firebasestorage.app',
  messagingSenderId: '645439159513',
  appId: '1:645439159513:web:347b26ecabeb75e93492c8',
  measurementId: 'G-T3HFGFDTJ0',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database();

export { database };

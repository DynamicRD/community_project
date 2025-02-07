// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// Firebase 설정
const firebaseConfig = {};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database();

export { database };

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD0Xx5Hbxv5tvyZT0epnkFYBVNkXzH6-eQ",
    authDomain: "hariz-e4318.firebaseapp.com",
    projectId: "hariz-e4318",
    storageBucket: "hariz-e4318.appspot.com",
    messagingSenderId: "224399388200",
    appId: "1:224399388200:web:043261c2a2996ea8028f1d",
    measurementId: "G-FMG6SYHNS5"
}

export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
import * as firebase from 'firebase/app'
import { getStorage } from '@firebase/storage'
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, GithubAuthProvider } from '@firebase/auth'


const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_GOOGLE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_GOOGLE_MESSAGGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID
}

export const app = firebase.initializeApp(clientCredentials)
export const storage = getStorage()
const db = getFirestore(app)
export const auth = getAuth()
export const provider = new GithubAuthProvider()

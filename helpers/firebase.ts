import { initializeApp } from 'firebase/app'
import { getStorage } from '@firebase/storage'

export const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_GOOGLE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_GOOGLE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID,
}

export const app = initializeApp(clientCredentials)
export const storage = getStorage(app)

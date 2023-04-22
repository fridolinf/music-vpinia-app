import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const {
  VITE_APP_API_KEY,
  VITE_APP_AUTH_DOMAIN,
  VITE_APP_PROJECT_ID,
  VITE_APP_STORAGE_BUCKET,
  VITE_APP_MESSAGING_SENDER_ID,
  VITE_APP_APP_ID
} = import.meta.env

const firebaseConfig = {
  apiKey: VITE_APP_API_KEY,
  authDomain: VITE_APP_AUTH_DOMAIN,
  projectId: VITE_APP_PROJECT_ID,
  storageBucket: VITE_APP_STORAGE_BUCKET,
  messagingSenderId: VITE_APP_MESSAGING_SENDER_ID,
  appId: VITE_APP_APP_ID
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage()

export { auth, db, storage }

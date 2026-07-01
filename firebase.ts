import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey:
    (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_API_KEY : undefined) ??
    import.meta.env?.VITE_API_KEY,
  authDomain:
    (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN : undefined) ??
    import.meta.env?.VITE_AUTH_DOMAIN,
  databaseURL:
    (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL : undefined) ??
    import.meta.env?.VITE_DATABASE_URL,
  projectId:
    (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID : undefined) ??
    import.meta.env?.VITE_PROJECT_ID,
  storageBucket:
    (typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
      : undefined) ?? import.meta.env?.VITE_STORAGE_BUCKET,
  messagingSenderId:
    (typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
      : undefined) ?? import.meta.env?.VITE_MESSAGING_SENDER_ID,
  appId:
    (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_APP_ID : undefined) ??
    import.meta.env?.VITE_APP_ID,
  measurementId:
    (typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
      : undefined) ?? import.meta.env?.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
// export const db2 = getFirestore(app);
export const auth = getAuth();
// export const analytics = getAnalytics(app);

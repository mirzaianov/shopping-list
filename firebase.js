import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: `${import.meta.env.API_KEY}`,
  authDomain: `${import.meta.env.AUTH_DOMAIN}`,
  databaseURL: `${import.meta.env.DATABASE_URL}`,
  projectId: `${import.meta.env.PROJECT_ID}`,
  storageBucket: `${import.meta.env.STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.APP_ID}`,
  measurementId: `${import.meta.env.MEASUREMENT_ID}`,
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth();
// export const analytics = getAnalytics(app);

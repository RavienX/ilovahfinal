// ============================================================================
// Firebase config — you fill these values from Firebase Console
// ============================================================================
// Where to find these:
//   1. Go to https://console.firebase.google.com/project/ilovahclean/settings/general
//   2. Scroll to "Your apps" → if there's no web app, click </> to create one
//   3. Copy the firebaseConfig values and paste over the placeholders below
// ============================================================================

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'REPLACE_WITH_YOUR_API_KEY',
  authDomain: 'ilovahclean.firebaseapp.com',
  projectId: 'ilovahclean',
  storageBucket: 'ilovahclean.appspot.com',
  messagingSenderId: 'REPLACE_WITH_YOUR_SENDER_ID',
  appId: 'REPLACE_WITH_YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
export { app };
export const db = getFirestore(app);
export const auth = getAuth(app);

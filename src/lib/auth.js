// Firebase Auth wrapper. Email/password login for admin (Francis + team).
import {
  signInWithEmailAndPassword, signOut as fbSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase';

export { auth };

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOut() {
  return fbSignOut(auth);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

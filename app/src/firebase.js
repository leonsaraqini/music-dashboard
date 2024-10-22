
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCoQWttfNXxcn_weU5-v9ALG53ynsAb1to",
  authDomain: "test-react-971b9.firebaseapp.com",
  projectId: "test-react-971b9",
  storageBucket: "test-react-971b9.appspot.com",
  messagingSenderId: "613924429425",
  appId: "1:613924429425:web:905d4194be2e11208a05d0",
  measurementId: "G-NFF02R96NP"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);
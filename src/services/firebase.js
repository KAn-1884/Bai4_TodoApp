import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

// Config gốc của bạn
const firebaseConfig = {
  apiKey: "AIzaSyCHrtHJlhPLauZCyWMRguVJ_hMLwImUscs",
  authDomain: "todo-app-student.firebaseapp.com",
  databaseURL:
    "https://todo-app-student-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-app-student",
  storageBucket: "todo-app-student.firebasestorage.app",
  messagingSenderId: "388448946224",
  appId: "1:388448946224:web:fb4fbd403f279cdc7d05f5",
  measurementId: "G-KGY0N5F68Z",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Logic đồng bộ User
export const syncUserToFirestore = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      id: user.uid,
      name: user.displayName || user.email.split("@")[0],
      email: user.email,
      image: user.photoURL || "",
      createdAt: serverTimestamp(),
      authProvider: user.providerData[0]?.providerId || "password",
    });
  }
};

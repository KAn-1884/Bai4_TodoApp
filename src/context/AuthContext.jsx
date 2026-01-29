import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  syncUserToFirestore,
} from "../services/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Đăng ký & Lưu User
  async function signup(email, password) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await syncUserToFirestore(res.user); // Lưu vào DB
    return res;
  }

  // 2. Đăng nhập thường
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // 3. Đăng nhập Google & Lưu User
  async function loginWithGoogle() {
    const res = await signInWithPopup(auth, googleProvider);
    await syncUserToFirestore(res.user); // Lưu vào DB
    return res;
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

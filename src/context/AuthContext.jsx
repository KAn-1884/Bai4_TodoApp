import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

const AuthContext = createContext();

// Hook để gọi nhanh context ở các component khác
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Đăng ký
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // 2. Đăng nhập Email/Pass
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // 3. Đăng nhập Google
  function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  // 4. Đăng xuất
  function logout() {
    return signOut(auth);
  }

  // 5. Theo dõi trạng thái user (tự động chạy khi app load)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Đã check xong, tắt loading
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

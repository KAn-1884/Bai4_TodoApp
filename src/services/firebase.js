// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Thêm Auth
import { getFirestore } from "firebase/firestore"; // Thêm Firestore

// Config của bạn (Mình giữ nguyên)
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

// 1. Khởi tạo app
const app = initializeApp(firebaseConfig);

// 2. Khởi tạo và EXPORT các dịch vụ để dùng ở nơi khác (QUAN TRỌNG)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

// Firebase Imports
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { currentUser } = useAuth();

  // --- STATE QUẢN LÝ DỮ LIỆU ---
  const [todos, setTodos] = useState([]); // List gốc từ DB
  const [loading, setLoading] = useState(true);

  // --- STATE QUẢN LÝ TÌM KIẾM & LỌC ---
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all | completed | pending
  const [sortType, setSortType] = useState("newest"); // newest | oldest | a-z

  // 1. Tải dữ liệu Realtime từ Firestore
  useEffect(() => {
    if (!currentUser) return;

    // Query: Lấy todos CỦA USER HIỆN TẠI, sắp xếp theo ngày tạo giảm dần
    const q = query(
      collection(db, "todos"),
      where("uid", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    // Lắng nghe thay đổi (Realtime)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todoList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todoList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // 2. Xử lý Thêm Todo
  const addTodo = async (title) => {
    if (!title) return;
    await addDoc(collection(db, "todos"), {
      uid: currentUser.uid, // Quan trọng: Gán task cho user hiện tại
      title: title,
      completed: false,
      createdAt: serverTimestamp(),
      deadline: serverTimestamp(), // Demo: Lấy luôn giờ hiện tại làm deadline
    });
  };

  // 3. Xử lý Update trạng thái (Done/Undone)
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // 4. Xử lý Xóa
  const handleDelete = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa?");
    if (confirm) {
      await deleteDoc(doc(db, "todos", id));
    }
  };

  // 5. Xử lý Sửa tên
  const handleEdit = async (id, newTitle) => {
    await updateDoc(doc(db, "todos", id), {
      title: newTitle,
    });
  };

  // --- LOGIC LỌC & TÌM KIẾM (Xử lý ở Client cho nhanh) ---
  const filteredTodos = useMemo(() => {
    let result = todos;

    // a. Lọc theo tìm kiếm
    if (searchTerm) {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // b. Lọc theo trạng thái
    if (filterStatus === "completed") {
      result = result.filter((t) => t.completed);
    } else if (filterStatus === "pending") {
      result = result.filter((t) => !t.completed);
    }

    // c. Sắp xếp
    result.sort((a, b) => {
      if (sortType === "newest") return b.createdAt - a.createdAt; // Mặc định Firestore đã trả về đúng, nhưng sort lại cho chắc
      if (sortType === "oldest") return a.createdAt - b.createdAt;
      if (sortType === "a-z") return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [todos, searchTerm, filterStatus, sortType]);

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 4, pb: 5 }}>
        {/* Header Title */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Quản Lý Công Việc
          </Typography>
          <Typography variant="body1" color="text.secondary">
            User: {currentUser?.email}
          </Typography>
        </Box>

        {/* Form Thêm Mới */}
        <TodoForm addTodo={addTodo} />

        {/* --- THANH CÔNG CỤ (Tìm kiếm - Lọc - Sort) --- */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          {/* Tìm kiếm */}
          <TextField
            label="Tìm kiếm công việc..."
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, bgcolor: "white" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Lọc Trạng Thái */}
          <FormControl size="small" sx={{ minWidth: 120, bgcolor: "white" }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={filterStatus}
              label="Trạng thái"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="pending">Chưa xong</MenuItem>
              <MenuItem value="completed">Đã xong</MenuItem>
            </Select>
          </FormControl>

          {/* Sắp xếp */}
          <FormControl size="small" sx={{ minWidth: 150, bgcolor: "white" }}>
            <InputLabel>Sắp xếp</InputLabel>
            <Select
              value={sortType}
              label="Sắp xếp"
              onChange={(e) => setSortType(e.target.value)}
            >
              <MenuItem value="newest">Mới nhất</MenuItem>
              <MenuItem value="oldest">Cũ nhất</MenuItem>
              <MenuItem value="a-z">Tên A-Z</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* --- DANH SÁCH CÔNG VIỆC --- */}
        <Box>
          {loading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}

              {filteredTodos.length === 0 && (
                <Typography
                  align="center"
                  color="text.secondary"
                  sx={{ mt: 4, fontStyle: "italic" }}
                >
                  Không tìm thấy công việc nào phù hợp.
                </Typography>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}

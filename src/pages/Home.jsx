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
  Timestamp, // Nhớ import Timestamp
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortType, setSortType] = useState("deadline_asc");

  // 1. Tải dữ liệu Realtime
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "todos"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
    );

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

  // 2. Thêm Todo Mới (Đã sửa để nhận date)
  const addTodo = async (text, deadlineDate) => {
    if (!text) return;
    await addDoc(collection(db, "todos"), {
      userId: currentUser.uid,
      text: text,
      status: "pending",
      // Chuyển Date JS -> Firebase Timestamp
      deadline: Timestamp.fromDate(deadlineDate),
      finishedTime: null,
      createdAt: serverTimestamp(),
    });
  };

  // 3. Đổi trạng thái
  const toggleStatus = async (todo) => {
    const newStatus = todo.status === "pending" ? "done" : "pending";
    await updateDoc(doc(db, "todos", todo.id), {
      status: newStatus,
      finishedTime: newStatus === "done" ? serverTimestamp() : null,
    });
  };

  // 4. Xóa
  const handleDelete = async (id) => {
    if (window.confirm("Xóa công việc này?")) {
      await deleteDoc(doc(db, "todos", id));
    }
  };

  // 5. Sửa
  const handleEdit = async (id, newText) => {
    await updateDoc(doc(db, "todos", id), {
      text: newText,
    });
  };

  // --- CLIENT-SIDE FILTER & SORT ---
  const filteredTodos = useMemo(() => {
    let result = todos;

    // Search
    if (searchTerm) {
      result = result.filter((t) =>
        t.text.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter
    if (filterStatus !== "all") {
      result = result.filter((t) => t.status === filterStatus);
    }

    // Sort (Logic mới)
    result.sort((a, b) => {
      const dateA = a.deadline?.seconds || 0;
      const dateB = b.deadline?.seconds || 0;

      if (sortType === "deadline_desc") return dateB - dateA;
      if (sortType === "deadline_asc") return dateA - dateB;
      if (sortType === "status") return a.status.localeCompare(b.status);
      return 0;
    });

    return result;
  }, [todos, searchTerm, filterStatus, sortType]);

  return (
    <Box sx={{ bgcolor: "#f3f4f6", minHeight: "100vh" }}>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 4, pb: 5 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight="800" color="primary.dark">
            Quản Lý Công Việc
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Xin chào, {currentUser?.displayName || currentUser?.email}
          </Typography>
        </Box>

        <TodoForm addTodo={addTodo} />

        {/* TOOLBAR */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <TextField
            label="Tìm kiếm..."
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, bgcolor: "white" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FormControl size="small" sx={{ minWidth: 120, bgcolor: "white" }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={filterStatus}
              label="Trạng thái"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="pending">Đang làm</MenuItem>
              <MenuItem value="done">Hoàn thành</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150, bgcolor: "white" }}>
            <InputLabel>Sắp xếp</InputLabel>
            <Select
              value={sortType}
              label="Sắp xếp"
              onChange={(e) => setSortType(e.target.value)}
            >
              <MenuItem value="deadline_asc">Hạn chót (Gần nhất)</MenuItem>
              <MenuItem value="deadline_desc">Hạn chót (Xa nhất)</MenuItem>
              <MenuItem value="status">Theo Trạng thái</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* LIST */}
        <Box>
          {loading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleStatus={toggleStatus}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
          )}
        </Box>
      </Container>
    </Box>
  );
}

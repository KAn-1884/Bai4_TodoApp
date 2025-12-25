// src/components/TodoItem.jsx
// (Phần import giữ nguyên)
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Checkbox,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function TodoItem({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
}) {
  const onEditClick = () => {
    const newTitle = window.prompt("Sửa tên công việc:", todo.title);
    if (newTitle && newTitle.trim() !== "") {
      handleEdit(todo.id, newTitle);
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        display: "flex",
        alignItems: "center",
        p: 2, // Tăng padding lên cho thoáng (trước là 1)
        transition: "all 0.3s ease",
        // Hiệu ứng hover nổi nhẹ lên
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
        },
        opacity: todo.completed ? 0.6 : 1,
        // Nếu completed thì nền xám chìm, nếu chưa thì nền trắng sáng
        bgcolor: todo.completed ? "action.hover" : "background.paper",
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => toggleComplete(todo)}
        sx={{
          color: "text.secondary",
          "&.Mui-checked": { color: "primary.main" },
        }}
      />

      <CardContent sx={{ flexGrow: 1, p: "0 !important", ml: 1 }}>
        <Typography
          variant="body1"
          sx={{
            textDecoration: todo.completed ? "line-through" : "none",
            fontWeight: 600, // Chữ đậm hơn chút cho dễ đọc
            color: todo.completed ? "text.disabled" : "text.primary",
            fontSize: "1.05rem",
          }}
        >
          {todo.title}
        </Typography>

        {/* Deadline Chip */}
        <Box display="flex" alignItems="center" gap={1} mt={0.5}>
          <Chip
            icon={<CalendarTodayIcon sx={{ fontSize: "14px !important" }} />}
            label={
              todo.deadline
                ? new Date(todo.deadline.seconds * 1000).toLocaleDateString(
                    "vi-VN"
                  )
                : "Không thời hạn"
            }
            size="small"
            // Logic màu cho Chip deadline
            color={todo.completed ? "default" : "secondary"}
            variant={todo.completed ? "outlined" : "soft"} // "soft" là một biến thể nếu custom, ở đây dùng mặc định
            sx={{
              fontSize: "0.75rem",
              borderRadius: "8px",
              bgcolor: todo.completed
                ? "transparent"
                : "rgba(236, 72, 153, 0.1)", // Màu nền nhẹ cho chip
              color: todo.completed ? "inherit" : "secondary.main",
              border: "none",
            }}
          />
        </Box>
      </CardContent>

      <Box>
        <IconButton
          size="small"
          onClick={onEditClick}
          sx={{
            color: "text.secondary",
            "&:hover": { color: "primary.main", bgcolor: "primary.50" },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleDelete(todo.id)}
          sx={{
            color: "text.secondary",
            "&:hover": { color: "error.main", bgcolor: "error.50" },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
}

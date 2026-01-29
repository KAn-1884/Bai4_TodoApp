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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function TodoItem({
  todo,
  toggleStatus,
  handleDelete,
  handleEdit,
}) {
  // Kiểm tra status thay vì completed
  const isDone = todo.status === "done";

  const onEditClick = () => {
    const newText = window.prompt("Sửa nội dung:", todo.text);
    if (newText && newText.trim() !== "") {
      handleEdit(todo.id, newText);
    }
  };

  // Format ngày giờ an toàn
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("vi-VN");
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp.seconds * 1000).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card
      sx={{
        mb: 2,
        display: "flex",
        alignItems: "center",
        p: 2,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        },
        opacity: isDone ? 0.6 : 1,
        bgcolor: isDone ? "#f9fafb" : "white",
        borderLeft: isDone ? "4px solid #4caf50" : "4px solid #6366f1",
      }}
    >
      <Checkbox
        checked={isDone}
        onChange={() => toggleStatus(todo)}
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        color="success"
      />

      <CardContent sx={{ flexGrow: 1, p: "0 !important", ml: 1 }}>
        <Typography
          variant="body1"
          sx={{
            textDecoration: isDone ? "line-through" : "none",
            fontWeight: 600,
            color: isDone ? "text.disabled" : "text.primary",
          }}
        >
          {todo.text}
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mt={0.5}
          flexWrap="wrap"
        >
          {/* Hiển thị Deadline */}
          <Chip
            label={`Hạn: ${formatDate(todo.deadline)}`}
            size="small"
            variant="outlined"
            color={isDone ? "default" : "primary"}
            sx={{ fontSize: "0.7rem", height: 24 }}
          />

          {/* Hiển thị giờ hoàn thành nếu xong */}
          {isDone && todo.finishedTime && (
            <Chip
              label={`Xong lúc: ${formatTime(todo.finishedTime)}`}
              size="small"
              color="success"
              variant="soft" // Nếu lỗi variant thì xóa dòng này đi
              sx={{
                fontSize: "0.7rem",
                height: 24,
                bgcolor: "#e8f5e9",
                color: "#2e7d32",
              }}
            />
          )}
        </Box>
      </CardContent>

      <Box>
        <IconButton size="small" onClick={onEditClick}>
          <EditIcon fontSize="small" color="primary" />
        </IconButton>
        <IconButton size="small" onClick={() => handleDelete(todo.id)}>
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
      </Box>
    </Card>
  );
}

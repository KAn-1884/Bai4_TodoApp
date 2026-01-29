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
import EventBusyIcon from "@mui/icons-material/EventBusy";

export default function TodoItem({
  todo,
  toggleStatus,
  handleDelete,
  handleEdit,
}) {
  const isDone = todo.status === "done";

  // Logic kiểm tra quá hạn: Chưa xong VÀ (deadline < hiện tại)
  const isOverdue =
    !isDone &&
    todo.deadline &&
    new Date(todo.deadline.seconds * 1000) < new Date();

  const onEditClick = () => {
    const newText = window.prompt("Sửa nội dung:", todo.text);
    if (newText && newText.trim() !== "") {
      handleEdit(todo.id, newText);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp.seconds * 1000).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
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
        opacity: isDone ? 0.6 : 1,
        bgcolor: isDone ? "#f9fafb" : "white",
        // Viền: Xanh (Done) - Đỏ (Quá hạn) - Tím (Bình thường)
        borderLeft: isDone
          ? "4px solid #4caf50"
          : isOverdue
            ? "4px solid #f44336"
            : "4px solid #6366f1",
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
            color: isDone
              ? "text.disabled"
              : isOverdue
                ? "error.main"
                : "text.primary",
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
          <Chip
            icon={isOverdue ? <EventBusyIcon /> : undefined}
            label={`${isOverdue ? "Quá hạn: " : "Hạn: "} ${formatDate(todo.deadline)}`}
            size="small"
            variant={isOverdue ? "filled" : "outlined"}
            color={isOverdue ? "error" : "default"}
            sx={{ fontSize: "0.7rem", height: 24 }}
          />

          {isDone && todo.finishedTime && (
            <Chip
              label={`Xong: ${formatDate(todo.finishedTime)}`}
              size="small"
              color="success"
              variant="outlined"
              sx={{
                fontSize: "0.7rem",
                height: 24,
                bgcolor: "#e8f5e9",
                borderColor: "transparent",
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

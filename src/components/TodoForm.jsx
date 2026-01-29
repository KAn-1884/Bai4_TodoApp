import { useState } from "react";
import { Paper, TextField, Button, Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function TodoForm({ addTodo }) {
  const [text, setText] = useState("");
  // Mặc định Deadline là ngày mai
  const [deadline, setDeadline] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // Format YYYY-MM-DDTHH:mm cho input type="datetime-local"
    return d.toISOString().slice(0, 16);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Truyền text và Date object ra ngoài
    addTodo(text, new Date(deadline));
    setText("");
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: 2, mb: 4, borderRadius: 2, border: "1px solid #e0e0e0" }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Nhập nội dung công việc..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              size="small"
              required
              sx={{ bgcolor: "white" }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Hạn chót"
              size="small"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              sx={{ bgcolor: "white" }}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              type="submit"
              size="medium"
              disableElevation
              sx={{ height: "40px" }}
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

import { useState } from "react";
import { Paper, TextField, Button, Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Nhận vào prop 'addTodo' là một hàm từ cha truyền xuống
export default function TodoForm({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text); // Gọi hàm thêm (logic sẽ viết sau)
    setText(""); // Reset ô nhập
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              variant="outlined"
              label="Bạn định làm gì hôm nay?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              type="submit"
              size="large"
              sx={{ height: "100%" }}
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

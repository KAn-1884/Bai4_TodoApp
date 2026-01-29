import { useState } from "react";
import { Paper, TextField, Button, Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function TodoForm({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: 2, mb: 4, borderRadius: 2, border: "1px solid #e0e0e0" }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Nhập nội dung công việc..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              size="small"
              sx={{ bgcolor: "white" }}
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

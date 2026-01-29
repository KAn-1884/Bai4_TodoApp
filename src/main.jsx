import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Import Theme vừa tạo
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme"; // <-- File theme.js

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Cung cấp Theme cho toàn bộ App */}
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset CSS chuẩn theo Theme */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

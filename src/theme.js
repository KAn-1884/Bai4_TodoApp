// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // 1. BẢNG MÀU (Palette) - Dịu mắt hơn
  palette: {
    primary: {
      main: "#6366f1", // Màu Indigo mềm mại (giống Tailwind)
      light: "#818cf8",
      dark: "#4f46e5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ec4899", // Màu hồng pastel tạo điểm nhấn
    },
    background: {
      default: "#f3f4f6", // Màu nền xám xanh cực nhạt
      paper: "#ffffff",
    },
    text: {
      primary: "#1f2937", // Màu chữ xám đậm (không dùng đen tuyền)
      secondary: "#6b7280", // Màu chữ phụ xám nhạt
    },
  },

  // 2. BO GÓC (Shape) - Mềm mại hơn
  shape: {
    borderRadius: 16, // Bo góc 16px cho tất cả (Card, Button, Input)
  },

  // 3. TYPOGRAPHY - Font chữ dễ chịu
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: "none", // Bỏ viết hoa toàn bộ ở Button
      fontWeight: 600,
    },
    h4: {
      fontWeight: 700,
      color: "#3730a3", // Tiêu đề màu đậm hơn chút
    },
  },

  // 4. COMPONENT OVERRIDES - Chỉnh chi tiết từng thành phần
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none", // Bỏ bóng mặc định của nút
          borderRadius: 30, // Nút bo tròn hình viên thuốc
          padding: "10px 20px",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)", // Hover mới hiện bóng mờ
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)", // Bóng rất nhạt, tinh tế
          border: "1px solid rgba(0,0,0,0.05)", // Viền siêu mỏng
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // Fix lỗi nền tối trên một số mode
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#f9fafb", // Nền ô input hơi xám nhẹ để dịu mắt
            "& fieldset": {
              borderColor: "#e5e7eb", // Viền nhạt
            },
            "&:hover fieldset": {
              borderColor: "#6366f1", // Hover đổi màu primary
            },
          },
        },
      },
    },
  },
});

export default theme;

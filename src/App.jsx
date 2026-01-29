import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute"; // Nhớ import PrivateRoute

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Route Login */}
          <Route path="/login" element={<Login />} />

          {/* Route được bảo vệ (Dashboard) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

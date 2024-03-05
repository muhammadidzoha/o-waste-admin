import { Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

  return (
    <Routes>
      <Route
        path="admin/*"
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }
      />
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default App;

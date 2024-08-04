import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import NotFound from "@/pages/NotFound";
import NoUserRoute from "@/layouts/NoUserRoute";
import ProtectedRoutes from "@/layouts/ProtectedLayout";
import Login from "@/pages/Login";
import Home from "@/pages/Home";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/login" element={<NoUserRoute />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

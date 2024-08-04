import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Route, Routes } from "react-router-dom";
import Login from "@/pages/Login";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { AuthProvider } from "@/hooks/useAuth";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="fixed bottom-6 right-6">
          <ModeToggle />
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <h1>Hello routing</h1>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

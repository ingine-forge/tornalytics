import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const ProtectedRoutes = () => {
  const { apiKey, logout } = useAuth();

  if (!apiKey) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    <Navigate to="/login" />;
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col items-center justify-center gap-3">
        <Button variant="outline" size="icon" onClick={handleLogout}>
          <LogOut />
        </Button>
        <ModeToggle />
      </div>

      <Outlet />
    </>
  );
};

export default ProtectedRoutes;

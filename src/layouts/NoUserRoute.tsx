import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const NoUserRoute = () => {
  const { apiKey } = useAuth();

  if (apiKey) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="fixed bottom-6 right-6">
        <ModeToggle />
      </div>
      <Outlet />
    </>
  );
};

export default NoUserRoute;

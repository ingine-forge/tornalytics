import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface AuthContextType {
  apiKey: string | null;
  login: (data: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiKey, setApiKey] = useLocalStorage<string | null>("apiKey", null);
  const navigate = useNavigate();

  const login = async (data: string) => {
    setApiKey(data);
    navigate("/");
  };

  const logout = () => {
    setApiKey(null);
    navigate("/", { replace: true });
  };

  const value = useMemo<AuthContextType>(
    () => ({
      apiKey,
      login,
      logout,
    }),
    [apiKey]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface AuthContextType {
  apiKey: APIKey | null;
  login: (data: APIKey, user: User) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiKey, setApiKey] = useLocalStorage<APIKey | null>("apiKey", null);
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const navigate = useNavigate();

  const login = async (data: APIKey, user: User) => {
    setApiKey(data);
    setUser(user);
    navigate("/");
  };

  const logout = () => {
    setApiKey(null);
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo<AuthContextType>(
    () => ({
      apiKey,
      user,
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

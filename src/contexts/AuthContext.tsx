import * as React from "react";

type User = {
  user: string;
} | null;

interface AuthContextProps {
  user: User;
  login: (userData: string | undefined) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  login: (userData: string | undefined) => {},
  logout: () => {},
});

const AuthProvider: React.FC<React.ReactNode | any> = ({ children }) => {
  const [user, setUser] = React.useState<User>(null);

  const login = (userData: string | undefined) => {
    setUser(userData ? { user: userData } : null);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

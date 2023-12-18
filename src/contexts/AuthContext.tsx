import * as React from "react";

type User = {
  user: string;
};

interface AuthContextProps {
  user: User | null;
  login: (userData: string | null) => void; // Adjust the login function type
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  login: (userData: string | null) => {},
  logout: () => {},
});

const AuthProvider: React.FC<React.ReactNode | any> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const login = (userData: string | null) => {
    // Assuming that userData is a string representing the username
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

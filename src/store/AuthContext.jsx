import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    // Check for admin login
    if (email === "admin@example.com" && password === "Admin123") {
      const adminUser = {
        email: "admin@example.com",
        role: "admin",
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      return { success: true, role: "admin" };
    }

    // Check for regular user login
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      const userData = {
        email: user.email,
        role: user.role,
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return { success: true, role: "user" };
    }

    return { success: false, message: "Invalid credentials" };
  };

  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      return { success: false, message: "User already exists" };
    }

    // Create new user
    const newUser = {
      email,
      password,
      role: "user",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto login after registration
    const userData = {
      email: newUser.email,
      role: newUser.role,
    };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("currentUser", JSON.stringify(userData));

    return { success: true, role: "user" };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  const contextValue = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}; 
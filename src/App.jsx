import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import MainLayout from "./Layout/MainLayout.jsx";
import AuthLayout from "./Layout/AuthLayout.jsx";
import Menu from "./menu/Menu.jsx";
import AdminPage from "./components/admin/AdminPage.jsx";
import AdminSidebar from "./Components/admin/AdminSideBar.jsx";
import LoginPage from "./Components/auth/Login.jsx";
import Content from "./Components/content/Content.jsx";
import AboutUs1 from "./components/aboutus/AboutUs1.jsx";
import AboutUs2 from "./components/aboutus/AboutUs2.jsx";
import { AuthContextProvider, AuthContext } from "./store/AuthContext";

// Protected Route component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Content />
            </MainLayout>
          }
        />
        <Route
          path="/menu"
          element={
            <MainLayout>
              <Menu />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AuthLayout>
                <AdminSidebar>
                  <AdminPage />
                </AdminSidebar>
              </AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/aboutus/1"
          element={
            <MainLayout>
              <AboutUs1/>
            </MainLayout>
          }
        />
        <Route
          path="/aboutus/2"
          element={
            <MainLayout>
              <AboutUs2/>
            </MainLayout>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;

//Email: admin@example.com
//Password: Admin123
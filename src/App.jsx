import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout.jsx";
import AuthLayout from "./Layout/AuthLayout.jsx";
import Menu from "./menu/Menu.jsx";
import AdminPage from "./components/admin/AdminPage.jsx";
import AdminSidebar from "./Components/admin/AdminSideBar.jsx";
import LoginPage from "./Components/auth/Login.jsx";
import Content from "./Components/content/Content.jsx";

function App() {
  return (
    <>
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
            <AuthLayout>
              <AdminSidebar>
                <AdminPage />
              </AdminSidebar>
            </AuthLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;

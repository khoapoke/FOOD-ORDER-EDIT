import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout.jsx";
import AuthLayout from "./Layout/AuthLayout.jsx";
import Menu from "./menu/Menu.jsx";
import AdminPage from "./Components/admin/AdminPage.jsx";
import AdminSidebar from "./Components/admin/AdminSideBar.jsx";
import LoginPage from "./Components/auth/Login.jsx";
import Content from "./Components/content/Content.jsx";
import AboutUs1 from "./aboutus/AboutUs1.jsx";
import AboutUs2 from "./aboutus/AboutUs2.jsx";
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
        <Route
          path="/aboutus/1"
          element={
            <MainLayout>
              <AboutUs1 />
            </MainLayout>
          }
        />

        <Route
          path="/aboutus/2"
          element={
            <MainLayout>
              <AboutUs2 />
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;

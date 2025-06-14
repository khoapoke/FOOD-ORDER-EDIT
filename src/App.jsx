import { Routes, Route, Outlet } from "react-router-dom";
import MainLayout from "./Layout/MainLayout.jsx";
import AuthLayout from "./Layout/AuthLayout.jsx";
import Menu from "./menu/Menu.jsx";
import MealDetail from "./menu/MealDetail.jsx";
import AdminSidebar from "./Components/admin/AdminSideBar.jsx";
import AdminPage from "./Components/admin/AdminPage.jsx";
import LoginPage from "./Components/auth/Login.jsx";
import Content from "./Components/content/Content.jsx";
import AboutUs1 from "./aboutus/AboutUs1.jsx";
import AboutUs2 from "./aboutus/AboutUs2.jsx";
import Profile from "./components/profile/Profile.jsx";
import Checkout from "./components/checkout/Checkout.jsx";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
// Import các trang admin mới
import Dashboard from "./Pages/admin/Dashboard.jsx";
import Users from "./Pages/admin/Users.jsx";
import Products from "./Pages/admin/Products.jsx";
import Orders from "./Pages/admin/Orders.jsx";
import Statistics from "./Pages/admin/Statistics.jsx";
import Settings from "./Pages/admin/Settings.jsx";

function AdminLayout() {
  return (
    <AuthLayout>
      <AdminSidebar>
        <Outlet />
      </AdminSidebar>
    </AuthLayout>
  );
}

function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
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
            path="/menu/:id"
            element={
              <MainLayout>
                <MealDetail />
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
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Trang quản lý đồ ăn cũ */}
            <Route path="foods" element={<AdminPage />} />
            {/* Các trang admin mới */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="settings" element={<Settings />} />
            {/* Redirect /admin to /admin/foods */}
            <Route index element={<AdminPage />} />
          </Route>
          <Route
            path="/profile"
            element={
              <MainLayout>
                <Profile />
              </MainLayout>
            }
          />
          <Route
            path="/checkout"
            element={
              <MainLayout>
                <Checkout />
              </MainLayout>
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
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;

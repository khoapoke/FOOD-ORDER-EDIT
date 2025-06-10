import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Content from "./components/content/Content.jsx";
import AdminPage from "./components/admin/AdminPage.jsx";
import AboutUs1 from "./aboutus/AboutUs1.jsx";
import AboutUs2 from "./aboutus/AboutUs2.jsx";
import Menu from "./menu/Menu.jsx";
import Login from "./components/auth/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Content />
            <Footer />
          </>
        } />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/aboutus/1" element={<AboutUs1/>}/>
        <Route path="/aboutus/2" element={<AboutUs2/>}/>
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import "./adminSideBar.css";
const AdminDashboard = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isClose, setIsClose] = useState(false);

  const handleModeSwitch = () => {
    setIsDark(!isDark);
  };

  const handleToggle = () => {
    setIsClose(!isClose);
  };

  return (
    <div className={`admin-sidebar ${isDark ? "dark" : ""}`}>
      <nav className={`menu__sidebar ${isClose ? "close" : ""}`}>
        <div className="menu__sidebar-header">
          <div className="admin__logo">
            <i className="fa-regular fa-circle-user icon-style"></i>
            <div className="text">
              <span>Admin</span>
            </div>
          </div>
          <i
            className="fa-solid fa-chevron-left toggle-close-open-sidebar"
            onClick={handleToggle}
            
          ></i>
        </div>
        <div className="menu__sidebar-section">
          <div className="menu__sidebar-btn">
            <div className="search-box btn-item">
              <i className="fa-solid fa-magnifying-glass icon"></i>
              <input className="" type="search" placeholder="Search for" />
            </div>
            <div className="menu-list">
              <div className="btn-item">
                <a className="btn-link" href="#">
                  <i className="fa-solid fa-house icon"></i>
                  <span className="text">Dashboard</span>
                </a>
              </div>
              <div className="btn-item">
                <a className="btn-link" href="#">
                  <i className="fa-solid fa-user icon"></i>
                  <span className="text">Users</span>
                </a>
              </div>
              <div className="btn-item">
                <a className="btn-link" href="#">
                  <i className="fa-solid fa-box icon"></i>
                  <span className="text">Products</span>
                </a>
              </div>
              <div className="btn-item">
                <a className="btn-link" href="#">
                  <i className="fa-solid fa-cart-shopping icon"></i>
                  <span className="text">Orders</span>
                </a>
              </div>
              <div className="btn-item">
                <a className="btn-link" href="#">
                  <i className="fa-solid fa-chart-simple icon"></i>
                  <span className="text">Statistical & Reports</span>
                </a>
              </div>
              <div className="btn-item">
                <a className="btn-link" href="#">
                  <i className="fa-solid fa-gear icon"></i>
                  <span className="text">Settings</span>
                </a>
              </div>
            </div>
          </div>
          <div className="menu__sidebar-bottom">
            <div className="logout btn-item">
              <a className="btn-link" href="#">
                <i className="fa-solid fa-right-from-bracket icon"></i>
                <span className="text">Log out</span>
              </a>
            </div>
            <div className="mode btn-item">
              <div className="moon-sun">
                <i className="fa-solid fa-moon icon moon"></i>
                <i className="fa-solid fa-sun icon sun"></i>
              </div>
              <span className="text mode-text">
                {isDark ? "Light mode" : "Dark mode"}
              </span>
              <div className="toggle-switch" onClick={handleModeSwitch}>
                <span className="switch"></span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="main-admin">{children}</div>
    </div>
  );
};

export default AdminDashboard;

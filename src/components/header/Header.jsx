import { useState } from "react";

import "./header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const openSidebar = () => {
    setIsOpen(true);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <header id="main-header">
      <button className="open_sidebar-button" onClick={openSidebar}>
        <img src="/img/Menu_bar.png" alt="" height="40px" width="40px" />
      </button>
      <nav id="navbar_header-home" className={isOpen ? "show" : ""}>
        <button className="close_sidebar-button" onClick={closeSidebar}>
          <img src="/img/close.png" alt="" height="40px" width="40px" />
        </button>
        <ul className="header_list">
          <li className="home">
            <a href="#">
              <div className="title">
                <img src="/img/logo.jpg" />
                <p>Restaurant</p>
              </div>
            </a>
          </li>
          <li>
            <a className="header_list-item" href="/menu">
              Meals
            </a>
          </li>
          <li>
            <a className="header_list-item" href="/about">
              About Us
            </a>
          </li>

          <li>
            <button className="button">Cart</button>
          </li>
          <li>
            <a className="header_list-item" href="/login">
              Sign In
            </a>
          </li>
        </ul>
      </nav>
      <div id="overlay"></div>
    </header>
  );
}

export default Header;

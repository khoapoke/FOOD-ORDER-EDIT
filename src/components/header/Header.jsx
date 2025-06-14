import { useState, useContext, useEffect, useRef } from "react";
import { CartContext } from "../../store/CartContext";
import UserProgressContext from "../../store/UserProgressContext";
import { currencyFormatter } from "../../util/formatting";
import { useNavigate, Link } from "react-router-dom";
import "./header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const prevCartItemsRef = useRef(0);
  const cartRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalCartItems = cartCtx.items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartCtx.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    if (totalCartItems > prevCartItemsRef.current) {
      setCartUpdated(true);
      const timer = setTimeout(() => setCartUpdated(false), 500);
      return () => clearTimeout(timer);
    }
    prevCartItemsRef.current = totalCartItems;
  }, [totalCartItems]);

  const handleShowCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleShowCheckout = () => {
    userProgressCtx.showCheckout();
    setIsCartOpen(false);
  };

  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsUserMenuOpen(false);
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
            <Link to="/">
              <div className="title">
                <img src="/img/logo.jpg" alt="Restaurant Logo" />
                <p>Restaurant</p>
              </div>
            </Link>
          </li>
          <li>
            <a className="header_list-item" href="/menu">
              Meals
            </a>
          </li>
          <li className="dropdown mb-2">
            <a
              className="dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              href="/menu"
            >
              About Us
            </a>
            <ul className="dropdown-menu bg-dark">
              <li>
                <a className="dropdown-item my-3" href="/aboutus/1">
                  bussiness story
                </a>
              </li> 
              <li>
                <a className="dropdown-item my-3" href="/aboutus/2">
                  About us story
                </a>
              </li>
              <li>
                <a className="dropdown-item my-3" href="/ChatBox/TesrChatBox.html">
                  Chatbox
                </a>
              </li>
            </ul>
          </li>

          <li className="cart-container" ref={cartRef}>
            <button className={`button ${cartUpdated ? 'bump' : ''}`} onClick={handleShowCart}>
              Cart ({totalCartItems})
            </button>
            {isCartOpen && (
              <div className="cart-dropdown">
                <h3>Your Cart</h3>
                {cartCtx.items.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <>
                    <ul className="cart-items">
                      {cartCtx.items.map((item) => (
                        <li key={item.id} className="cart-item">
                          <div className="cart-item-info">
                            <span className="cart-item-name">{item.name}</span>
                            <span className="cart-item-price">{currencyFormatter.format(item.price)}</span>
                          </div>
                          <div className="cart-item-actions">
                            <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => cartCtx.addItem(item)}>+</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="cart-total">
                      <span>Total:</span>
                      <span>{currencyFormatter.format(cartTotal)}</span>
                    </div>
                    <div className="cart-actions">
                      <button className="button" onClick={handleShowCheckout}>
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </li>
          <li className="user-menu-container" ref={userMenuRef}>
            {currentUser ? (
              <>
                <button className="user-menu-button" onClick={handleUserMenuClick}>
                  {currentUser.email}
                </button>
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <button onClick={handleProfileClick}>Profile</button>
                    <button onClick={handleSignOut}>Sign Out</button>
                  </div>
                )}
              </>
            ) : (
              <a className="header_list-item" href="/login">
                Sign In
              </a>
            )}
          </li>
        </ul>
      </nav>
      <div id="overlay"></div>
    </header>
  );
}

export default Header;

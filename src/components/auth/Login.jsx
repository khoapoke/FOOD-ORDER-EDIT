import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/AuthContext";
import Toast from "../ui/Toast"
import "./Login.css";

export default function Login() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext);
  const emailInputRef = useRef(null);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});

  useEffect(() => {
    // Auto-focus email input when form opens
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isActive]);

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'error' });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 6) return false;
    
    const hasUpperCase = /[A-Z]/.test(password);
    
    const hasNumber = /[0-9]/.test(password);
    
    return hasUpperCase && hasNumber;
  };

  const getPasswordErrorMessage = (password) => {
    if (!password) return 'Mật khẩu là bắt buộc';
    if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
    if (!/[A-Z]/.test(password)) return 'Mật khẩu phải có ít nhất 1 chữ hoa';
    if (!/[0-9]/.test(password)) return 'Mật khẩu phải có ít nhất 1 số';
    return '';
  };

  const handleLoginSubmit = async () => {
    const errors = {};
    if (!loginData.email) {
      errors.email = 'Email là bắt buộc';
    } else if (!validateEmail(loginData.email)) {
      errors.email = 'Email không hợp lệ';
    }
    if (!loginData.password) {
      errors.password = 'Mật khẩu là bắt buộc';
    } else if (!validatePassword(loginData.password)) {
      errors.password = getPasswordErrorMessage(loginData.password);
    }
    setLoginErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        const result = login(loginData.email, loginData.password);
        if (result.success) {
          showToast('Login successful!', 'success');
          setTimeout(() => {
            if (result.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          }, 1000);
        } else {
          showToast('Email or password is incorrect');
        }
      } catch (error) {
        showToast('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRegisterSubmit = async () => {
    const errors = {};
    if (!registerData.email) {
      errors.email = 'Email là bắt buộc';
    } else if (!validateEmail(registerData.email)) {
      errors.email = 'Email không hợp lệ';
    }
    if (!registerData.password) {
      errors.password = 'Mật khẩu là bắt buộc';
    } else if (!validatePassword(registerData.password)) {
      errors.password = getPasswordErrorMessage(registerData.password);
    }
    if (!registerData.confirmPassword) {
      errors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    setRegisterErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        const result = register(registerData.email, registerData.password);
        if (result.success) {
          showToast('Registration successful!', 'success');
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          showToast(result.message);
        }
      } catch (error) {
        showToast('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (e, isLogin = true) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData(prev => ({ ...prev, [name]: value }));
      if (loginErrors[name]) {
        setLoginErrors(prev => ({ ...prev, [name]: '' }));
      }
    } else {
      setRegisterData(prev => ({ ...prev, [name]: value }));
      if (registerErrors[name]) {
        setRegisterErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
    hideToast();
  };

  const handleKeyPress = (e, submitFunction) => {
    if (e.key === 'Enter') {
      submitFunction();
    }
  };

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
      <div className={`container${isActive ? " active" : ""}`} id="container">
        {/* Register Form */}
        <div className="form-container sign-up">
          <form>
            <h1>Tạo tài khoản</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-solid fa-envelope"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            </div>
            <span className="text-muted">Sử dụng gmail để đăng ký</span>
  
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => handleInputChange(e, false)}
              onKeyDown={(e) => handleKeyPress(e, handleRegisterSubmit)}
              required
            />
            {registerErrors.email && <span className="error-message">{registerErrors.email}</span>}
  
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={registerData.password}
              onChange={(e) => handleInputChange(e, false)}
              onKeyDown={(e) => handleKeyPress(e, handleRegisterSubmit)}
              required
            />
            {registerErrors.password && <span className="error-message">{registerErrors.password}</span>}
  
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={registerData.confirmPassword}
              onChange={(e) => handleInputChange(e, false)}
              onKeyDown={(e) => handleKeyPress(e, handleRegisterSubmit)}
              required
            />
            {registerErrors.confirmPassword && <span className="error-message">{registerErrors.confirmPassword}</span>}
  
            <button 
              type="button" 
              onClick={handleRegisterSubmit}
              disabled={isLoading}
              className={isLoading ? 'loading' : ''}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Đang xử lý...
                </>
              ) : (
                'Đăng ký'
              )}
            </button>
          </form>
        </div>
  
        {/* Login Form */}
        <div className="form-container sign-in">
          <form>
            <h1>Đăng nhập</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-solid fa-envelope"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            </div>
            <span className="text-muted">Sử dụng gmail để đăng nhập</span>
  
            <input
              ref={emailInputRef}
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => handleInputChange(e, true)}
              onKeyDown={(e) => handleKeyPress(e, handleLoginSubmit)}
              required
            />
            {loginErrors.email && <span className="error-message">{loginErrors.email}</span>}
  
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={loginData.password}
              onChange={(e) => handleInputChange(e, true)}
              onKeyDown={(e) => handleKeyPress(e, handleLoginSubmit)}
              required
            />
            {loginErrors.password && <span className="error-message">{loginErrors.password}</span>}
  
            <a href="#">Quên mật khẩu?</a>
            <button 
              type="button" 
              onClick={handleLoginSubmit}
              disabled={isLoading}
              className={isLoading ? 'loading' : ''}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Đang xử lý...
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>
        </div>
  
        {/* Toggle Panels */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Chào mừng quay trở lại!</h1>
              <p>Đăng nhập để sử dụng</p>
              <button className="hidden" type="button" onClick={() => setIsActive(false)}>Đăng nhập</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Chào bạn!</h1>
              <p>Đăng ký để sử dụng</p>
              <button className="hidden" type="button" onClick={() => setIsActive(true)}>Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [isActive, setIsActive] = useState(false);
  
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

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    if (loginErrors[name]) {
      setLoginErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLoginSubmit = () => {
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
      console.log('Đăng nhập thành công:', loginData);
      alert('Đăng nhập thành công!\nEmail: ' + loginData.email);
      setLoginData({ email: '', password: '' });
    }
  };
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRegisterSubmit = () => {
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
      console.log('Đăng ký thành công:', registerData);
      alert('Đăng ký thành công!\nEmail: ' + registerData.email);
      setRegisterData({ email: '', password: '', confirmPassword: '' });
    }
  };

  const handleKeyPress = (e, submitFunction) => {
    if (e.key === 'Enter') {
      submitFunction();
    }
  };
  return (
    <>
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
              onChange={handleRegisterChange}
              onKeyDown={(e) => handleKeyPress(e, handleRegisterSubmit)}
              required
            />
            {registerErrors.email && <span style={{ color: "red", fontSize: "12px" }}>{registerErrors.email}</span>}
  
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={registerData.password}
              onChange={handleRegisterChange}
              onKeyDown={(e) => handleKeyPress(e, handleRegisterSubmit)}
              required
            />
            {registerErrors.password && <span style={{ color: "red", fontSize: "12px" }}>{registerErrors.password}</span>}
  
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              onKeyDown={(e) => handleKeyPress(e, handleRegisterSubmit)}
              required
            />
            {registerErrors.confirmPassword && <span style={{ color: "red", fontSize: "12px" }}>{registerErrors.confirmPassword}</span>}
  
            <button type="button" onClick={handleRegisterSubmit}>Đăng ký</button>
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
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              onKeyDown={(e) => handleKeyPress(e, handleLoginSubmit)}
              required
            />
            {loginErrors.email && <span style={{ color: "red", fontSize: "12px" }}>{loginErrors.email}</span>}
  
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={loginData.password}
              onChange={handleLoginChange}
              onKeyDown={(e) => handleKeyPress(e, handleLoginSubmit)}
              required
            />
            {loginErrors.password && <span style={{ color: "red", fontSize: "12px" }}>{loginErrors.password}</span>}
  
            <a href="#">Quên mật khẩu?</a>
            <button type="button" onClick={handleLoginSubmit}>Đăng nhập</button>
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

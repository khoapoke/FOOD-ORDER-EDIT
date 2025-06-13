import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className={`container${isActive ? " active" : ""}`} id="container">
        {/* Register Form */}
        <div className="form-container sign-up">
          <form>
            <h1>Tạo tài khoản</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
            <span className="text-muted">Sử dụng gmail để đăng ký</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mật khẩu" />
            <input type="password" placeholder="Xác nhận mật khẩu" />
            <button type="button">Đăng ký</button>
          </form>
        </div>

        {/* Login Form */}
        <div className="form-container sign-in">
          <form>
            <h1>Đăng nhập</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>
            <span className="text-muted">Sử dụng gmail để đăng nhập</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Mật khẩu" />
            <a href="#">Quên mật khẩu?</a>
            <button type="button">Đăng nhập</button>
          </form>
        </div>

        {/* Toggle Panels */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Chào mừng quay trở lại!</h1>
              <p>Đăng nhập để sử dụng</p>
              <button
                className="hidden"
                type="button"
                onClick={() => setIsActive(false)}
              >
                Đăng nhập
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Chào bạn!</h1>
              <p>Đăng ký để sử dụng</p>
              <button
                className="hidden"
                type="button"
                onClick={() => setIsActive(true)}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

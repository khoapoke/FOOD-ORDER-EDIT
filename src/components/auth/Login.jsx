import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [isActive, setIsActive] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z]).{6,}$/;

  const handleRegister = () => {
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (registerData.email.trim() === "") {
      newErrors.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(registerData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (registerData.password.trim() === "") {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (!passwordRegex.test(registerData.password)) {
      newErrors.password = "Mật khẩu phải ít nhất 6 ký tự và có 1 chữ in hoa";
    }

    if (registerData.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((e) => e === "");
    if (isValid) {
      alert("Đăng ký thành công");
      // Gửi dữ liệu lên server ở đây............
    }
  };
  const handleLogin = () => {
    const newErrors = { email: "", password: "" };

    if (loginData.email.trim() === "") {
      newErrors.email = "vui lòng nhập đẩy đủ thông tin";
    } else if (!emailRegex.test(loginData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (loginData.password.trim() === "") {
      newErrors.password = "Mật khẩu không được để trống";
    }

    setLoginErrors(newErrors);

    const isValid = Object.values(newErrors).every((e) => e === "");
    if (isValid) {
      alert("Đăng nhập thành công");
      // Thực hiện xử lý tiếp theo ở đây
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
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            {errors.email && (
              <span className="errors-text" style={{ color: "red" }}>
                {errors.email}
              </span>
            )}
            <input
              type="password"
              placeholder="Mật khẩu"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            {errors.password && (
              <span className="errors-text" style={{ color: "red" }}>
                {errors.password}
              </span>
            )}
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={registerData.confirmPassword}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  confirmPassword: e.target.value,
                })
              }
            />
            {errors.confirmPassword && (
              <span className="errors-text" style={{ color: "red" }}>
                {errors.confirmPassword}
              </span>
            )}
            <button type="button" onClick={handleRegister}>
              Đăng ký
            </button>
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

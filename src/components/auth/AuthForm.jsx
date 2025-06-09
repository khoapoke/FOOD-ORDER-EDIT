import { useState, useEffect } from "react";
import { Form, Link, useSearchParams, useActionData, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./AuthForm.css";

const loginSchema = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup.string().required("Mật khẩu là bắt buộc"),
});

const registerSchema = yup.object({
  fullName: yup.string().required("Họ tên là bắt buộc").min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
    .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 số")
    .matches(/[^A-Za-z0-9]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"),
  confirmPassword: yup
    .string()
    .required("Xác nhận mật khẩu là bắt buộc")
    .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
    .optional(),
  terms: yup
    .boolean()
    .oneOf([true], "Bạn phải đồng ý với điều khoản sử dụng")
    .required("Bạn phải đồng ý với điều khoản sử dụng"),
});

const AuthForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
    mode: "onChange",
  });

  const password = watch("password");

  useEffect(() => {
    if (password) {
      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [password]);

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1:
        return "#ff4444";
      case 2:
        return "#ffbb33";
      case 3:
        return "#00C851";
      case 4:
        return "#007E33";
      default:
        return "#ccc";
    }
  };

  // Handler chuyển đổi giữa login/signup
  const handleToggle = (mode) => {
    setSearchParams({ mode });
  };

  return (
    <div className={`container${!isLogin ? " right-panel-active" : ""}`} id="container">
      <div className="form-container sign-up-container">
        <Form method="post" onSubmit={handleSubmit}>
          <h1>Tạo tài khoản</h1>
          <span>Sử dụng email để đăng ký</span>
          {data?.error && !isLogin && <p className="error">{data.error}</p>}
          <div className="form-group">
            <input
              type="text"
              placeholder="Họ và tên"
              {...register("fullName")}
              className={errors.fullName ? "error" : ""}
            />
            {errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </div>
          <div className="form-group">
            <input
              type="tel"
              placeholder="Số điện thoại (tùy chọn)"
              {...register("phone")}
              className={errors.phone ? "error" : ""}
            />
            {errors.phone && <span className="error-text">{errors.phone.message}</span>}
          </div>
          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              {...register("password")}
              className={errors.password ? "error" : ""}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
            {errors.password && <span className="error-text">{errors.password.message}</span>}
            {!isLogin && password && (
              <div className="password-strength">
                <div
                  className="strength-bar"
                  style={{
                    width: `${(passwordStrength / 4) * 100}%`,
                    backgroundColor: getPasswordStrengthColor(),
                  }}
                />
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword.message}</span>
            )}
          </div>
          {!isLogin && (
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="terms"
                {...register("terms")}
                className={errors.terms ? "error" : ""}
              />
              <label htmlFor="terms">
                Tôi đồng ý với <Link to="/terms">điều khoản sử dụng</Link>
              </label>
              {errors.terms && <span className="error-text">{errors.terms.message}</span>}
            </div>
          )}
          <button type="submit" className={isSubmitting ? "loading" : ""}>
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : (
              "Đăng ký"
            )}
          </button>
        </Form>
      </div>
      <div className="form-container sign-in-container">
        <Form method="post" onSubmit={handleSubmit}>
          <h1>Đăng nhập</h1>
          <span>Sử dụng email để đăng nhập</span>
          {data?.error && isLogin && <p className="error">{data.error}</p>}
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </div>
          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              {...register("password")}
              className={errors.password ? "error" : ""}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
            {errors.password && <span className="error-text">{errors.password.message}</span>}
          </div>
          <div className="form-group checkbox-group">
            <input type="checkbox" id="remember" {...register("remember")} />
            <label htmlFor="remember">Ghi nhớ đăng nhập</label>
          </div>
          <button type="submit" className={isSubmitting ? "loading" : ""}>
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : (
              "Đăng nhập"
            )}
          </button>
          <Link to="/auth?mode=forgot-password" className="forgot-password">
            Quên mật khẩu?
          </Link>
        </Form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Chào mừng quay trở lại!</h1>
            <p>Đăng nhập để sử dụng</p>
            <button className="toggle-btn" onClick={() => handleToggle("login")}>Đăng nhập</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Chào bạn!</h1>
            <p>Đăng ký để sử dụng</p>
            <button className="toggle-btn" onClick={() => handleToggle("signup")}>Đăng ký</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

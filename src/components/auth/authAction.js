// components/auth/authAction.js
import { redirect } from "react-router-dom";

const BASE_URL = "http://localhost:3000/auth"; // Backend URL

const authAction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Kiểm tra xem đang ở chế độ login hay signup qua URL
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode") || "login";

  const endpoint = mode === "signup" ? "/register" : "/login";

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    // Nếu login thành công => lưu token vào localStorage
    if (mode === "login") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return redirect("/");
  } catch (err) {
    console.error("Auth error:", err.message);
    return { error: err.message };
  }
};

export default authAction;

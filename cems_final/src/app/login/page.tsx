"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../../styles/login.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Login Successful!");
        console.log("✅ Login Success:", data);

        // ✅ Normalize role (in case backend sends 'participant')
        let role = data.role;
        if (role === "participant") role = "user";

        // ✅ Save in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", data.email);

        // ✅ Full page reload to trigger useAuth hooks correctly
        if (role === "admin") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/dashboard/user";
        }
      } else {
        alert("❌ " + data.message);
        console.log("❌ Login Failed:", data);
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="form-card">
        <h2 className="form-title">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <p className="forgot-password">
          <Link href="/forgot-password">Forgot Password?</Link>
          </p>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "SUBMIT"}
          </button>
        </form>
        <p className="register-link">
          Need an account? <Link href="/register">Click here to Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
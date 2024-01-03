import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
      // If logged in, redirect away from the login page
      navigate("/MyMovie");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Predefined user data
    const predefinedEmail = "admin@admin.com";
    const predefinedPassword = "admin123";
    const predefinedId = 1;

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Check if the email and password fields are not empty
    if (!email || !password) {
      if (!email) setEmailError("Please enter your email.");
      if (!password) setPasswordError("Please enter your password.");
      return;
    }

    // Check if the entered values match the predefined values
    if (email === predefinedEmail && password === predefinedPassword) {
      // If email and password match, set loggedIn status and redirect
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("userId", predefinedId); // Store user ID in localStorage
      navigate("/MyMovie");
    } else {
      setEmailError("Invalid email");
      setPasswordError("Invalid password");
    }
  };

  return (
    <div className="logincontainer">
      <div className="cont2">
        <h1>Sign In</h1>
        <form onSubmit={handleLogin} className="formClassLogin">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="errorText">{emailError}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="errorText">{passwordError}</p>}
          <div className="checkcont">
            <input type="checkbox" name="rc" id="" />
            <label className="rm" htmlFor="rc">
              Remember Me
            </label>
          </div>
          <button type="submit" className="LoginButton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

// src/pages/LoginSignForm.jsx
import { useState } from "react";
import { LoginForm } from "./loginForm";
import { RegisterForm } from "./registerForm";
import { ToggleBox } from "./toggleBox";
import "./authlogin.css";

export const LoginSignForm = () => {
  const [isActive, setIsActive] = useState(false);
  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  return (
    <div className="login-sign-container flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100">
      <div className={`form-container ${isActive ? "active" : ""}`}>
        <LoginForm />
        <RegisterForm onSuccess={handleLoginClick} />
        <ToggleBox
          isActive={isActive}
          handleRegisterClick={handleRegisterClick}
          handleLoginClick={handleLoginClick}
        />
      </div>
    </div>
  );
};

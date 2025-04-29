import { useState } from "react";
import { LoginForm, RegisterForm, TogglePanel } from "../components";
import "../assets/styles/main.css";

export function LoginSign() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`container ${isActive ? "active" : ""}`}>
      <div className="form-box login">
        <LoginForm />
      </div>

      <div className="form-box register">
        <RegisterForm />
      </div>

      <TogglePanel isActive={isActive} setIsActive={setIsActive} />
    </div>
  );
};

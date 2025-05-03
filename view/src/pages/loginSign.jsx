import { useState } from "react";
import { LoginForm, RegisterForm, TogglePanel } from "../components";
import "../assets/styles/main.css";


export function LoginSign() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100">
      <div className="relative w-[850px] h-[550px] bg-white rounded-[30px] shadow-xl overflow-hidden">
        <LoginForm />
        <RegisterForm setIsActive={setIsActive} /> {/*aqui vai entrar  lógica de*/}
        <TogglePanel isActive={isActive} setIsActive={setIsActive} />
      </div>
    </div>
  );
}
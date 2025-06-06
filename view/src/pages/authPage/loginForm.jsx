// src/pages/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../components/inputField";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading: authLoading } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Usuário é obrigatório";
    if (!formData.password) newErrors.password = "Senha é obrigatória";

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    try {
      await login(formData);
      navigate("/laboratorios");
    } catch {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="form-box login active">
      <form className="w-full" onSubmit={handleSubmit}>
        <h1 className="title">LOGIN</h1>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <InputField
          name="username"
          type="text"
          placeholder="Usuário"
          icon={FaUser}
          value={formData.username}
          onChange={handleChange}
          error={fieldErrors.username}
          required
        />

        <InputField
          name="password"
          type="password"
          placeholder="Senha"
          icon={FaLock}
          value={formData.password}
          onChange={handleChange}
          error={fieldErrors.password}
          required
        />

        <div className="my-6">
          <a href="#" className="text-sm hover:underline">
            Esqueceu sua Senha?
          </a>
        </div>

        <button
          type="submit"
          className="btn"
          disabled={authLoading}
        >
          {authLoading ? "Carregando..." : "Acessar"}
        </button>
      </form>
    </div>
  );
};

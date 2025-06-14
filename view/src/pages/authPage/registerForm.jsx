// src/pages/RegisterForm.jsx
import React, { useState } from "react";
import { InputField } from "../../components/inputField";
import { FaUser, FaEnvelope, FaIdBadge, FaLock, FaKey } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

export const RegisterForm = () => {
  const { register } = useAuth();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matricula: "",
    password: "",
    passwordConfirm: "",
    role: "student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async () => {
    setError(null);

    if (formData.password !== formData.passwordConfirm) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      setFormData({
        name: "",
        email: "",
        matricula: "",
        password: "",
        passwordConfirm: "",
        role: "student",
      });
    } catch (err) {
      setError(err.message || "Ocorreu um erro no registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-box register active">
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="title">AUTOREGISTRO</h1>

        {success && (
          <div className="success-message bg-green-400">
            realizado com sucesso!
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <InputField
          name="name"
          type="text"
          placeholder="Nome completo"
          icon={FaUser}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <InputField
          name="email"
          type="email"
          placeholder="E-mail"
          icon={FaEnvelope}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <InputField
          name="matricula"
          type="text"
          placeholder="Matrícula"
          icon={FaIdBadge}
          value={formData.matricula}
          onChange={handleChange}
          required
        />

        <InputField
          name="password"
          type="password"
          placeholder="Senha"
          icon={FaLock}
          value={formData.password}
          onChange={handleChange}
          required
        />

        <InputField
          name="passwordConfirm"
          type="password"
          placeholder="Confirme sua senha"
          icon={FaKey}
          value={formData.passwordConfirm}
          onChange={handleChange}
          required
        />

        <select
          className="user-type"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Estudante</option>
          <option value="teacher">Professor</option>
          <option value="admin">Bolsista</option>
        </select>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Carregando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
};

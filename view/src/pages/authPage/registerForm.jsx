// src/pages/RegisterForm.jsx
import { InputField } from "../../components/inputField";
import { FaUser, FaEnvelope, FaIdBadge, FaLock, FaKey } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import { useAuthForm } from "../../customHooks/useAuthForm";
import { registerValidations } from "./validations";

export const RegisterForm = () => {
  const { register } = useAuth();
  const {
    formData,
    fieldErrors,
    submitError,
    submitSuccess,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  } = useAuthForm(
    {
      name: "",
      email: "",
      matricula: "",
      password: "",
      passwordConfirm: "",
      role: "student",
    },
    registerValidations
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await handleSubmit(register);

    if (result.success) {
      resetForm();
    }
  };

  return (
    <div className="form-box register active">
      <form className="w-full" onSubmit={handleRegister}>
        <h1 className="title">AUTOREGISTRO</h1>

        {submitSuccess && (
          <div className="success-message bg-green-400">
            Cadastro realizado com sucesso!
          </div>
        )}

        {submitError && (
          <div className="error-message">{submitError}</div>
        )}

        <InputField
          name="name"
          type="text"
          placeholder="Nome completo"
          icon={FaUser}
          value={formData.name}
          onChange={handleChange}
          error={fieldErrors.name}
          required
        />

        <InputField
          name="email"
          type="email"
          placeholder="E-mail"
          icon={FaEnvelope}
          value={formData.email}
          onChange={handleChange}
          error={fieldErrors.email}
          required
        />

        <InputField
          name="matricula"
          type="text"
          placeholder="Matrícula"
          icon={FaIdBadge}
          value={formData.matricula}
          onChange={handleChange}
          error={fieldErrors.matricula}
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

        <InputField
          name="passwordConfirm"
          type="password"
          placeholder="Confirme sua senha"
          icon={FaKey}
          value={formData.passwordConfirm}
          onChange={handleChange}
          error={fieldErrors.passwordConfirm}
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

        <button
          type="submit"
          className="btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Carregando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
};
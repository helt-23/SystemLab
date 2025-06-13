import { InputField } from '../../components/inputField';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaIdBadge, FaKey } from 'react-icons/fa';
import { useFinishLoadingOnLabChange } from '../../public/usingLoadingScreen';
import CenteredIcon from '../../public/icones/unfesspaLogo'
import "./authlogin.css"
import { useAuth } from '../../context/authContext'; // Ajuste o caminho conforme necessário
import { useAuthForm } from '../../customHooks/useAuthForm'; // Ajuste o caminho conforme necessário

export function LoginSignForm() {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  useFinishLoadingOnLabChange();

  // Configuração do formulário de login
  const {
    formData: loginData,
    errors: loginErrors,
    touched: loginTouched,
    handleChange: handleLoginChange,
    handleBlur: handleLoginBlur,
    handleSubmit: handleLoginSubmit,
  } = useAuthForm(
    { username: '', password: '' },
    (name, value) => {
      if (!value.trim()) return 'Campo obrigatório';
      return null;
    }
  );

  // Configuração do formulário de registro
  const {
    formData: registerData,
    errors: registerErrors,
    touched: registerTouched,
    handleChange: handleRegisterChange,
    handleBlur: handleRegisterBlur,
    handleSubmit: handleRegisterSubmit,
    setFormData: setRegisterData
  } = useAuthForm(
    {
      name: '',
      email: '',
      matricula: '',
      password: '',
      passwordConfirm: '',
      role: 'student'
    },
    (name, value, formData) => {
      if (!value.trim()) return 'Campo obrigatório';

      if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Email inválido';
      }

      if (name === 'passwordConfirm') {
        if (value !== formData.password) return 'As senhas não coincidem';
      }

      return null;
    }
  );

  // Handler para o select de tipo de usuário
  const handleRoleChange = (e) => {
    setRegisterData({
      ...registerData,
      role: e.target.value
    });
  };

  // Submissão do formulário de login
  const handleLogin = async () => {
    const result = await handleLoginSubmit(async () => {
      await auth.login({
        username: loginData.username,
        password: loginData.password
      });
      navigate('/laboratorios');
    });

    if (!result.success) {
      console.error('Erro no login:', result.error);
    }
  };

  // Submissão do formulário de registro
  const handleRegister = async () => {
    const result = await handleRegisterSubmit(async () => {
      await auth.register({
        name: registerData.name,
        email: registerData.email,
        matricula: registerData.matricula,
        password: registerData.password,
        role: registerData.role
      });
      setIsActive(false); // Volta para o formulário de login
    });

    if (!result.success) {
      console.error('Erro no registro:', result.error);
    }
  };

  return (
    <div className="login-sign-container">
      <div className={`form-container ${isActive ? 'active' : ''}`}>
        {/* Login Form */}
        <div className={`form-box login ${!isActive ? 'active' : ''}`}>
          <form className="login-form" onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}>
            <h1 className="title">LOGIN</h1>

            <InputField
              type="text"
              placeholder="Usuário *"
              icon={FaUser}
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
              onBlur={handleLoginBlur}
              error={loginTouched.username && loginErrors.username}
            />

            <InputField
              type="password"
              placeholder="Senha *"
              icon={FaLock}
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              onBlur={handleLoginBlur}
              error={loginTouched.password && loginErrors.password}
            />

            <div className="forgot-password">
              <a href="#" className="forgot-password-link">
                Esqueceu sua Senha?
              </a>
            </div>

            <button type="submit" className="btn">
              Acessar
            </button>
          </form>
        </div>

        {/* Registration Form */}
        <div className={`form-box register ${isActive ? 'active' : ''}`}>
          <form className="register-form" onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}>
            <h1 className="title">AUTOREGISTRO</h1>

            <InputField
              type="text"
              placeholder="Nome completo *"
              name="name"
              icon={FaUser}
              value={registerData.name}
              onChange={handleRegisterChange}
              onBlur={handleRegisterBlur}
              error={registerTouched.name && registerErrors.name}
            />

            <InputField
              type="email"
              placeholder="E-mail *"
              name="email"
              icon={FaEnvelope}
              value={registerData.email}
              onChange={handleRegisterChange}
              onBlur={handleRegisterBlur}
              error={registerTouched.email && registerErrors.email}
            />

            <InputField
              type="text"
              placeholder="Matrícula *"
              name="matricula"
              icon={FaIdBadge}
              value={registerData.matricula}
              onChange={handleRegisterChange}
              onBlur={handleRegisterBlur}
              error={registerTouched.matricula && registerErrors.matricula}
            />

            <InputField
              type="password"
              placeholder="Senha *"
              name="password"
              icon={FaLock}
              value={registerData.password}
              onChange={handleRegisterChange}
              onBlur={handleRegisterBlur}
              error={registerTouched.password && registerErrors.password}
            />

            <InputField
              type="password"
              placeholder="Confirme sua senha *"
              name="passwordConfirm"
              icon={FaKey}
              value={registerData.passwordConfirm}
              onChange={handleRegisterChange}
              onBlur={handleRegisterBlur}
              error={registerTouched.passwordConfirm && registerErrors.passwordConfirm}
            />

            <select
              className="user-type"
              value={registerData.role}
              onChange={handleRoleChange}
            >
              <option value="student">Estudante</option>
              <option value="teacher">Professor</option>
              <option value="admin">Bolsista</option>
            </select>

            <button type="submit" className="btn">Registrar</button>
          </form>
        </div>

        {/* Toggle Container */}
        <div className="toggle-box">
          <div className={`toggle-panel toggle-left ${!isActive ? 'active' : ''}`}>
            <CenteredIcon />
            <h2 className="welcome-title">Bem vindo ao Sistema Integrado de Reservas de Laboratórios (SIRLAB)
              !</h2>
            <p className="welcome-text">Não possui uma conta?</p>
            <button className="btn register-btn" onClick={handleRegisterClick}>
              Registrar-se
            </button>
          </div>

          <div className={`toggle-panel toggle-right ${isActive ? 'active' : ''}`}>
            <CenteredIcon />
            <h2 className="welcome-title">Bem vindo de volta!</h2>
            <p className="welcome-text">Já possui uma conta?</p>
            <button className="btn login-btn" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
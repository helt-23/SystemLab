import { InputField } from '../../components/inputField';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaIdBadge, FaKey } from 'react-icons/fa';
import { useFinishLoadingOnLabChange } from '../../public/usingLoadingScreen';
import CenteredIcon from '../../public/icones/unfesspaLogo'
import "./authlogin.css"

export function LoginSignForm() {
  const [isActive, setIsActive] = useState(false);
  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  useFinishLoadingOnLabChange();

  return (
    <div className="login-sign-container">
      <div className={`form-container ${isActive ? 'active' : ''}`}>
        {/* Login Form */}
        <div className={`form-box login ${!isActive ? 'active' : ''}`}>
          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <h1 className="title">LOGIN</h1>

            <InputField
              type="text"
              placeholder="Usuário"
              icon={FaUser}
            />

            <InputField
              type="password"
              placeholder="Senha"
              icon={FaLock}
            />

            <div className="forgot-password">
              <a href="#" className="forgot-password-link">
                Esqueceu sua Senha?
              </a>
            </div>

            <button type="submit" className="btn">
              <Link to="/laboratorios" className="btn-link">
                Acessar
              </Link>
            </button>
          </form>
        </div>

        {/* Registration Form */}
        <div className={`form-box register ${isActive ? 'active' : ''}`}>
          <form className="register-form" onSubmit={(e) => e.preventDefault()}>
            <h1 className="title">AUTOREGISTRO</h1>

            <InputField
              type="text"
              placeholder="Nome completo"
              name="name"
              icon={FaUser}
            />

            <InputField
              type="email"
              placeholder="E-mail"
              name="email"
              icon={FaEnvelope}
            />

            <InputField
              type="text"
              placeholder="Matrícula"
              name="matricula"
              icon={FaIdBadge}
            />

            <InputField
              type="password"
              placeholder="Senha"
              name="password"
              icon={FaLock}
            />

            <InputField
              type="password"
              placeholder="Confirme sua senha"
              name="passwordConfirm"
              icon={FaKey}
            />

            <select className="user-type" id="">
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
            <h2 className="welcome-title">Bem vindo ao SystemLab!</h2>
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
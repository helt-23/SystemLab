import { InputField } from '../components/inputField';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaIdBadge, FaKey } from 'react-icons/fa';
import { useLoading } from '../context/LoadingContext';

export function LoginSignForm() {
  const [isActive, setIsActive] = useState(false);
  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);
  const { finishLoading } = useLoading();
  const { labId } = useParams();

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      finishLoading();
    }, 1500);

    return () => clearTimeout(timer);
  }, [labId, finishLoading]);

  return (
    <div className="login-sign-container flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100">
      <div className={`form-container ${isActive ? 'active' : ''}`}>
        {/* Login Form */}
        <div className={`form-box login ${!isActive ? 'active' : ''}`}>
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
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

            <div className="my-6">
              <a href="#" className="text-sm text-gray-600 hover:underline">
                Esqueceu sua Senha?
              </a>
            </div>

            <button type="submit" className="btn">
              <Link to="/laboratorios" className="block w-full">
                Acessar
              </Link>
            </button>
          </form>
        </div>

        {/* Registration Form */}
        <div className={`form-box register ${isActive ? 'active' : ''}`}>
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
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
            <h2 className="text-2xl mb-4 font-bold text-center">Bem vindo ao SystemLab!</h2>
            <p className="mb-6 text-sm">Não possui uma conta?</p>
            <button className="btn register-btn" onClick={handleRegisterClick}>
              Registrar-se
            </button>
          </div>

          <div className={`toggle-panel toggle-right ${isActive ? 'active' : ''}`}>
            <h2 className="text-2xl mb-4 font-bold">Bem vindo de volta!</h2>
            <p className="mb-6 text-sm">Já possui uma conta?</p>
            <button className="btn login-btn" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
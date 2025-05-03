import { FaEnvelope, FaUser, FaIdBadge, FaLock, FaKey } from 'react-icons/fa';
import { InputField } from './inputField';

export function RegisterForm({ setIsActive }) {
  return (
    <div className="register-form-container absolute left-0 w-1/2 h-full bg-white flex items-center p-10 z-20">
      <form className="w-full px-5 text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">AUTOREGISTRO</h1>

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

        <button
          type="submit"
          className="w-full py-3 bg-primary rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-shadow"
        >
          Registrar
        </button>

        <p className="mt-6 text-sm text-gray-600">
          Já possui uma conta? {' '}
          <button
            onClick={() => setIsActive(false)}
            className="text-primary hover:underline font-medium"
          >
            Fazer Login
          </button>
        </p>
      </form>
    </div>
  );
}
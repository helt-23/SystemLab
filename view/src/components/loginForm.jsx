import { Link } from 'react-router-dom';
import { InputField } from './inputField';
import { FaUser, FaLock } from 'react-icons/fa'; // Font Awesome

export function LoginForm() {
  return (
    <div className="login-form-container absolute right-0 w-1/2 h-full bg-white flex items-center p-10 z-20">
      <form className="w-full px-5 text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">LOGIN</h1>


        <InputField
          type="text"
          placeholder="Matrícula"
          name="registration"
          icon={FaUser}
        />

        <InputField
          type="text"
          placeholder="Matrícula"
          icon={FaLock} // Ícone do FontAwesome
        />

        <div className="my-6">
          <a href="#" className="text-sm text-gray-600 hover:underline">
            Esqueceu sua Senha?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-shadow"
        >
          <Link to="/laboratorios" className="block w-full">
            Acessar
          </Link>
        </button>
      </form>
    </div>
  );
}
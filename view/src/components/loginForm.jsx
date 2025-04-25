import { Link } from 'react-router-dom';
export function LoginForm() {
  return (
    <form action="#">
      <h1>LOGIN</h1>
      <div className="input-box">
        <input type="text" placeholder="Matrícula" required />
        <i className="bx bxs-user"></i>
      </div>
      <div className="input-box">
        <input type="password" placeholder="Senha" required />
        <i className="bx bxs-lock-alt"></i>
      </div>
      <div className="forgot-link">
        <a href="#">Esqueceu sua Senha?</a>
      </div>
      <button type="submit" className="btn" >
      <Link to="/laboratorios" >
         Login
        </Link>
      </button>
    </form>
  );
}

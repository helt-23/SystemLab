export function RegisterForm() {
  return (
    <form action="#">
      <h1>AUTOREGISTRO</h1>
      <div className="input-box">
        <input type="text" placeholder="Nome Completo" required />
        <i className="bx bxs-user"></i>
      </div>
      <div className="input-box">
        <input type="email" placeholder="Email" required />
        <i className="bx bxs-envelope"></i>
      </div>
      <div className="input-box">
        <input type="text" placeholder="Matricula" required />
        <i className="bx bxs-lock-alt"></i>
      </div>
      <div className="input-box">
        <input type="password" placeholder="Password" required />
        <i className="bx bxs-lock-alt"></i>
      </div>
      <div className="input-box">
        <input type="password" placeholder="Password" required />
        <i className="bx bxs-lock-alt"></i>
      </div>
      <button type="submit" className="btn">
        Registrar-se
      </button>
    </form>
  );
}

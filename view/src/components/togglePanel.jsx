export function TogglePanel({ isActive, setIsActive }) {
  return (
    <div className="toggle-box">
      <div className={`toggle-panel toggle-left ${isActive ? "hidden" : ""}`}>
        <h2>Bem vindo ao SystemLab!</h2>
        <p>Não possui uma conta?</p>
        <button className="btn" onClick={() => setIsActive(true)}>
          AutoRegistrar-se
        </button>
      </div>

      <div className={`toggle-panel toggle-right ${isActive ? "" : "hidden"}`}>
        <h2>Bem vindo de volta!</h2>
        <p>Já possui uma conta?</p>
        <button className="btn" onClick={() => setIsActive(false)}>
          Login
        </button>
      </div>
    </div>
  );
}

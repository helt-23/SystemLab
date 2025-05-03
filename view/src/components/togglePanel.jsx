export function TogglePanel({ isActive, setIsActive }) {
  return (
    <div className="absolute inset-0">
      {/* Overlay animado (Atrás dos formulários) */}
      <div className={`absolute left-[-250%] w-[300%] h-full bg-primary rounded-[150px] transition-all duration-700 ease-in-out z-30 ${isActive ? 'translate-x-[99%]' : 'translate-x-0'
        }`}></div>

      {/* Painéis Interativos (Acima dos formulários) */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Painel Esquerdo */}
        <div className={`absolute left-0 w-1/2 h-full flex flex-col justify-center items-center text-white transition-all duration-700 ease-in-out ${isActive ?
          '-translate-x-full opacity-0' :
          'translate-x-0 opacity-100 delay-300 pointer-events-auto'
          }`}>
          <h2 className="text-2xl mb-4 font-bold">Bem vindo ao SystemLab!</h2>
          <p className="mb-6 text-sm">Não possui uma conta?</p>
          <button
            className="w-40 py-3 border-2 border-white rounded-lg bg-transparent font-semibold hover:bg-white hover:text-primary transition-colors"
            onClick={() => setIsActive(true)}
          >
            Registrar-se
          </button>
        </div>

        {/* Painel Direito */}
        <div className={`absolute right-0 w-1/2 h-full flex flex-col justify-center items-center text-white transition-all duration-700 ease-in-out ${isActive ?
          'translate-x-0 opacity-100 delay-300 pointer-events-auto' :
          'translate-x-full opacity-0'
          }`}>
          <h2 className="text-2xl mb-4 font-bold">Bem vindo de volta!</h2>
          <p className="mb-6 text-sm">Já possui uma conta?</p>
          <button
            className="w-40 py-3 border-2 border-white rounded-lg bg-transparent font-semibold hover:bg-white hover:text-primary transition-colors"
            onClick={() => setIsActive(false)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
import Menu from "./menuButton";

export function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-600 text-white p-4 shadow-lg">
      <Menu />
      <h1 className="text-xl font-bold tracking-tight">Seleção de Laboratórios</h1>
      <div className="w-8" />
    </header>
  );
}
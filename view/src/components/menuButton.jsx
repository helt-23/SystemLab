import { Menu } from 'lucide-react';

const MenuButton = () => {
  return (
    <button
      className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
      aria-label="Menu">
      <Menu size={24} />
    </button>
  );
}
export default MenuButton;

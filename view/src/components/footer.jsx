import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 p-4 text-sm text-gray-600">
      <div className="mx-auto text-center">
        © {new Date().getFullYear()} UNIFESSPA - Engenharia da Computação | Todos os direitos reservados
      </div>
    </footer>
  );
}

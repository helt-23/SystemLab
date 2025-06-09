import React, { useState, useCallback } from 'react'; // Adicionei useCallback
import MenuAside from './menuAside';
import '../assets/styles/header-module.css';

export function Header({ PageTitle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = {
    name: "Helton Pessoa",
    role: "Sobrevivente",
    photo: null
  };

  // Corrigindo com useCallback para evitar recriação da função
  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <header className="app-header">
        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <h1 className="header-title">{PageTitle}</h1>
        <div className="header-spacer"></div>

        <MenuAside
          user={user}
          isOpen={menuOpen}
          onClose={toggleMenu}
        />
      </header>
    </>
  );
}
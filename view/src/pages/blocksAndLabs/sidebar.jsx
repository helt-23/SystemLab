import React from 'react';
import { Building } from 'lucide-react';
import './BlockLabs.css';

export function Sidebar({ blocos, blocoSelecionado, setBlocoSelecionado }) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-header">
        <Building className="icon" size={20} />
        Blocos
      </h2>

      <nav className="sidebar-nav">
        <ul>
          {blocos.map((bloco) => (
            <li key={bloco.id}>
              <button
                className={
                  `sidebar-button ${blocoSelecionado === bloco.id ? 'selected' : 'unselected'
                  }`
                }
                onClick={() => setBlocoSelecionado(bloco.id)}
              >
                <Building className="icon" />
                {bloco.nome}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
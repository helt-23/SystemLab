import React from 'react';
import { Building } from 'lucide-react';
import "../assets/styles/sidebar.css";

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
            <li key={bloco}>
              <button
                className={
                  `sidebar-button ${bloco === blocoSelecionado ? 'selected' : 'unselected'
                  }`
                }
                onClick={() => setBlocoSelecionado(bloco)}
              >
                <Building className="icon" />
                {bloco}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
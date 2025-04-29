import React from 'react';
import { Building } from 'lucide-react';

export function Sidebar({ blocos, blocoSelecionado, setBlocoSelecionado }) {
  return (
    <aside className="w-64 bg-white border-r overflow-auto p-4 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-700 flex items-center">
        <Building className="mr-2" size={20} />
        Blocos
      </h2>
      <nav>
        <ul className="space-y-2">
          {blocos.map((bloco) => (
            <li key={bloco}>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${bloco === blocoSelecionado
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                onClick={() => setBlocoSelecionado(bloco)}
              >
                <Building className="w-5 h-5 mr-3" />
                {bloco}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

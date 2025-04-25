import React, { useState } from 'react';
import { Menu, CalendarClock, Building, Users } from 'lucide-react';

export function LabSelection() {
  const blocos = ['Bloco A', 'Bloco B', 'Bloco C', 'Bloco D'];
  
  const laboratoriosPorBloco = {
    'Bloco A': [
      {
        id: 1,
        name: 'Lab 101',
        capacity: 25,
        description: 'Laboratório de Informática com equipamentos modernos e ar condicionado',
        image: '/lab1.jpg'
      },
      {
        id: 2,
        name: 'Lab 102',
        capacity: 30,
        description: 'Laboratório de Eletrônica com bancadas equipadas',
        image: '/lab2.jpg'
      }
    ],
    'Bloco B': [
      {
        id: 3,
        name: 'Lab 201',
        capacity: 20,
        description: 'Laboratório de Química com sistema de exaustão',
        image: '/lab3.jpg'
      }
    ],
    'Bloco C': [
      {
        id: 4,
        name: 'Lab 301',
        capacity: 35,
        description: 'Laboratório Multiuso para projetos integrados',
        image: '/lab4.jpg'
      }
    ],
    'Bloco D': [
      {
        id: 5,
        name: 'Lab 401',
        capacity: 15,
        description: 'Laboratório de Pesquisa Avançada',
        image: '/lab5.jpg'
      }
    ]
  };

  const [blocoSelecionado, setBlocoSelecionado] = useState(blocos[0]);

  const handleVerHorarios = (labId) => {
    // Navegação para tela de horários (implementar depois)
    console.log('Abrir horários do laboratório:', labId);
  };


return (
  <div className="flex flex-col h-screen bg-gray-50">
    <header className="flex items-center justify-between bg-blue-600 text-white p-4 shadow-lg">
        <button 
          className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold tracking-tight">Seleção de Laboratórios</h1>
        <div className="w-8" /> {/* Espaço balanceado */}
      </header>
    <main className="flex flex-1 overflow-hidden">
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
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${
                      bloco === blocoSelecionado
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
      <section className="flex-1 overflow-auto p-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Laboratórios em {blocoSelecionado}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laboratoriosPorBloco[blocoSelecionado].map((lab) => (
            <div 
              key={lab.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full"
            >
              {/* Imagem do Laboratório */}
              <div className="h-48 bg-gray-200 relative flex-shrink-0">
                <img
                  src={lab.image}
                  alt={lab.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{lab.name}</h3>
                </div>
              </div>

              {/* Detalhes do Laboratório */}
              <div className="p-4 flex flex-col flex-1">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{lab.capacity} lugares disponíveis</span>
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                    {lab.description}
                  </p>
                </div>

                {/* Botão fixo no rodapé do card */}
                <button
                  onClick={() => handleVerHorarios(lab.id)}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium"
                >
                  <CalendarClock className="w-5 h-5 mr-2" />
                  Ver Horários
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>

    <footer className="bg-gray-100 border-t border-gray-200 p-4 text-sm text-gray-600">
        <div className="mx-auto text-center">
          © {new Date().getFullYear()} UNIFESSPA - Engenharia da Computação | Todos os direitos reservados
        </div>
      </footer>
  </div>
);
}
import React, { useState } from 'react';
import { Sidebar, LaboratoryCard, Footer, Header } from '../components';
import '../assets/styles/main.css';

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
    console.log('Abrir horários do laboratório:', labId);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <Sidebar
          blocos={blocos}
          blocoSelecionado={blocoSelecionado}
          setBlocoSelecionado={setBlocoSelecionado}
        />

        <section className="flex-1 overflow-auto p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Laboratórios em {blocoSelecionado}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laboratoriosPorBloco[blocoSelecionado].map((lab) => (
              <LaboratoryCard
                key={lab.id}
                lab={lab}
                handleVerHorarios={handleVerHorarios}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
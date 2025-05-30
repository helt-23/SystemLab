import React, { useState } from 'react';
import { Sidebar, LaboratoryCard, Header } from '../components';
import { ReservationModal } from './reservations';
import '../assets/styles/labSec.css';

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
    <div className="app-container">
      <Header />

      <main className="main-content-lab">
        <Sidebar
          blocos={blocos}
          blocoSelecionado={blocoSelecionado}
          setBlocoSelecionado={setBlocoSelecionado}
        />

        <section className="labs-section">
          {/* Select dropdown for small screens */}
          <select
            className="block-select"
            value={blocoSelecionado}
            onChange={(e) => setBlocoSelecionado(e.target.value)}
          >
            {blocos.map((bloco) => (
              <option key={bloco} value={bloco}>
                {bloco}
              </option>
            ))}
          </select>

          <h2 className="section-title">Laboratórios em {blocoSelecionado}</h2>
          <div className="labs-grid">
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

      <footer className="main-footer">
        <div className="footer-content">
          © {new Date().getFullYear()} UNIFESSPA - Engenharia da Computação | Todos os direitos reservados
        </div>
      </footer>
      <ReservationModal />
    </div>
  );
}

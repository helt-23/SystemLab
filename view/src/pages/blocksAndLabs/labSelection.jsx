import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../../components';
import { BookingReservs } from '../../pages';
import { useLabData } from '../../context/LabDataContext';
import { useFinishLoadingOnLabChange } from '../../public/usingLoadingScreen';
import './BlockLabs.css';
import { useNavigate } from 'react-router-dom';
import ProfileEditModal from '../../components/profileEditModal';
import { LaboratoryCard } from './laboratoryCard';
import { Sidebar } from './sidebar';

export function LabSelection() {
  const { blocos, laboratorios, getLabSchedule } = useLabData();
  const [blocoSelecionado, setBlocoSelecionado] = useState(blocos.length > 0 ? blocos[0].id : '');
  const navigate = useNavigate();

  useFinishLoadingOnLabChange();

  const blocoAtual = blocos.find(b => b.id === blocoSelecionado);

  // Obter laboratórios do bloco selecionado
  const labsDoBloco = blocoAtual
    ? blocoAtual.laboratorios.map(labId => laboratorios[labId])
    : [];

  const handleVerHorarios = (labId) => {
    getLabSchedule(labId);
    navigate(`/laboratorios/${labId}`);
  };

  return (
    <div className="app-container">
      <Header PageTitle={"Seleção de Laboratórios"} />
      <main className="main-content-lab">
        <Sidebar
          blocos={blocos}
          blocoSelecionado={blocoSelecionado}
          setBlocoSelecionado={setBlocoSelecionado}
        />

        <section className="labs-section">
          <select
            className="block-select"
            value={blocoSelecionado}
            onChange={(e) => setBlocoSelecionado(e.target.value)}
          >
            {blocos.map((bloco) => (
              <option key={bloco.id} value={bloco.id}>
                {bloco.nome}
              </option>
            ))}
          </select>

          <h3 className="section-title">
            Laboratórios em {blocoAtual?.nome}
          </h3>

          <div className="labs-grid">
            {labsDoBloco.map((lab) => (
              <LaboratoryCard
                key={lab.id}
                lab={{
                  ...lab,
                  name: lab.sala,
                  capacity: lab.lugares,
                  description: lab.descricao || lab.detalhe || "",
                  image: lab.image
                }}
                handleVerHorarios={handleVerHorarios}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <BookingReservs />
      <ProfileEditModal />
    </div>
  );
}
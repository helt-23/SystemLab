import React from 'react';
import { X } from 'lucide-react';

const LabDetailModal = ({ isOpen, onClose, labDetails }) => {
  if (!isOpen || !labDetails) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const hardwares = labDetails.hardwares || [];
  const softwares = labDetails.softwares || [];

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2 className="modal__title">{labDetails.nome || "Laboratório"}</h2>
          <div className="lab-info">
            <span className="lab-capacity">Capacidade: {labDetails.lugares} pessoas</span>
            <span className={`lab-status ${labDetails.disponivel ? 'available' : 'occupied'}`}>
              {labDetails.disponivel ? 'Disponível' : 'Ocupado'}
            </span>
          </div>
        </div>

        <div className="modal-content">
          <section className="info-section">
            <h3>Descrição</h3>
            <p className="modal__text">{labDetails.descricao || "Sem descrição disponível"}</p>
            <p className="modal__text">{labDetails.detalhe || "Sem detalhe disponível"}</p>
          </section>

          <div className="grid-layout">
            <section className="info-section">
              <h3>Hardwares</h3>
              <ul className="item-list">
                {hardwares.length > 0 ? (
                  hardwares.map((hardware, index) => (
                    <li key={index} className="item">
                      <span className="item-name">{hardware.nome}</span>
                      <span className="item-details">
                        {hardware.quantidade} unidades • {hardware.especificacao}
                      </span>
                    </li>
                  ))
                ) : (
                  <p>Nenhum hardware cadastrado</p>
                )}
              </ul>
            </section>

            <section className="info-section">
              <h3>Softwares</h3>
              <ul className="item-list">
                {softwares.length > 0 ? (
                  softwares.map((software, index) => (
                    <li key={index} className="item">
                      <span className="item-name">{software.nome}</span>
                      <span className="item-details">
                        Versão {software.versao} • {software.licenca}
                      </span>
                    </li>
                  ))
                ) : (
                  <p>Nenhum software cadastrado</p>
                )}
              </ul>
            </section>
          </div>

          {labDetails.responsavel && (
            <section className="info-section">
              <h3>Responsável</h3>
              <div className="responsavel-info">
                <span>{labDetails.responsavel.nome}</span>
                <span>{labDetails.responsavel.email}</span>
                <span>{labDetails.responsavel.telefone}</span>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabDetailModal;
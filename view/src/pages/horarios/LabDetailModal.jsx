import React from 'react';
import { X } from 'lucide-react';

const LabDetailModal = ({ isOpen, onClose, labDetails }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <X size={20} />
        </button>
        <h3 className="modal__title">Detalhes do Laboratório</h3>
        <p className="modal__text">{labDetails.detalhe}</p>
      </div>
    </div>
  );
};

export default LabDetailModal;
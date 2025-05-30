import React, { useState } from 'react';
import '../assets/styles/reservation-module.css';
import { X, File } from 'lucide-react';

const ReservationModal = ({
  isOpen,
  onClose,
  day,
  timeSlots,
  onReserve
}) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [reservationType, setReservationType] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  // Tipos de reserva
  const reservationTypes = [
    { value: 'aula', label: 'Aula' },
    { value: 'manutencao', label: 'Manutenção' },
    { value: 'instalacao', label: 'Instalação de Software' },
    { value: 'outro', label: 'Outro' }
  ];

  // Filtra apenas os horários livres do dia
  const availableSlots = timeSlots.filter(slot => slot.tipo === 'livre');

  const handleSlotChange = (slotTime) => {
    setSelectedSlots(prev => {
      if (prev.includes(slotTime)) {
        return prev.filter(time => time !== slotTime);
      } else {
        return [...prev, slotTime];
      }
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setErrors(prev => ({ ...prev, file: null }));
    } else {
      setErrors(prev => ({ ...prev, file: 'Por favor, selecione um arquivo PDF.' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (selectedSlots.length === 0) {
      newErrors.slots = 'Selecione pelo menos um horário.';
    }

    if (!reservationType) {
      newErrors.reservationType = 'Selecione o tipo de reserva.';
    }

    if (!description.trim()) {
      newErrors.description = 'Insira uma descrição.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onReserve({
        day,
        slots: selectedSlots,
        type: reservationType,
        description,
        file
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="reservation-modal-overlay" onClick={onClose}>
      <div className="reservation-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className="modal-title">Solicitar Reserva</h2>
        <p className="modal-subtitle">Dia: {day}</p>

        <div className="form-section">
          <h3 className="section-title">Horários Disponíveis</h3>
          {availableSlots.length === 0 ? (
            <p>Não há horários disponíveis para este dia.</p>
          ) : (
            <div className="time-slots">
              {availableSlots.map((slot, index) => (
                <div key={index} className="slot-item">
                  <label className="slot-label">
                    <input
                      type="checkbox"
                      checked={selectedSlots.includes(slot.horario)}
                      onChange={() => handleSlotChange(slot.horario)}
                      className="slot-checkbox"
                    />
                    <span className="slot-time">{slot.horario}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
          {errors.slots && <p className="error-message">{errors.slots}</p>}
        </div>

        <div className="form-section">
          <h3 className="section-title">Tipo de Reserva</h3>
          <select
            value={reservationType}
            onChange={(e) => setReservationType(e.target.value)}
            className="reservation-select"
          >
            <option value="">Selecione um tipo</option>
            {reservationTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.reservationType && <p className="error-message">{errors.reservationType}</p>}
        </div>

        <div className="form-section">
          <h3 className="section-title">Descrição</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o objetivo da reserva..."
            className="reservation-textarea"
            rows={4}
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        <div className="form-section">
          <h3 className="section-title">Documento (PDF)</h3>
          <label className="file-upload">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="file-input"
            />
            <div className="file-upload-label">
              <File size={16} />
              <span>{file ? file.name : 'Selecionar arquivo'}</span>
            </div>
          </label>
          {errors.file && <p className="error-message">{errors.file}</p>}
        </div>

        <div className="modal-actions">
          <button className="action-button cancel" onClick={onClose}>
            Voltar
          </button>
          <button className="action-button confirm" onClick={handleSubmit}>
            Confirmar Solicitação
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
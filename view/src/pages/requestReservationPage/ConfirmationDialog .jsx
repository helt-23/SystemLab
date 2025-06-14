import './reservation.css';
import { X } from 'lucide-react';

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmação",
  message = "Tem certeza que deseja realizar esta ação?",
  confirmText = "Confirmar",
  cancelText = "Voltar"
}) => {
  if (!isOpen) return null;

  return (
    <div className="reservation-modal-overlay" onClick={onClose}>
      <div className="confirmation-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose}>
          <X size={20} />
        </button>

        <h3 className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>

        <div className="dialog-actions">
          <button className="action-button cancel" onClick={onClose}>
            {cancelText}
          </button>
          <button className="action-button confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
// src/pages/myReserva.jsx
import React, { useState } from 'react';
import { useLabData } from '../../context/LabDataContext';
import { Trash2, X } from 'lucide-react';
import "./myReserva.css";
import ConfirmationDialog from '../../public/ConfirmationDialog ';

export function BookingReservs() {
  const {
    isBookingsModalOpen,
    closeBookingsModal,
    userBookings,
    removeUserBooking
  } = useLabData();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [bookingToRemove, setBookingToRemove] = useState(null);

  const handleRemoveClick = (id) => {
    setBookingToRemove(id);
    setIsConfirmationOpen(true);
  };

  const handleConfirmRemove = () => {
    if (bookingToRemove) {
      removeUserBooking(bookingToRemove);
      setIsConfirmationOpen(false);
      setBookingToRemove(null);
    }
  };

  if (!isBookingsModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeBookingsModal}>
      <main className="reservations-page" onClick={(e) => e.stopPropagation()}>
        <div className="reservations-container">
          <header className="reservations-header">
            <h1 className="reservations-title">Minhas Reservas</h1>
          </header>

          {userBookings.length === 0 ? (
            <div className='div-semReserva'>
              <h3>Você não possui reservas</h3>
            </div>
          ) : (
            <section className="reservation-list">
              {userBookings.map((booking) => {
                // Verificação segura para labSala
                const labSala = booking.labSala || "Laboratório Desconhecido";
                const labParts = labSala.split('-');
                const labCode = labParts.length > 0 ? labParts[0].trim() : "";
                const labName = labParts.length > 1 ? labParts[1].trim() : labSala;

                // Verificação de datas
                const requestDate = booking.requestDate ? new Date(booking.requestDate) : null;
                const bookingDate = booking.bookingDate ? new Date(booking.bookingDate) : null;

                return (
                  <div className="reservation-card" key={booking.id}>
                    <div className="card-header">
                      <h3 className="room-number">
                        {labCode && <span className="lab-code">{labCode}</span>}
                        {labName}
                      </h3>
                    </div>

                    <div className="reservation-details">
                      <div className="reservation-detail">
                        <strong>Solicitado em:</strong>{" "}
                        {requestDate ?
                          requestDate.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          }) : "Data desconhecida"}
                      </div>

                      <div className="reservation-detail">
                        <strong>Data:</strong>{" "}
                        {bookingDate ?
                          bookingDate.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short'
                          }) : "Data desconhecida"}
                        {bookingDate && (
                          <span className="weekday">
                            ({" "}
                            {bookingDate.toLocaleDateString('pt-BR', {
                              weekday: 'short'
                            })}{" "}
                            )
                          </span>
                        )}
                      </div>

                      <div className="reservation-detail">
                        <strong>Horário:</strong> {booking.startTime || "?"} - {booking.endTime || "?"}
                      </div>

                      <div className="reservation-detail">
                        <strong>Dia da Semana:</strong> {booking.dia || "Não especificado"}
                      </div>

                      <div className="reservation-detail">
                        <strong>Status:</strong>{" "}
                        <span className={`status-badge ${booking.status ? booking.status.toLowerCase() : 'desconhecido'}`}>
                          {booking.status || "Status desconhecido"}
                        </span>
                      </div>
                    </div>

                    <button
                      className="cancel-button"
                      onClick={() => handleRemoveClick(booking.id)}
                      disabled={booking.status === "Cancelada" || booking.status === "Concluída"}
                    >
                      <Trash2 size={16} className="icon" />
                      Cancelar
                    </button>
                  </div>
                );
              })}
            </section>
          )}

          <button
            className="close-modal"
            onClick={closeBookingsModal}
          >
            <X size={24} />
          </button>
        </div>
      </main>

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Cancelar Reserva"
        message="Tem certeza que deseja cancelar esta reserva?"
        confirmText="Cancelar reserva"
        cancelText="Voltar"
      />
    </div>
  );
}
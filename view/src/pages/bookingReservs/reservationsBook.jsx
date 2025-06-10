import React, { useState } from 'react';
import { useLabData } from '../../context/LabDataContext';
import { Trash2, X } from 'lucide-react';
import "./myReserva.css";
import ConfirmationDialog from '../requestReservationPage/ConfirmationDialog '; // Importe o componente

export function BookingReservs() {
  const {
    isBookingsModalOpen,
    closeBookingsModal,
    userBookings,
    removeUserBooking
  } = useLabData();

  // Estados para controlar a confirmação
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

  const handleCancelRemove = () => {
    setIsConfirmationOpen(false);
    setBookingToRemove(null);
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
              {userBookings.map((booking) => (
                <div className="reservation-card" key={booking.id}>
                  <div className="card-header">
                    <h3 className="room-number">
                      <span className="lab-code">
                        {booking.labSala.split('-')[0].trim()}
                      </span>
                      {booking.labSala.split('-')[1].trim()}
                    </h3>
                  </div>

                  <div className="reservation-details">
                    <div className="reservation-detail">
                      <strong>Solicitado em:</strong>{" "}
                      {new Date(booking.requestDate).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>

                    <div className="reservation-detail">
                      <strong>Data:</strong>{" "}
                      {new Date(booking.bookingDate).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short'
                      })}
                      <span className="weekday">
                        ({" "}
                        {new Date(booking.bookingDate).toLocaleDateString('pt-BR', {
                          weekday: 'short'
                        })}{" "}
                        )
                      </span>
                    </div>

                    <div className="reservation-detail">
                      <strong>Horário:</strong> {booking.startTime} - {booking.endTime}
                    </div>

                    <div className="reservation-detail">
                      <strong>Dia:</strong> {booking.dia}
                    </div>

                    <div className="reservation-detail">
                      <strong>Status:</strong>{" "}
                      <span className={`status-badge ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>


                  <button
                    className="cancel-button"
                    onClick={() => handleRemoveClick(booking.id)}
                  >
                    <Trash2 size={16} className="icon" />
                    Cancelar
                  </button>
                </div>
              ))}
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

      {/* Diálogo de confirmação para cancelar reserva */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
        title="Cancelar Reserva"
        message="Tem certeza que deseja cancelar esta reserva?"
        confirmText="Cancelar reserva"
        cancelText="Voltar"
      />
    </div>
  );
}
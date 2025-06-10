// src/customHooks/useReservation.js
import { useState } from "react";

export const useReservation = (labId, addUserBooking) => {
  const [reservationModal, setReservationModal] = useState({
    open: false,
    day: "",
    timeSlots: [],
  });

  const openReservationModal = (day, timeSlots) => {
    setReservationModal({
      open: true,
      day,
      timeSlots,
    });
  };

  const closeReservationModal = () => {
    setReservationModal({
      open: false,
      day: "",
      timeSlots: [],
    });
  };

  const handleReserveSubmit = (reservationData, labDetails) => {
    const newBooking = {
      labId,
      status: "Em análise",
      labSala: labDetails.sala,
      requestDate: new Date().toISOString(),
      bookingDate: reservationData.date,
      startTime: reservationData.startTime,
      endTime: reservationData.endTime,
      dia: reservationData.day,
      horario: `${reservationData.startTime} - ${reservationData.endTime}`,
      usuario: { nome: "Helton Pessoa", matricula: "2023001" },
    };

    addUserBooking(newBooking);
    closeReservationModal();
  };

  return {
    reservationModal,
    openReservationModal,
    closeReservationModal,
    handleReserveSubmit,
  };
};

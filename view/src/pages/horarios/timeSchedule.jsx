import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header, Footer } from "../../components";
import { ArrowLeft } from "lucide-react";
import { MyReservation } from "../reservations";
import { useLabData } from "../../context/LabDataContext";
import { useSchedule } from "../../customHooks/useSchedule";
import { useLoading } from "../../context/LoadingContext";
import LabInfoCard from "./LabInfoCard";
import ShiftSelector from "./ShiftSelector";
import WeekControls from "./WeekControls";
import ScheduleTable from "./ScheduleTable";
import ReservationModal from "../requestReservationPage/reservationModal";
import ProfileEditModal from "../../components/profileEditModal";
import AbbreviationPanel from "./AbbreviationPanel";
import { useFinishLoadingOnLabChange } from "../../public/usingLoadingScreen"
import "./app.css";

export function LabScheduleComponent() {
  const { labId } = useParams();
  const navigate = useNavigate();
  const [currentShift, setCurrentShift] = useState("manhã");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [reservationModal, setReservationModal] = useState({
    open: false,
    day: "",
    timeSlots: []
  });

  useFinishLoadingOnLabChange();

  const handleBackToLabs = () => navigate("/laboratorios");

  const {
    getLabDetails,
    getLabSchedule,
    addUserBooking,
    userBookings
  } = useLabData();

  const labDetails = getLabDetails(labId);
  const scheduleData = getLabSchedule(labId);
  const labBookings = userBookings.filter((b) => b.labId === labId);

  const { horarios, horariosUnicos, diasSemana } = useSchedule(
    scheduleData,
    currentShift,
    labBookings
  );

  const openReservationModal = (dia) => {
    const daySlots = horarios.filter(
      (h) => h.diaSemana === dia && h.tipo === "livre"
    );
    setReservationModal({
      open: true,
      day: dia,
      timeSlots: daySlots
    });
  };

  const handleReserveSubmit = (reservationData) => {
    const newBooking = {
      labId: labId,
      status: "Em análise",
      labSala: labDetails.sala,
      requestDate: new Date().toISOString(),
      bookingDate: reservationData.date,
      startTime: reservationData.startTime,
      endTime: reservationData.endTime,
      dia: reservationData.day,
      horario: `${reservationData.startTime} - ${reservationData.endTime}`,
      usuario: { nome: "João Silva", matricula: "2023001" }
    };

    addUserBooking(newBooking);
    setReservationModal({ open: false, day: "", timeSlots: [] });
  };

  if (!labDetails || !scheduleData) {
    return <div className="lab-not-found">Laboratório não encontrado</div>;
  }

  return (
    <div className="lab-schedule">
      <Header />

      <div className="back-button-container">
        <button onClick={handleBackToLabs} className="back-to-labs-button">
          <ArrowLeft size={18} />
          <span>Voltar</span>
        </button>
      </div>

      <main className="main-content">
        <LabInfoCard
          labDetails={labDetails}
          setShowDetail={setShowDetail}
          showDetail={showDetail}
        />

        {scheduleData && (
          <div className="schedule-controls">
            <ShiftSelector
              scheduleData={scheduleData}
              currentShift={currentShift}
              setCurrentShift={setCurrentShift}
            />
            <WeekControls
              currentWeek={currentWeek}
              setCurrentWeek={setCurrentWeek}
            />
          </div>
        )}

        <ScheduleTable
          diasSemana={diasSemana}
          horariosUnicos={horariosUnicos}
          horarios={horarios}
          onCellClick={openReservationModal}
        />

        <AbbreviationPanel />

        <ReservationModal
          isOpen={reservationModal.open}
          onClose={() => setReservationModal({ open: false, day: "", timeSlots: [] })}
          day={reservationModal.day}
          timeSlots={reservationModal.timeSlots}
          labDetails={labDetails}
          onReserve={handleReserveSubmit}
        />

        <Footer />
        <MyReservation />
        <ProfileEditModal />
      </main>
    </div>
  );
}
// src/components/LabScheduleComponent.js
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "../../components";
import { BookingReservs } from "../../pages";
import { useLabData } from "../../context/LabDataContext";
import { useSchedule } from "../../customHooks/useSchedule";
import LabInfoCard from "./LabInfoCard";
import ShiftSelector from "./ShiftSelector";
import WeekControls from "./WeekControls";
import ScheduleTable from "./ScheduleTable";
import ReservationModal from "../requestReservationPage/reservationModal";
import ProfileEditModal from "../../components/profileEditModal";
import AbbreviationPanel from "./AbbreviationPanel";
import LabDetailModal from "./LabDetailModal";
import { useFinishLoadingOnLabChange } from "../../public/usingLoadingScreen";
import { useReservation } from "../../customHooks/useReservation";
import "./app.css";

export function LabScheduleComponent() {
  const { labId } = useParams();
  const navigate = useNavigate();
  const [currentShift, setCurrentShift] = useState("manhã");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
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
  const {
    reservationModal,
    openReservationModal,
    closeReservationModal,
    handleReserveSubmit
  } = useReservation(labId, addUserBooking);
  useFinishLoadingOnLabChange();
  {/* const handleBackToLabs = () => navigate("/laboratorios"); */ }
  const handleCellClick = (dia) => {
    const daySlots = horarios.filter(
      (h) => h.diaSemana === dia && h.tipo === "livre"
    );
    openReservationModal(dia, daySlots);
  };

  if (!labDetails || !scheduleData) {
    return <div className="lab-not-found">Laboratório não encontrado</div>;
  }

  return (
    <div className="lab-schedule">

      {/*     <div className="back-button-container">
        <button onClick={handleBackToLabs} className="back-to-labs-button">
          <ArrowLeft size={18} />
          <span>Voltar</span>
        </button>
      </div>*/}

      <main className="main-content">
        <Breadcrumb />
        <div className="schedule-container">
          <LabInfoCard
            labDetails={labDetails}
            setShowDetail={setShowDetail}
            showDetail={showDetail}
          />

          {scheduleData && (
            <div className="schedule-controls-container">
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
            </div>
          )}

          <ScheduleTable
            diasSemana={diasSemana}
            horariosUnicos={horariosUnicos}
            horarios={horarios}
            onCellClick={handleCellClick}
          />

          <AbbreviationPanel />
        </div>

        <ReservationModal
          isOpen={reservationModal.open}
          onClose={closeReservationModal}
          day={reservationModal.day}
          timeSlots={reservationModal.timeSlots}
          labDetails={labDetails}
          onReserve={(data) => handleReserveSubmit(data, labDetails)}
        />
        <BookingReservs />
        <ProfileEditModal />
        <LabDetailModal
          isOpen={showDetail}
          onClose={() => setShowDetail(false)}
          labDetails={labDetails}
        />
      </main>
    </div>
  );
}
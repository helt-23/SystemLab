// src/pages/labSchedulePage/LabScheduleComponent.jsx
import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "../../components";
import LabNotFound from "../../components/labNotFound";
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
    userBookings,
    getAllBookingsForLab // Adicione esta função ao contexto
  } = useLabData();

  const labDetails = getLabDetails(labId);
  const scheduleData = getLabSchedule(labId);

  // Obter TODAS as reservas do laboratório, não apenas do usuário
  const allLabBookings = getAllBookingsForLab(labId) || [];
  const userLabBookings = userBookings.filter((b) => b.labId === labId);

  const { horarios, horariosUnicos, diasSemana } = useSchedule(
    scheduleData,
    currentShift,
    allLabBookings // Passar todas as reservas, não apenas do usuário
  );

  // Usando o hook unificado
  const {
    reservationModal,
    openReservationModal,
    closeReservationModal,
    selectedSlots,
    reservationType,
    description,
    file,
    formErrors,
    showConfirmation,
    reservationTypes,
    handleSlotChange,
    handleFileChange,
    setReservationType,
    setDescription,
    validateForm,
    handleConfirmReservation,
    setShowConfirmation,
    reservationSuccess,
    setReservationSuccess
  } = useReservation(labId, addUserBooking);

  useFinishLoadingOnLabChange();

  // Calcular a data base para a semana atual
  const weekStartDate = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday + currentWeek * 7);

    // Garantir que a data é válida
    if (isNaN(monday.getTime())) {
      console.error("Data inválida calculada, usando data atual");
      return new Date();
    }

    return monday;
  }, [currentWeek]);

  const handleCellClick = (dia) => {
    const daySlots = horarios.filter(
      (h) => h.diaSemana === dia && h.tipo === "livre"
    );

    // Mapeamento robusto para nomes completos e abreviados
    const dayMapping = {
      "seg": "segunda", "segunda": "segunda",
      "ter": "terça", "terça": "terça", "terca": "terça",
      "qua": "quarta", "quarta": "quarta",
      "qui": "quinta", "quinta": "quinta",
      "sex": "sexta", "sexta": "sexta"
    };

    const diaNormalizado = dayMapping[dia.toLowerCase()] || dia;

    const dateForDay = new Date(weekStartDate);

    const dayIndexMap = {
      "segunda": 0,
      "terça": 1,
      "quarta": 2,
      "quinta": 3,
      "sexta": 4
    };

    if (dayIndexMap[diaNormalizado] !== undefined) {
      dateForDay.setDate(weekStartDate.getDate() + dayIndexMap[diaNormalizado]);
    } else {
      console.warn(`Dia da semana não mapeado: ${dia} (normalizado: ${diaNormalizado})`);
    }

    // Passamos também os detalhes do laboratório para o modal
    openReservationModal(diaNormalizado, dateForDay, daySlots, labDetails);
  };

  if (!labDetails || !scheduleData) {
    return <LabNotFound />;
  }
  return (
    <div className="lab-schedule">
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
          date={reservationModal.date}
          timeSlots={reservationModal.timeSlots}
          labDetails={reservationModal.labDetails}
          selectedSlots={selectedSlots}
          handleSlotChange={handleSlotChange}
          reservationType={reservationType}
          setReservationType={setReservationType}
          description={description}
          setDescription={setDescription}
          file={file}
          handleFileChange={handleFileChange}
          formErrors={formErrors}
          reservationTypes={reservationTypes}
          validateForm={validateForm}
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          handleConfirmReservation={handleConfirmReservation}
          reservationSuccess={reservationSuccess}
          setReservationSuccess={setReservationSuccess}
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
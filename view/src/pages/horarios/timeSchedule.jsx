import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Adicionei useParams
import { Header, Footer } from "../../components";
import { Info, Clock, Users, Building, ChevronLeft, ChevronRight, X } from "lucide-react";
import { MyReservation } from "../reservations";
import { useLabData } from "../../context/LabDataContext";
import { useSchedule } from "../../customHooks/useSchedule";
import LabDetailModal from "./LabDetailModal";
import AbbreviationPanel from "./AbbreviationPanel";
import "./app.css";
import ReservationModal from "../../components/reservationModal";
import ProfileEditModal from "../../components/profileEditModal";

export function LabScheduleComponent() {
  const { labId } = useParams(); // Obtém o ID do laboratório da URL
  const navigate = useNavigate();
  const [currentShift, setCurrentShift] = useState("manhã");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [reservationModal, setReservationModal] = useState({
    open: false,
    day: '',
    timeSlots: []
  });

  // Use as funções que buscam pelo ID
  const {
    getLabDetails,
    getLabSchedule,
    addUserBooking
  } = useLabData();

  // Busque os dados usando o ID da URL
  const labDetails = getLabDetails(labId);
  const scheduleData = getLabSchedule(labId);

  // Usar hook para horários
  const { horarios, horariosUnicos, diasSemana } = useSchedule(scheduleData, currentShift);

  const openReservationModal = (dia) => {
    const daySlots = horarios.filter(h => h.diaSemana === dia && h.tipo === "livre");
    setReservationModal({
      open: true,
      day: dia,
      timeSlots: daySlots
    });
  };

  const handleReserveSubmit = (reservationData) => {
    const newBooking = {
      labId: labId, // Use o ID da URL
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
    setReservationModal({ open: false, day: '', timeSlots: [] });
  };

  // Componentes Internos
  const ShiftSelector = () => (
    <div className="shift-selector">
      <div className="shift-selector__buttons">
        {scheduleData && Object.keys(scheduleData.shifts).map(shift => (
          <button
            key={shift}
            onClick={() => setCurrentShift(shift)}
            className={`shift-selector__button ${currentShift === shift ? 'shift-selector__button--active' : ''}`}
          >
            {shift.charAt(0).toUpperCase() + shift.slice(1)}
          </button>
        ))}
      </div>
      <WeekControls />
    </div>
  );

  const WeekControls = () => (
    <div className="week-controls">
      <button onClick={() => setCurrentWeek(w => Math.max(w - 1, 0))}>
        <ChevronLeft size={20} />
      </button>
      <span>Semana {currentWeek + 1}</span>
      <button onClick={() => setCurrentWeek(w => w + 1)}>
        <ChevronRight size={20} />
      </button>
    </div>
  );

  const LabInfoCard = ({ labDetails, setShowDetail }) => (
    <div className="lab-info-card">
      <div className="lab-info-card__icon-container">
        <Building size={20} />
      </div>
      <div>
        <h2 className="lab-info-card__title">{labDetails?.descricao}</h2>
        <div className="lab-info-card__details">
          <div className="lab-info-card__details-item">
            <Users size={14} /> {labDetails?.lugares} lugares
          </div>
          <div className="lab-info-card__details-item">
            <Clock size={14} /> {labDetails?.sala}
          </div>
        </div>
      </div>
      <button
        className="lab-info-card__button"
        onClick={() => setShowDetail(true)}
      >
        <Info size={18} />
      </button>
      <LabDetailModal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        labDetails={labDetails || {}}
      />
    </div>
  );

  if (!labDetails || !scheduleData) {
    return <div>Laboratório não encontrado</div>;
  }

  return (
    <div className="lab-schedule">
      <Header />
      <main className="main-content">
        <LabInfoCard labDetails={labDetails} setShowDetail={setShowDetail} />
        {scheduleData && <ShiftSelector />}

        <div className="schedule-table-wrapper">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Horário</th>
                {diasSemana.map(dia => <th key={dia}>{dia}</th>)}
              </tr>
            </thead>
            <tbody>
              {horariosUnicos.map(time => (
                <tr key={time}>
                  <td>{time}</td>
                  {diasSemana.map(dia => {
                    const horario = horarios.find(h =>
                      h.diaSemana === dia &&
                      `${h.horaInicio} - ${h.horaFim}` === time
                    );

                    if (!horario) return <td key={`${time}-${dia}`}></td>;

                    let cellType = '';
                    let cellContent = null;

                    switch (horario.tipo) {
                      case "aula":
                        cellType = 'class';
                        cellContent = (
                          <div className="cell-content">
                            <div className="cell-title">{horario.dados.materia}</div>
                            <div className="cell-subtitle">{horario.dados.professor}</div>
                          </div>
                        );
                        break;

                      case "reservado":
                        cellType = 'reserved';
                        cellContent = (
                          <div className="cell-content">
                            <div className="cell-title">
                              {horario.isUserBooking ? "Sua Reserva" : "Reservado"}
                            </div>
                            <div className="cell-subtitle">
                              {horario.dados.usuario.nome}
                            </div>
                            <div className="cell-status-badge">
                              {horario.dados.status === "Confirmada" && (
                                <span className="status-confirmada">Confirmada</span>
                              )}
                            </div>
                          </div>
                        );
                        break;

                      default:
                        cellType = 'available';
                        cellContent = (
                          <div className="cell-content">
                            <div className="cell-title">Livre</div>
                            <div className="cell-subtitle">Clique para reservar</div>
                          </div>
                        );
                    }

                    return (
                      <td
                        key={`${time}-${dia}`}
                        className={cellType === "available" ? "clickable-cell" : ""}
                        onClick={() => {
                          if (horario.tipo === "livre") {
                            openReservationModal(dia);
                          }
                        }}
                      >
                        <div className={`cell-status ${cellType}`}>
                          {cellContent}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AbbreviationPanel />

        <ReservationModal
          isOpen={reservationModal.open}
          onClose={() => setReservationModal({ open: false, day: '', timeSlots: [] })}
          day={reservationModal.day}
          timeSlots={reservationModal.timeSlots}
          labDetails={labDetails}
          onReserve={handleReserveSubmit}
        />

        <LabDetailModal
          isOpen={showDetail}
          onClose={() => setShowDetail(false)}
          labDetails={labDetails}
        />
      </main>
      <Footer />
      <MyReservation />
      <ProfileEditModal />
    </div>
  );
}
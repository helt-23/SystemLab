import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header, Footer } from "../../components";
import {
  Info,
  Clock,
  Users,
  Building,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { MyReservation } from "../reservations";
import { useLabData } from "../../context/LabDataContext";
import { useSchedule } from "../../customHooks/useSchedule";
import LabDetailModal from "./LabDetailModal";
import AbbreviationPanel from "./AbbreviationPanel";
import "./app.css";
import ReservationModal from "../../components/reservationModal";
import ProfileEditModal from "../../components/profileEditModal";
import { useLoading } from "../../context/LoadingContext";

export function LabScheduleComponent() {
  const { labId } = useParams(); // Pega o ID do laboratório da URL
  const navigate = useNavigate();
  const [currentShift, setCurrentShift] = useState("manhã");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [reservationModal, setReservationModal] = useState({
    open: false,
    day: "",
    timeSlots: []
  });
  const { finishLoading } = useLoading();

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      finishLoading();
    }, 1500);

    return () => clearTimeout(timer);
  }, [labId, finishLoading]);

  // Função para voltar à lista de laboratórios
  const handleBackToLabs = () => {
    navigate("/laboratorios");
  };

  // Hooks do contexto
  const {
    getLabDetails,
    getLabSchedule,
    addUserBooking,
    userBookings
  } = useLabData();

  // Busca estática de detalhes e horários básicos (sem reservas)
  const labDetails = getLabDetails(labId);
  const scheduleData = getLabSchedule(labId);

  // Filtra apenas as reservas que existem para ESTE laboratório
  const labBookings = userBookings.filter((b) => b.labId === labId);

  // Agora sim, passa scheduleData + currentShift + labBookings para o hook
  const { horarios, horariosUnicos, diasSemana } = useSchedule(
    scheduleData,
    currentShift,
    labBookings
  );

  // Abre modal de reserva para aquele dia que foi clicado
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

  // Callback quando o usuário confirma a reserva no modal
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
      // IMPORTANTE: armazenamos exatamente "HH:mm - HH:mm"
      horario: `${reservationData.startTime} - ${reservationData.endTime}`,
      usuario: { nome: "João Silva", matricula: "2023001" }
    };

    addUserBooking(newBooking);
    setReservationModal({ open: false, day: "", timeSlots: [] });
  };

  // Se não há dados do laboratório ou do schedule, exibe mensagem
  if (!labDetails || !scheduleData) {
    return <div>Laboratório não encontrado</div>;
  }

  // Componentes internos: seletor de turno e controles de semana
  const ShiftSelector = () => (
    <div className="shift-selector">
      <div className="shift-selector__buttons">
        {scheduleData &&
          Object.keys(scheduleData.shifts).map((shift) => (
            <button
              key={shift}
              onClick={() => setCurrentShift(shift)}
              className={`shift-selector__button ${currentShift === shift ? "shift-selector__button--active" : ""
                }`}
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
      <button onClick={() => setCurrentWeek((w) => Math.max(w - 1, 0))}>
        <ChevronLeft size={20} />
      </button>
      <span>Semana {currentWeek + 1}</span>
      <button onClick={() => setCurrentWeek((w) => w + 1)}>
        <ChevronRight size={20} />
      </button>
    </div>
  );

  // Card de informações do laboratório
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
        <LabInfoCard labDetails={labDetails} setShowDetail={setShowDetail} />
        {scheduleData && <ShiftSelector />}

        <div className="schedule-table-wrapper">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Horário</th>
                {diasSemana.map((dia) => (
                  <th key={dia}>{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horariosUnicos.map((time) => (
                <tr key={time}>
                  <td>{time}</td>
                  {diasSemana.map((dia) => {
                    const horario = horarios.find(
                      (h) =>
                        h.diaSemana === dia &&
                        `${h.horaInicio} - ${h.horaFim}` === time
                    );

                    if (!horario) return <td key={`${time}-${dia}`}></td>;

                    let cellType = "";
                    let cellContent = null;

                    /** aula */
                    if (horario.tipo === "aula") {
                      cellType = "class";
                      cellContent = (
                        <div className="cell-content">
                          <div className="cell-title">
                            {horario.dados.materia}
                          </div>
                          <div className="cell-subtitle">
                            {horario.dados.professor}
                          </div>
                        </div>
                      );
                    }
                    /** reservado */
                    else if (horario.tipo === "reservado") {
                      cellType = "reserved";
                      cellContent = (
                        <div className="cell-content">
                          <div className="cell-title">
                            {horario.isUserBooking
                              ? "Sua Reserva"
                              : "Reservado"}
                          </div>
                          <div className="cell-subtitle">
                            {horario.dados.usuario.nome}
                          </div>
                          <div className="cell-status-badge">
                            {/*<span
                              className={`status-${horario.dados.status
                                .toLowerCase()
                                .replace(" ", "-")}`}
                            >
                              {horario.dados.status}
                            </span> */}
                          </div>
                        </div>
                      );
                    }
                    /** livre */
                    else {
                      cellType = "available";
                      cellContent = (
                        <div className="cell-content">
                          <div className="cell-title">Livre</div>
                          <div className="cell-subtitle">
                            Clique para reservar
                          </div>
                        </div>
                      );
                    }

                    return (
                      <td
                        key={`${time}-${dia}`}
                        className={
                          cellType === "available" ? "clickable-cell" : ""
                        }
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
          onClose={() =>
            setReservationModal({ open: false, day: "", timeSlots: [] })
          }
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

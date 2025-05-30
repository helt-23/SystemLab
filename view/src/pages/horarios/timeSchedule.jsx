import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../../components";
import { Info, Clock, Users, Building, ChevronLeft, ChevronRight, X } from "lucide-react";
import ReservationModal from "../../components/reservationModal"; // Importe o componente ReservationModal
import "./app.css";

// Helper function to extract start and end times
const extractTimeRange = (time) => {
  const [start, end] = time.split(' - ');
  return { start, end };
};

// Mock Data Service
const mockLabService = {
  getLabDetails: () => ({
    id: 1,
    sala: "Sala 101 - Bloco A",
    lugares: 25,
    descricao: "Laboratório de Informática",
    detalhe: "Definitivamente não possui hardwares e softwares de última geração. Possui vários computadores, pelo menos eles estão ligando.",
    horarios: []
  }),

  getSchedule: () => ({
    diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
    shifts: {
      manhã: ["07:00 - 07:50", "08:00 - 08:50", "09:00 - 09:50", "10:00 - 10:50", "11:00 - 11:50"],
      tarde: ["13:00 - 13:50", "14:00 - 14:50", "15:00 - 15:50", "16:00 - 16:50", "17:00 - 17:50"],
      noite: ["19:00 - 19:50", "20:00 - 20:50", "21:00 - 21:50"]
    },
    reservas: [
      {
        dia: "Qua",
        horario: "07:00 - 07:50",
        usuario: { nome: "João Silva", matricula: "2023001" },
        data: "2024-03-15T07:00:00"
      }
    ],
    aulas: [
      {
        dia: "Seg",
        horario: "07:00 - 07:50",
        materia: "IHC",
        professor: "Prof. Marcela",
        turma: "CC 2023"
      },
      {
        dia: "Seg",
        horario: "08:00 - 08:50",
        materia: "IHC",
        professor: "Prof. Marcela",
        turma: "CC 2023"
      },
      {
        dia: "Seg",
        horario: "09:00 - 09:50",
        materia: "IHC",
        professor: "Prof. Marcela",
        turma: "2025.2"
      },
      {
        dia: "Seg",
        horario: "10:00 - 10:50",
        materia: "IHC",
        professor: "Prof. Marcela",
        turma: "CC 2025.2"
      },
      {
        dia: "Sex",
        horario: "14:00 - 14:50",
        materia: "Redes",
        professor: "Prof. Pedro",
        turma: "CC 2023"
      }
    ]
  })
};

// Componente Modal
const LabDetailModal = ({ isOpen, onClose, labDetails }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <X size={20} />
        </button>
        <h3 className="modal__title">Detalhes do Laboratório</h3>
        <p className="modal__text">{labDetails.detalhe}</p>
      </div>
    </div>
  );
};

// Painel de Abreviações
const AbbreviationPanel = () => (
  <section className="abbreviation-panel">
    <h3 className="abbreviation-panel__header">
      <Info size={18} /> Legenda de Abreviações
    </h3>
    <div className="abbreviation-panel__list">
      <div className="abbreviation-panel__item">
        <span>Livre</span>
        <span style={{ color: '#166534', fontWeight: '500' }}>●</span>
      </div>
      <div className="abbreviation-panel__item">
        <span>Reservado</span>
        <span style={{ color: '#991b1b', fontWeight: '500' }}>●</span>
      </div>
      <div className="abbreviation-panel__item">
        <span>Aula</span>
        <span style={{ color: '#143695', fontWeight: '500' }}>●</span>
      </div>
    </div>
  </section>
);

// Componente Principal
export function LabScheduleComponent() {
  const navigate = useNavigate();
  const [currentShift, setCurrentShift] = useState("manhã");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  // Estado para controlar o modal de reserva
  const [reservationModal, setReservationModal] = useState({
    open: false,
    day: '',
    timeSlots: []
  });

  // Dados mockados
  const labDetails = useMemo(() => mockLabService.getLabDetails(), []);
  const scheduleData = useMemo(() => mockLabService.getSchedule(), []);

  const [horarios, setHorarios] = useState([]);
  const [diasSemana] = useState(scheduleData.diasSemana);

  // Calcular horários únicos baseado no turno atual
  const horariosUnicos = useMemo(() => {
    return scheduleData.shifts[currentShift] || [];
  }, [currentShift, scheduleData.shifts]);

  // Simular busca de dados
  useEffect(() => {
    const loadData = () => {
      const mockHorarios = scheduleData.shifts[currentShift].flatMap(time => {
        return diasSemana.map(dia => {
          // Verificar se há reserva
          const reserva = scheduleData.reservas.find(r =>
            r.dia === dia && r.horario === time
          );

          // Verificar se há aula
          const aula = scheduleData.aulas.find(a =>
            a.dia === dia && a.horario === time
          );

          // Prioridade: Aula > Reserva > Livre
          if (aula) {
            return {
              horaInicio: extractTimeRange(time).start,
              horaFim: extractTimeRange(time).end,
              diaSemana: dia,
              tipo: "aula",
              dados: aula,
              horario: time // Adicionando o horário completo
            };
          } else if (reserva) {
            return {
              horaInicio: extractTimeRange(time).start,
              horaFim: extractTimeRange(time).end,
              diaSemana: dia,
              tipo: "reservado",
              dados: reserva,
              horario: time
            };
          } else {
            return {
              horaInicio: extractTimeRange(time).start,
              horaFim: extractTimeRange(time).end,
              diaSemana: dia,
              tipo: "livre",
              dados: null,
              horario: time
            };
          }
        });
      });
      setHorarios(mockHorarios);
    };

    loadData();
  }, [currentShift, diasSemana, scheduleData]);

  // Função para abrir o modal de reserva
  const openReservationModal = (dia) => {
    // Filtra todos os horários do dia selecionado
    const daySlots = horarios.filter(h => h.diaSemana === dia);

    setReservationModal({
      open: true,
      day: dia,
      timeSlots: daySlots
    });
  };

  // Função para submeter a reserva
  const handleReserveSubmit = (reservationData) => {
    console.log("Dados da reserva:", reservationData);
    // Aqui você enviaria os dados para o backend
    // Após o sucesso, você pode atualizar o estado para refletir a nova reserva
  };

  // Componentes Internos
  const ShiftSelector = () => (
    <div className="shift-selector">
      <div className="shift-selector__buttons">
        {Object.keys(scheduleData.shifts).map(shift => (
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

  const LabInfoCard = () => (
    <div className="lab-info-card">
      <div className="lab-info-card__icon-container">
        <Building size={20} />
      </div>
      <div>
        <h2 className="lab-info-card__title">{labDetails.descricao}</h2>
        <div className="lab-info-card__details">
          <div className="lab-info-card__details-item">
            <Users size={14} /> {labDetails.lugares} lugares
          </div>
          <div className="lab-info-card__details-item">
            <Clock size={14} /> {labDetails.sala}
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
        labDetails={labDetails}
      />
    </div>
  );

  // Renderização
  return (
    <div className="lab-schedule">
      <Header />
      <main className="main-content">
        <LabInfoCard />
        <ShiftSelector />

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

                    // Determinar o tipo de célula
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
                            <div className="cell-title">Reservado</div>
                            <div className="cell-subtitle">{horario.dados.usuario.nome}</div>
                          </div>
                        );
                        break;

                      default: // livre
                        cellType = 'available';
                        cellContent = (
                          <div className="cell-content">
                            <div className="cell-title">Livre</div>
                            <div className="cell-subtitle">Clique para reservar</div>
                          </div>
                        );
                    }

                    return (
                      <td key={`${time}-${dia}`}>
                        <div
                          className={`cell-status ${cellType}`}
                          onClick={() => {
                            if (horario.tipo === "livre") {
                              openReservationModal(dia);
                            }
                          }}
                        >
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

        {/* Modal de Reserva */}
        <ReservationModal
          isOpen={reservationModal.open}
          onClose={() => setReservationModal({ open: false, day: '', timeSlots: [] })}
          day={reservationModal.day}
          timeSlots={reservationModal.timeSlots}
          onReserve={handleReserveSubmit}
        />
      </main>
      <Footer />
    </div>
  );
}
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header, Footer } from "../../components";
import { Info, Clock, Users, Building, ChevronLeft, ChevronRight, X } from "lucide-react";
import "./app.css";

// Helper function to extract start and end times
const extractTimeRange = (time) => {
  const [start, end] = time.split(' - ');
  return { start, end };
};

// 1. Mock Data Service (será substituído pela API)
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
        dia: "Seg",
        horario: "07:00 - 07:50",
        usuario: { nome: "João Silva", matricula: "2023001" },
        data: "2024-03-15T07:00:00"
      }
    ]
  })
};

// 2. Componentes de UI
const LabDetailModal = ({ isOpen, onClose, labDetails }) => {
  if (!isOpen) return null;

  // Adicionar prevenção de propagação de evento no overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          onClick={onClose} // Garantir que chama onClose diretamente
        >
          <X size={20} />
        </button>
        <h3 className="modal__title">Detalhes do Laboratório</h3>
        <p className="modal__text">{labDetails.detalhe}</p>
      </div>
    </div>
  );
};

const AbbreviationPanel = () => (
  <section className="abbreviation-panel">
    <h3 className="abbreviation-panel__header">
      <Info size={18} /> Legenda de Abreviações
    </h3>
    <span>Até segunda ordem, aqui não terá abreviações.</span>
    {/*<div className="abbreviation-panel__list">
      {mockLabService.getSchedule().diasSemana.map((dia, idx) => (
        <div key={idx} className="abbreviation-panel__item">
          <span className="abbreviation-panel__abbr">{dia}:</span>
          <span className="abbreviation-panel__full">{`${dia}unda-feira`}</span>
        </div>
      ))}
    </div>*/}
  </section>
);

// 3. Componente Principal
export function LabScheduleComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentShift, setCurrentShift] = useState("manhã");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  // Dados mockados (serão substituídos pela API)
  const labDetails = useMemo(() => mockLabService.getLabDetails(), []);
  const scheduleData = useMemo(() => mockLabService.getSchedule(), []);

  // Estado compatível com a versão antiga
  const [horarios, setHorarios] = useState([]);
  const [diasSemana] = useState(scheduleData.diasSemana);
  const [horariosUnicos] = useState(scheduleData.shifts[currentShift]);

  // Simular busca de dados
  useEffect(() => {
    const loadData = () => {
      const mockHorarios = scheduleData.shifts[currentShift].flatMap(time =>
        diasSemana.map(dia => ({
          horaInicio: extractTimeRange(time).start,
          horaFim: extractTimeRange(time).end,
          diaSemana: dia,
          disponivel: !scheduleData.reservas.some(r => r.dia === dia && r.horario === time),
          reservaHorario: scheduleData.reservas.find(r => r.dia === dia && r.horario === time) || null
        }))
      );
      setHorarios(mockHorarios);
    };

    loadData();
  }, [currentShift, diasSemana, scheduleData]);

  // 4. Handlers compatíveis com a versão antiga
  const navegarReserva = (diaSemana) => {
    navigate("/realizarReservas", {
      state: {
        ...labDetails,
        diaSemana,
        week: currentWeek,
        horarios: horarios.filter(h => h.diaSemana === diaSemana)
      }
    });
  };

  // 5. Componentes Internos
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
        <h2>{labDetails.descricao}</h2>
        <div className="lab-info-card__details">
          <div><Building size={14} /> {labDetails.lugares} lugares</div>
          <div><Clock size={14} /> {labDetails.sala}</div>
        </div>
      </div>
      <button onClick={() => setShowDetail(true)}>
        <Info size={18} />
      </button>
      <LabDetailModal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)} // Passar função de fechamento correta
        labDetails={labDetails}
      />
    </div>
  );

  // 6. Renderização
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
                      `${extractTimeRange(time).start} - ${extractTimeRange(time).end}` === time && h.diaSemana === dia
                    );
                    return (
                      <td key={`${time}-${dia}`}>
                        <div
                          className={`card-status ${horario?.disponivel ? 'available' : 'reserved'}`}
                          onClick={() => horario?.disponivel && navegarReserva(dia)}
                        >
                          {horario?.disponivel ? 'Livre' : (
                            <>
                              <span>Reservado</span>
                              <small>{horario?.reservaHorario?.usuario.nome}</small>
                            </>
                          )}
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
      </main>
      <Footer />
    </div>
  );
}
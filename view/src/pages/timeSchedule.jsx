// LabScheduleComponent.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../components";
import {
  Info,
  Clock,
  Users,
  Building,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import "./horarios/app.css";

// Modal de detalhes do laboratório
const LabDetailModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <X size={20} />
        </button>
        <h3 className="modal__title">Detalhes do Laboratório</h3>
        <p className="modal__text">
          Este laboratório possui 25 computadores com processadores Intel i5 de
          10ª geração, 8 GB de RAM cada, e todos equipados com softwares de
          desenvolvimento, suítes de escritório e acesso à internet de alta
          velocidade. Há também um projetor multimídia de alta definição e
          lousa interativa. Ideal para aulas práticas de programação, redes e
          computação gráfica.
        </p>
        <p className="modal__text">
          Em breve você poderá adicionar mais informações aqui, como horários
          de manutenção, instrutores responsáveis e links de referência.
        </p>
      </div>
    </div>
  );
};

// Painel de Abreviações
const AbbreviationPanel = () => {
  const abbreviations = [
    { abbr: "Seg", full: "Segunda-feira" },
    { abbr: "Ter", full: "Terça-feira" },
    { abbr: "Qua", full: "Quarta-feira" },
    { abbr: "Qui", full: "Quinta-feira" },
    { abbr: "Sex", full: "Sexta-feira" },
    { abbr: "Sab", full: "Sábado" },
  ];

  return (
    <section className="abbreviation-panel">
      <h3 className="abbreviation-panel__header">
        <Info size={18} />
        Legenda de Abreviações
      </h3>
      <div className="abbreviation-panel__list">
        {abbreviations.map((item, idx) => (
          <div key={idx} className="abbreviation-panel__item">
            <span className="abbreviation-panel__abbr">{item.abbr}:</span>
            <span className="abbreviation-panel__full">{item.full}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export function LabScheduleComponent() {
  const navigate = useNavigate();
  const [currentShift, setCurrentShift] = useState("manhã");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const generateSlots = (start, end) => {
    const slots = [];
    const toMin = (h, m) => h * 60 + m;
    const fromMin = (t) => {
      const hh = Math.floor(t / 60);
      const mm = t % 60;
      return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    };

    let [h0, m0] = start.split(":").map(Number);
    const [h1, m1] = end.split(":").map(Number);
    let current = toMin(h0, m0);
    const final = toMin(h1, m1);

    while (current + 50 <= final) {
      slots.push(`${fromMin(current)} - ${fromMin(current + 50)}`);
      current += 50;
    }
    return slots;
  };

  const shiftDefinitions = useMemo(
    () => ({
      manhã: generateSlots("07:00", "12:00"),
      tarde: generateSlots("13:00", "18:20"),
      noite: generateSlots("19:00", "22:00"),
    }),
    []
  );

  const horarios = useMemo(() => {
    const nomes = ["João", "Maria", "Carlos", "Ana", "Pedro"];
    const base = new Date("2024-03-15T00:00:00").getTime();
    const all = [];
    Object.values(shiftDefinitions).forEach((slots) =>
      slots.forEach((slot) =>
        diasSemana.forEach((dia) => {
          const disponivel = Math.random() > 0.4;
          const [hi, hf] = slot.split(" - ");
          const obj = { horaInicio: hi, horaFim: hf, diaSemana: dia, disponivel };
          if (!disponivel) {
            const nome = nomes[Math.floor(Math.random() * nomes.length)];
            const offset =
              (Math.floor(Math.random() * 5 * 60) + Math.random() * 60) *
              60000;
            obj.reservaHorario = {
              usuarioReserva: { nome },
              dataReserva: new Date(base + offset).toISOString(),
            };
          }
          all.push(obj);
        })
      )
    );
    return all;
  }, [shiftDefinitions]);

  const listHorarios = (time) =>
    diasSemana.map((dia) =>
      horarios.find(
        (h) =>
          `${h.horaInicio} - ${h.horaFim}` === time && h.diaSemana === dia
      ) || { disponivel: false }
    );

  const navegarReserva = (diaSemana) => {
    navigate("/realizarReservas", { state: { diaSemana, week: currentWeek } });
  };

  const shifts = Object.keys(shiftDefinitions);

  const ShiftSelector = () => (
    <div className="shift-selector">
      <div className="shift-selector__buttons">
        {shifts.map((shift) => (
          <button
            key={shift}
            onClick={() => setCurrentShift(shift)}
            className={
              "shift-selector__button" +
              (currentShift === shift ? " shift-selector__button--active" : "")
            }
          >
            {shift.charAt(0).toUpperCase() + shift.slice(1)}
          </button>
        ))}
      </div>
      <div className="week-controls">
        <button
          onClick={() => setCurrentWeek((w) => Math.max(w - 1, 0))}
          className="week-controls__button"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="week-controls__label">Semana {currentWeek + 1}</span>
        <button
          onClick={() => setCurrentWeek((w) => w + 1)}
          className="week-controls__button"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  const LabInfoCard = () => (
    <div className="lab-info-card">
      <div className="lab-info-card__icon-container">
        <Building size={20} />
      </div>
      <div>
        <h2 className="lab-info-card__title">{labData.descricao}</h2>
        <div className="lab-info-card__details">
          <div className="lab-info-card__details-item">
            <Users size={14} />
            {labData.lugares} lugares
          </div>
          <div className="lab-info-card__details-item">
            <Clock size={14} />
            {labData.sala}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowDetail(true)}
        className="lab-info-card__button"
      >
        <Info size={18} />
      </button>
      <LabDetailModal isOpen={showDetail} onClose={() => setShowDetail(false)} />
    </div>
  );

  const ScheduleTable = () => (
    <div className="schedule-table-wrapper">
      <ShiftSelector />
      <table className="schedule-table">
        <thead>
          <tr>
            <th className="time-col">Horário</th>
            {diasSemana.map((dia) => (
              <th key={dia}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shiftDefinitions[currentShift].map((time, ridx) => (
            <tr key={ridx}>
              <td>{time}</td>
              {listHorarios(time).map((hor, cidx) => (
                <td key={cidx}>
                  <div
                    onClick={() =>
                      hor.disponivel && navegarReserva(hor.diaSemana)
                    }
                    className={
                      "schedule-table__cell " +
                      (hor.disponivel ? "available" : "busy")
                    }
                  >
                    <span>
                      {hor.disponivel ? "Livre" : "Ocupado"}
                    </span>
                    {!hor.disponivel && hor.reservaHorario && (
                      <div>{hor.reservaHorario.usuarioReserva.nome}</div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const labData = {
    sala: "Sala 101 - Bloco A",
    lugares: 25,
    descricao: "Laboratório de Informática",
  };

  return (
    <div className="lab-schedule">
      <Header />
      <main className="main-content">
        <LabInfoCard />
        <ScheduleTable />
        <AbbreviationPanel />
      </main>
      <Footer />
    </div>
  );
}

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./app.css";

const WeekControls = ({ currentWeek, setCurrentWeek }) => {
  // Função para calcular o intervalo de datas da semana
  const getWeekRange = (weekOffset) => {
    const today = new Date();
    const startOfWeek = new Date(today);

    // Calcula o início da semana (domingo)
    startOfWeek.setDate(today.getDate() - today.getDay() + weekOffset * 7);

    // Calcula o final da semana (sábado)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Formata o mês
    const formatMonth = (date) => {
      return date.toLocaleDateString('pt-BR', { month: 'short' })
        .replace('.', '') // Remove o ponto da abreviação
        .toLowerCase();
    };

    // Formata o dia
    const formatDay = (date) => date.getDate();

    const startDay = formatDay(startOfWeek);
    const startMonth = formatMonth(startOfWeek);
    const endDay = formatDay(endOfWeek);
    const endMonth = formatMonth(endOfWeek);

    // Verifica se está no mesmo mês
    if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
      return `${startDay} - ${endDay} de ${endMonth}`;
    } else {
      return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
    }
  };

  return (
    <div className="week-controls">
      <button
        onClick={() => setCurrentWeek((w) => Math.max(w - 1, 0))}
        disabled={currentWeek === 0}
      >
        <ChevronLeft size={20} />
      </button>
      <span>{getWeekRange(currentWeek)}</span>
      <button onClick={() => setCurrentWeek((w) => w + 1)}>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default WeekControls;
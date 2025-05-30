import { useState, useEffect } from "react";

// Helper function to extract start and end times
export const extractTimeRange = (time) => {
  const [start, end] = time.split(" - ");
  return { start, end };
};

export const useSchedule = (scheduleData, currentShift) => {
  const [horarios, setHorarios] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);
  const [horariosUnicos, setHorariosUnicos] = useState([]);

  useEffect(() => {
    if (!scheduleData) return;

    setDiasSemana(scheduleData.diasSemana || []);

    // Atualizar horários únicos baseados no turno
    if (scheduleData.shifts && scheduleData.shifts[currentShift]) {
      setHorariosUnicos(scheduleData.shifts[currentShift]);
    } else {
      setHorariosUnicos([]);
    }
  }, [scheduleData, currentShift]);

  useEffect(() => {
    if (!scheduleData || !horariosUnicos.length) return;

    const processHorarios = () => {
      const mockHorarios = horariosUnicos.flatMap((time) => {
        return diasSemana.map((dia) => {
          const reserva = scheduleData.reservas?.find(
            (r) => r.dia === dia && r.horario === time
          );

          const aula = scheduleData.aulas?.find(
            (a) => a.dia === dia && a.horario === time
          );

          // Prioridade: Aula > Reserva > Livre
          if (aula) {
            return {
              horaInicio: extractTimeRange(time).start,
              horaFim: extractTimeRange(time).end,
              diaSemana: dia,
              tipo: "aula",
              dados: aula,
              horario: time,
            };
          } else if (reserva) {
            return {
              horaInicio: extractTimeRange(time).start,
              horaFim: extractTimeRange(time).end,
              diaSemana: dia,
              tipo: "reservado",
              dados: reserva,
              horario: time,
            };
          } else {
            return {
              horaInicio: extractTimeRange(time).start,
              horaFim: extractTimeRange(time).end,
              diaSemana: dia,
              tipo: "livre",
              dados: null,
              horario: time,
            };
          }
        });
      });
      setHorarios(mockHorarios);
    };

    processHorarios();
  }, [scheduleData, diasSemana, horariosUnicos]);

  return {
    horarios,
    horariosUnicos,
    diasSemana,
  };
};

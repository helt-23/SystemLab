import { useMemo } from "react";

export const extractTimeRange = (time) => {
  if (!time) return { start: "", end: "" };
  const [start, end] = time.split(" - ");
  return { start, end };
};

export const useSchedule = (scheduleData, currentShift) => {
  // 1. Hook SEMPRE executado
  const diasSemana = useMemo(
    () => scheduleData?.diasSemana || [],
    [scheduleData]
  );

  // 2. Hook SEMPRE executado
  const horariosUnicos = useMemo(
    () => scheduleData?.shifts?.[currentShift] || [],
    [scheduleData, currentShift]
  );

  // 3. Hook SEMPRE executado (remover condição inicial)
  const horarios = useMemo(() => {
    // Mover a condição para dentro do Hook
    if (!scheduleData || !horariosUnicos.length) return [];

    return horariosUnicos.flatMap((time) =>
      diasSemana.map((dia) => {
        const { start: horaInicio, end: horaFim } = extractTimeRange(time);

        // Verifica se há aula cadastrada
        const aula = scheduleData.aulas?.find(
          (a) => a.dia === dia && a.horario === time
        );
        if (aula) {
          return {
            horaInicio,
            horaFim,
            diaSemana: dia,
            tipo: "aula",
            dados: aula,
            horario: time,
          };
        }

        // Verifica reserva confirmada
        const reserva = scheduleData.reservas?.find(
          (r) =>
            r.dia === dia && r.horario === time && r.status === "Confirmada"
        );
        if (reserva) {
          const isUserBooking = reserva.usuario?.matricula === "2023001";
          return {
            horaInicio,
            horaFim,
            diaSemana: dia,
            tipo: "reservado",
            dados: reserva,
            horario: time,
            isUserBooking,
          };
        }

        // Caso não haja aula nem reserva
        return {
          horaInicio,
          horaFim,
          diaSemana: dia,
          tipo: "livre",
          dados: null,
          horario: time,
        };
      })
    );
  }, [scheduleData, diasSemana, horariosUnicos]);

  return { diasSemana, horariosUnicos, horarios };
};

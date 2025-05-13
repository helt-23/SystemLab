import { Header, Footer } from "../components";
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export function LabScheduleComponent() {
  const navigate = useNavigate();
  const [currentShift, setCurrentShift] = useState("manhã");

  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  // Gera intervalos de horário a cada 50 minutos
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

  // Define os turnos com base nos intervalos
  const shiftDefinitions = useMemo(
    () => ({
      manhã: generateSlots("07:00", "12:00"),
      tarde: generateSlots("13:00", "18:20"),
      noite: generateSlots("19:00", "22:00"),
    }),
    []
  );

  // Mock aleatório de disponibilidade e reservas
  const horarios = useMemo(() => {
    const nomes = ["João Silva", "Maria Souza", "Carlos Lima", "Ana Costa", "Pedro Rocha"];
    const baseDate = new Date("2024-03-15T00:00:00").getTime();

    const all = [];
    Object.values(shiftDefinitions).forEach((slots) => {
      slots.forEach((slot) => {
        diasSemana.forEach((dia) => {
          const disponivel = Math.random() > 0.4;
          const [hi, hf] = slot.split(" - ");
          const obj = { horaInicio: hi, horaFim: hf, diaSemana: dia, disponivel };
          if (!disponivel) {
            // reserva aleatória num dos nomes
            const nome = nomes[Math.floor(Math.random() * nomes.length)];
            const offset = Math.floor(Math.random() * 5 * 60 + Math.random() * 60) * 60 * 1000;
            obj.reservaHorario = {
              usuarioReserva: { nome },
              dataReserva: new Date(baseDate + offset).toISOString(),
            };
          }
          all.push(obj);
        });
      });
    });
    return all;
  }, [shiftDefinitions]);

  const getShiftTimes = () => shiftDefinitions[currentShift];

  const listHorarios = (time) =>
    diasSemana.map((dia) =>
      horarios.find(
        (h) => `${h.horaInicio} - ${h.horaFim}` === time && h.diaSemana === dia
      ) || { disponivel: false }
    );

  const labData = {
    sala: "Sala 101 - Bloco A",
    lugares: 25,
    descricao: "Laboratório de Informática",
    detalhe: "Equipado com 25 computadores i5 e projetor multimídia",
  };

  const navegarReserva = (diaSemana) => {
    navigate("/realizarReservas", { state: { diaSemana } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0">
      <Header />

      <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {labData.descricao}
        </h2>
        <div className="space-y-2 text-gray-600">
          <p>Lugares disponíveis: {labData.lugares}</p>
          <p>Localização: {labData.sala}</p>
          <p className="text-gray-700">{labData.detalhe}</p>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex gap-2">
            {Object.keys(shiftDefinitions).map((shift) => (
              <button
                key={shift}
                onClick={() => setCurrentShift(shift)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentShift === shift
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {shift.charAt(0).toUpperCase() + shift.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-48 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Horário
                </th>
                {diasSemana.map((dia, idx) => (
                  <th
                    key={idx}
                    className="w-48 px-4 py-3 text-sm font-semibold text-gray-700"
                  >
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {getShiftTimes().map((time, idx) => (
                <tr key={idx}>
                  <td className="w-48 px-4 py-3 text-sm text-gray-600 font-medium">
                    {time}
                  </td>
                  {listHorarios(time).map((hor, i2) => (
                    <td key={i2} className="w-48 h-24 border p-2 align-top">
                      <div
                        onClick={() =>
                          hor.disponivel && navegarReserva(hor.diaSemana)
                        }
                        className={`h-full w-full p-2 rounded-lg transition-colors ${hor.disponivel
                          ? "bg-green-100 hover:bg-green-200 cursor-pointer"
                          : "bg-red-100 hover:bg-red-200"
                          }`}
                      >
                        {hor.disponivel ? (
                          <span className="text-sm text-green-800 font-medium">
                            Disponível
                          </span>
                        ) : hor.reservaHorario ? (
                          <div className="text-red-800 text-sm">
                            <span className="block font-medium">Reservado</span>
                            <span className="block mt-1">
                              {hor.reservaHorario.usuarioReserva.nome}
                            </span>
                            <span className="block">
                              {new Date(
                                hor.reservaHorario.dataReserva
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <span className="font-medium">Indisponível</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import React, { createContext, useContext, useState, useEffect } from 'react';

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

// mock data reservations
const mockUserBookings = [
  {
    id: 1,
    status: "Em análise",
    labSala: "Sala 101 - Bloco A",
    requestDate: "2024-05-28T14:30:00",
    bookingDate: "2024-06-15",
    startTime: "07:00",
    endTime: "07:50"
  },
  {
    id: 2,
    status: "Confirmada",
    labSala: "Sala 203 - Bloco B",
    requestDate: "2024-05-25T10:15:00",
    bookingDate: "2024-06-10",
    startTime: "14:00",
    endTime: "15:50"
  },
  {
    id: 3,
    status: "Negada",
    labSala: "Sala 105 - Bloco A",
    requestDate: "2024-05-20T09:00:00",
    bookingDate: "2024-06-05",
    startTime: "19:00",
    endTime: "21:50"
  }
];

const LabDataContext = createContext();

export const LabDataProvider = ({ children }) => {
  const [labDetails, setLabDetails] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Em produção, substituir por chamadas API reais:
        const labData = mockLabService.getLabDetails();
        const schedule = mockLabService.getSchedule();

        setLabDetails(labData);
        setScheduleData(schedule);
        setLoading(false);
        setUserBookings(mockUserBookings);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openBookingsModal = () => setIsBookingsModalOpen(true);
  const closeBookingsModal = () => setIsBookingsModalOpen(false);

  return (
    <LabDataContext.Provider value={{
      labDetails,
      scheduleData,
      loading,
      error,
      userBookings,
      isBookingsModalOpen,
      openBookingsModal,
      closeBookingsModal,
    }}>
      {children}
    </LabDataContext.Provider>
  );
};

export const useLabData = () => {
  const context = useContext(LabDataContext);
  if (context === undefined) {
    throw new Error('useLabData must be used within a LabDataProvider');
  }
  return context;
};
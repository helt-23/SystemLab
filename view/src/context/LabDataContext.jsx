import React, { createContext, useContext, useState, useEffect } from 'react';
import Imagem from '../assets/styles/lab24.jpeg';

// ====================== (°--°)
// Mock Data Service / Martins, não sei quando você vai implementar o serviço real, mas boa sorte!
// ======================
const mockLabService = {
  getBlocos: () => [
    {
      id: 'bloco-a',
      nome: 'Bloco 1',
      laboratorios: ['lab-24', 'lab-102']
    },
    {
      id: 'bloco-b',
      nome: 'Bloco 2',
      laboratorios: ['lab-201']
    },
    {
      id: 'bloco-c',
      nome: 'Bloco 3',
      laboratorios: ['lab-301']
    },
    {
      id: 'bloco-d',
      nome: 'Bloco 4',
      laboratorios: ['lab-401']
    }
  ],

  getLaboratorios: () => ({
    'lab-24': {
      id: 'lab-24',
      blocoId: 'bloco-a',
      sala: "Sala 24 - Bloco 1",
      lugares: 25,
      descricao: "Laboratório de Análise e Desenvolvimento de Software",
      detalhe: "Definitivamente não possui hardwares e softwares de última geração. Possui vários computadores, pelo menos eles estão ligando.",
      image: Imagem
    },
    'lab-102': {
      id: 'lab-102',
      blocoId: 'bloco-a',
      sala: "Sala 102 - Bloco 1",
      lugares: 30,
      descricao: "Laboratório de Eletrônica",
      detalhe: "Bancadas equipadas para experiências de eletrônica."
    },
    'lab-201': {
      id: 'lab-201',
      blocoId: 'bloco-b',
      sala: "Sala 201 - Bloco B",
      lugares: 20,
      descricao: "Laboratório de Química",
      detalhe: "Equipado com sistema de exaustão e bancadas resistentes."
    },
    'lab-301': {
      id: 'lab-301',
      blocoId: 'bloco-c',
      sala: "Sala 301 - Bloco C",
      lugares: 35,
      descricao: "Computação",
      detalhe: "Espaço flexível para projetos integrados e atividades diversas."
    },
    'lab-401': {
      id: 'lab-401',
      blocoId: 'bloco-d',
      sala: "Sala 401 - Bloco D",
      lugares: 15,
      descricao: "Laboratório de Pesquisa",
      detalhe: "Equipamentos avançados para pesquisas científicas."
    }
  }),

  // Horários e aulas fixas
  getSchedules: () => ({
    'lab-24': {
      diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      shifts: {
        manhã: ["07:00 - 07:50", "08:00 - 08:50", "09:00 - 09:50", "10:00 - 10:50", "11:00 - 11:50"],
        tarde: ["13:00 - 13:50", "14:00 - 14:50", "15:00 - 15:50", "16:00 - 16:50", "17:00 - 17:50"],
        noite: ["19:00 - 19:50", "20:00 - 20:50", "21:00 - 21:50"]
      },
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
    },
    'lab-102': {
      diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      shifts: {
        manhã: ["07:00 - 07:50", "08:00 - 08:50", "09:00 - 09:50", "10:00 - 10:50", "11:00 - 11:50"],
        tarde: ["13:00 - 13:50", "14:00 - 14:50", "15:00 - 15:50", "16:00 - 16:50", "17:00 - 17:50"],
        noite: ["19:00 - 19:50", "20:00 - 20:50", "21:00 - 21:50"]
      },
      aulas: []
    },
    'lab-201': {
      diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      shifts: {
        manhã: ["07:00 - 07:50", "08:00 - 08:50", "09:00 - 09:50", "10:00 - 10:50", "11:00 - 11:50"],
        tarde: ["13:00 - 13:50", "14:00 - 14:50", "15:00 - 15:50", "16:00 - 16:50", "17:00 - 17:50"],
        noite: ["19:00 - 19:50", "20:00 - 20:50", "21:00 - 21:50"]
      },
      aulas: []
    },
    'lab-301': {
      diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      shifts: {
        manhã: ["07:00 - 07:50", "08:00 - 08:50", "09:00 - 09:50", "10:00 - 10:50", "11:00 - 11:50"],
        tarde: ["13:00 - 13:50", "14:00 - 14:50", "15:00 - 15:50", "16:00 - 16:50", "17:00 - 17:50"],
        noite: ["19:00 - 19:50", "20:00 - 20:50", "21:00 - 21:50"]
      },
      aulas: []
    },
    'lab-401': {
      diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      shifts: {
        manhã: ["07:00 - 07:50", "08:00 - 08:50", "09:00 - 09:50", "10:00 - 10:50", "11:00 - 11:50"],
        tarde: ["13:00 - 13:50", "14:00 - 14:50", "15:00 - 15:50", "16:00 - 16:50", "17:00 - 17:50"],
        noite: ["19:00 - 19:50", "20:00 - 20:50", "21:00 - 21:50"]
      },
      aulas: []
    }
  }),

  // todos os dados de reservas do usuário
  getUserBookings: () => [
    {
      id: 1,
      labId: 'lab-24',
      status: "Em análise",
      labSala: "Sala 24 - Bloco 1",
      requestDate: "2024-05-28T14:30:00",
      bookingDate: "2024-06-15",
      startTime: "07:00",
      endTime: "07:50",
      dia: "Qua",
      horario: "07:00 - 07:50",
      usuario: { nome: "Helton Pessoa", matricula: "2023001" }
    },
    {
      id: 2,
      labId: 'lab-24',
      status: "Confirmada",
      labSala: "Sala 24 - Bloco 1",
      requestDate: "2024-05-25T10:15:00",
      bookingDate: "2024-06-10",
      startTime: "14:00",
      endTime: "15:50",
      dia: "Seg",
      horario: "14:00 - 15:50",
      usuario: { nome: "Helton Pessoa", matricula: "2023001" }
    },
    {
      id: 3,
      labId: 'lab-102',
      status: "Negada",
      labSala: "Sala 102 - Bloco 1",
      requestDate: "2024-05-20T09:00:00",
      bookingDate: "2024-06-05",
      startTime: "19:00",
      endTime: "21:50",
      dia: "Sex",
      horario: "19:00 - 21:50",
      usuario: { nome: "João Silva", matricula: "2023001" }
    }
  ]
};

// ======================
// Context + Provider
// ======================
const LabDataContext = createContext();

export const LabDataProvider = ({ children }) => {
  const [blocos, setBlocos] = useState([]);
  const [laboratorios, setLaboratorios] = useState({});
  const [schedules, setSchedules] = useState({});
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);

        const blocosData = mockLabService.getBlocos();
        const laboratoriosData = mockLabService.getLaboratorios();
        const schedulesData = mockLabService.getSchedules();
        const bookingsData = mockLabService.getUserBookings();

        setBlocos(blocosData);
        setLaboratorios(laboratoriosData);
        setSchedules(schedulesData);
        setUserBookings(bookingsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Abre/fecha modal, graças a Deus, existe isso 
  const openBookingsModal = () => setIsBookingsModalOpen(true);
  const closeBookingsModal = () => setIsBookingsModalOpen(false);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const getLabDetails = (labId) => {
    return laboratorios[labId] || null;
  };

  const getLabSchedule = (labId) => {
    return schedules[labId] || null;
  };

  const addUserBooking = (newBooking) => {
    const newId = userBookings.length > 0
      ? Math.max(...userBookings.map(b => b.id)) + 1
      : 1;
    const bookingToAdd = { ...newBooking, id: newId };

    // Atualiza lista local
    setUserBookings(prev => [...prev, bookingToAdd]);
    return bookingToAdd;
  };

  // Remove reserva pelo ID
  const removeUserBooking = (bookingId) => {
    setUserBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  return (
    <LabDataContext.Provider value={{
      blocos,
      laboratorios,
      schedules,
      loading,
      error,
      userBookings,
      isBookingsModalOpen,
      isProfileModalOpen,
      openBookingsModal,
      closeBookingsModal,
      openProfileModal,
      closeProfileModal,
      getLabDetails,
      getLabSchedule,
      addUserBooking,
      removeUserBooking
    }}>
      {children}
    </LabDataContext.Provider>
  );
};

export const useLabData = () => {
  const context = useContext(LabDataContext);
  if (context === undefined) {
    throw new Error('Alguma coisa deu Muito errado!');
  }
  return context;
};
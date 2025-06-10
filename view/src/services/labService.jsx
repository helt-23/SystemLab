// src/services/labService.js
import Imagem from '../assets/styles/lab24.jpeg';

export const getBlocos = () => [
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
];

export const getLaboratorios = () => ({
  'lab-24': {
    id: 'lab-24',
    blocoId: 'bloco-a',
    sala: "Sala 24 - Bloco 1",
    lugares: 25,
    descricao: "Laboratório de Análise e Desenvolvimento de Software",
    detalhe: "Definitivamente não possui hardwares e softwares de última geração. Possui vários computadores, pelo menos eles estão ligando.",
    image: Imagem,
    hardwares: [
      { nome: "Desktops Dell", quantidade: 20, especificacao: "Intel i7 6500U, SSD 240GB, 16GB RAM, geforce 950mx" },
    ],
    softwares: [
      { nome: "MATLAB", versao: "2023b", licenca: "Desconhecido" },
      { nome: "Visual Studio Code", versao: "2023", licenca: "Desconhecido" },
      { nome: "Unity", versao: "2025", licenca: "Floating" },
      { nome: "AutoCad", versao: "2023.2", licenca: "Academic" },
      { nome: "IntelliJ", versao: "2024", licenca: "Desconhecido" }
    ],
    responsavel: {
      nome: "Prof. Marcela Alves",
      email: "marcela.alves@unifesspa.edu.br",
      telefone: "(xx) xxxxx-xxxx"
    }
  },
  'lab-102': {
    id: 'lab-102',
    blocoId: 'bloco-a',
    sala: "Sala 102 - Bloco 1",
    lugares: 30,
    descricao: "Laboratório de Eletrônica",
    detalhe: "Bancadas equipadas para experiências de eletrônica.",
    hardwares: [],
    softwares: [],
    responsavel: {
      nome: "Prof. Responsável Genérico",
      email: "responsavel.generico@unifesspa.edu.br",
      telefone: "(xx) xxxxx-xxxx"
    }
  },
  'lab-201': {
    id: 'lab-201',
    blocoId: 'bloco-b',
    sala: "Sala 201 - Bloco B",
    lugares: 20,
    descricao: "Laboratório de Química",
    detalhe: "Equipado com sistema de exaustão e bancadas resistentes.",
    hardwares: [],
    softwares: [],
    responsavel: {
      nome: "Prof. Responsável Genérico",
      email: "responsavel.generico@unifesspa.edu.br",
      telefone: "(xx) xxxxx-xxxx"
    }
  },
  'lab-301': {
    id: 'lab-301',
    blocoId: 'bloco-c',
    sala: "Sala 301 - Bloco C",
    lugares: 35,
    descricao: "Computação",
    detalhe: "Espaço flexível para projetos integrados e atividades diversas.",
    hardwares: [],
    softwares: [],
    responsavel: {
      nome: "Prof. Responsável Genérico",
      email: "responsavel.generico@unifesspa.edu.br",
      telefone: "(xx) xxxxx-xxxx"
    }
  },
  'lab-401': {
    id: 'lab-401',
    blocoId: 'bloco-d',
    sala: "Sala 401 - Bloco D",
    lugares: 15,
    descricao: "Laboratório de Pesquisa",
    detalhe: "Equipamentos avançados para pesquisas científicas.",
    hardwares: [],
    softwares: [],
    responsavel: {
      nome: "Prof. Responsável Genérico",
      email: "responsavel.generico@unifesspa.edu.br",
      telefone: "(xx) xxxxx-xxxx"
    }
  }
});

export const getSchedules = () => ({
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
});

export const getUserBookings = () => [
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
];

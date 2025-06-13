// src/services/labService.js
import Imagem from '../assets/styles/lab24.jpeg';

export const getBlocos = () => [
  {
    id: 'bloco-a',
    nome: 'Bloco 1',
    laboratorios: ['lab-24', 'lab-102', 'lab-103', 'lab-104'] // +2 labs
  },
  {
    id: 'bloco-b',
    nome: 'Bloco 2',
    laboratorios: ['lab-201', 'lab-202', 'lab-203'] // +2 labs
  },
  {
    id: 'bloco-c',
    nome: 'Bloco 3',
    laboratorios: ['lab-301', 'lab-302'] // +1 lab
  },
  {
    id: 'bloco-d',
    nome: 'Bloco 4',
    laboratorios: ['lab-401', 'lab-402', 'lab-403'] // +2 labs
  }
];
export const getLaboratorios = () => ({
  'lab-24': {
    id: 'lab-24',
    blocoId: 'bloco-a',
    sala: "Sala 24 - Bloco 1",
    lugares: 25,
    descricao: "Laboratório de Análise e Desenvolvimento de Software",
    detalhe: "Os computadores estão ligando pelo menos.",
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
  },
  'lab-103': {
    id: 'lab-103',
    blocoId: 'bloco-a',
    sala: "Sala 103 - Bloco 1",
    lugares: 20,
    descricao: "Laboratório de Redes",
    detalhe: "Equipado com roteadores e switches para práticas de configuração",
    hardwares: [
      { nome: "Roteadores Cisco", quantidade: 8, especificacao: "Modelo 2901" },
      { nome: "Switches Layer 3", quantidade: 6, especificacao: "Cisco Catalyst 3560" }
    ],
    softwares: [
      { nome: "Cisco Packet Tracer", versao: "8.2", licenca: "Educacional" }
    ],
    responsavel: {
      nome: "Prof. Carlos Silva",
      email: "carlos.silva@unifesspa.edu.br",
      telefone: "(94) 98765-4321"
    }
  },
  'lab-104': {
    id: 'lab-104',
    blocoId: 'bloco-a',
    sala: "Sala 104 - Bloco 1",
    lugares: 18,
    descricao: "Laboratório de Hardware",
    detalhe: "Bancadas para montagem e manutenção de computadores",
    image: Imagem,
    hardwares: [
      { nome: "Kits de Ferramentas", quantidade: 12, especificacao: "Chaves de precisão" },
      { nome: "Fontes ATX", quantidade: 15, especificacao: "500W 80 Plus" }
    ],
    softwares: [],
    responsavel: {
      nome: "Prof. Renato Oliveira",
      email: "renato.oliveira@unifesspa.edu.br",
      telefone: "(94) 99876-5432"
    }
  },
  'lab-202': {
    id: 'lab-202',
    blocoId: 'bloco-b',
    sala: "Sala 202 - Bloco 2",
    lugares: 22,
    descricao: "Laboratório de Física",
    detalhe: "Equipamentos para experimentos de mecânica e termodinâmica",
    image: Imagem,
    hardwares: [
      { nome: "Kits de Óptica", quantidade: 10, especificacao: "Lentes e prismas" }
    ],
    softwares: [],
    responsavel: {
      nome: "Prof. Ana Beatriz",
      email: "ana.beatriz@unifesspa.edu.br",
      telefone: "(94) 98765-1234"
    }
  },
  'lab-203': {
    id: 'lab-203',
    blocoId: 'bloco-b',
    sala: "Sala 203 - Bloco 2",
    lugares: 25,
    descricao: "Laboratório de Química Orgânica",
    detalhe: "Hoods de segurança para experimentos com solventes",
    image: Imagem,
    hardwares: [],
    softwares: [],
    responsavel: {
      nome: "Prof. Fábio Lima",
      email: "fabio.lima@unifesspa.edu.br",
      telefone: "(94) 99234-5678"
    }
  },
  'lab-302': {
    id: 'lab-302',
    blocoId: 'bloco-c',
    sala: "Sala 302 - Bloco 3",
    lugares: 30,
    descricao: "Laboratório de Inteligência Artificial",
    detalhe: "Workstations com GPUs para treinamento de modelos",
    image: Imagem,
    hardwares: [
      { nome: "Workstations Dell", quantidade: 10, especificacao: "RTX 4090, 64GB RAM" }
    ],
    softwares: [
      { nome: "PyTorch", versao: "2.1", licenca: "Open Source" },
      { nome: "TensorFlow", versao: "2.15", licenca: "Apache 2.0" }
    ],
    responsavel: {
      nome: "Prof. Mariana Costa",
      email: "mariana.costa@unifesspa.edu.br",
      telefone: "(94) 98123-4567"
    }
  },
  'lab-402': {
    id: 'lab-402',
    blocoId: 'bloco-d',
    sala: "Sala 402 - Bloco 4",
    lugares: 15,
    descricao: "Laboratório de Genética",
    detalhe: "Equipamentos para análise de DNA",
    image: Imagem,
    hardwares: [
      { nome: "Termocicladores", quantidade: 3, especificacao: "PCR em tempo real" }
    ],
    softwares: [
      { nome: "BioEdit", versao: "7.2", licenca: "Academic" }
    ],
    responsavel: {
      nome: "Prof. Luiz Mendes",
      email: "luiz.mendes@unifesspa.edu.br",
      telefone: "(94) 99876-1234"
    }
  },
  'lab-403': {
    id: 'lab-403',
    blocoId: 'bloco-d',
    sala: "Sala 403 - Bloco 4",
    lugares: 18,
    descricao: "Laboratório de Microscopia",
    detalhe: "Microscópios de alta resolução para análises celulares",
    image: Imagem,
    hardwares: [
      { nome: "Microscópios Eletrônicos", quantidade: 4, especificacao: "Aumento 100.000x" }
    ],
    softwares: [],
    responsavel: {
      nome: "Prof. Carolina Ribeiro",
      email: "carolina.ribeiro@unifesspa.edu.br",
      telefone: "(94) 98765-1122"
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
    usuario: { nome: "Usuário", matricula: "2023001" }
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
    usuario: { nome: "Usuário", matricula: "2023001" }
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

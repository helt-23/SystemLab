// src/services/labService.js
import Imagem from '../assets/images/lab24.jpeg';

export const getBlocos = () => [
  {
    id: 'bloco-a',
    nome: 'Bloco 1',
    laboratorios: ['lab-24', 'lab-102', 'lab-103', 'lab-104']
  },
  {
    id: 'bloco-b',
    nome: 'Bloco 2',
    laboratorios: ['lab-201', 'lab-202', 'lab-203']
  },
  {
    id: 'bloco-c',
    nome: 'Bloco 3',
    laboratorios: ['lab-301', 'lab-302']
  },
  {
    id: 'bloco-d',
    nome: 'Bloco 4',
    laboratorios: ['lab-401', 'lab-402', 'lab-403']
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
      },
      {
        dia: "Ter",
        horario: "13:00 - 13:50",
        materia: "Banco de Dados",
        professor: "Prof. Ricardo",
        turma: "CC 2024"
      },
      {
        dia: "Qua",
        horario: "15:00 - 15:50",
        materia: "Programação Web",
        professor: "Prof. Ana",
        turma: "SI 2023"
      }
    ]
  },
  'lab-102': {
    diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    shifts: {
      manhã: ["07:00 - 07:50", "08:00 - 08:50", "09:00 - 09:50", "10:00 - 10:50"],
      tarde: ["13:00 - 13:50", "14:00 - 14:50", "15:00 - 15:50", "16:00 - 16:50"],
      noite: ["18:00 - 18:50", "19:00 - 19:50", "20:00 - 20:50"]
    },
    aulas: [
      {
        dia: "Seg",
        horario: "07:00 - 07:50",
        materia: "Circuitos Elétricos",
        professor: "Prof. Carlos",
        turma: "Eng. Elétrica 2023"
      },
      {
        dia: "Qua",
        horario: "10:00 - 10:50",
        materia: "Eletrônica Digital",
        professor: "Prof. Fernanda",
        turma: "Eng. Comp 2024"
      },
      {
        dia: "Sex",
        horario: "14:00 - 15:50",
        materia: "Laboratório de Eletrônica",
        professor: "Prof. Roberto",
        turma: "Eng. Elétrica 2023"
      }
    ]
  },
  'lab-103': {
    diasSemana: ["Seg", "Ter", "Qua", "Qui"],
    shifts: {
      manhã: ["07:00 - 08:50", "09:00 - 10:50"],
      tarde: ["13:00 - 14:50", "15:00 - 16:50"],
      noite: ["18:00 - 19:50", "20:00 - 21:50"]
    },
    aulas: [
      {
        dia: "Ter",
        horario: "07:00 - 08:50",
        materia: "Redes de Computadores",
        professor: "Prof. Carlos",
        turma: "CC 2023"
      },
      {
        dia: "Qui",
        horario: "13:00 - 14:50",
        materia: "Segurança de Redes",
        professor: "Prof. Mariana",
        turma: "CC 2024"
      }
    ]
  },
  'lab-104': {
    diasSemana: ["Seg", "Qua", "Sex"],
    shifts: {
      manhã: ["07:00 - 08:50", "09:00 - 10:50"],
      tarde: ["13:00 - 14:50", "15:00 - 16:50"]
    },
    aulas: [
      {
        dia: "Seg",
        horario: "07:00 - 08:50",
        materia: "Arquitetura de Computadores",
        professor: "Prof. Renato",
        turma: "CC 2023"
      },
      {
        dia: "Qua",
        horario: "13:00 - 14:50",
        materia: "Manutenção de Hardware",
        professor: "Prof. José",
        turma: "SI 2024"
      }
    ]
  },
  'lab-201': {
    diasSemana: ["Ter", "Qui", "Sab"],
    shifts: {
      manhã: ["08:00 - 09:50", "10:00 - 11:50"],
      tarde: ["14:00 - 15:50", "16:00 - 17:50"]
    },
    aulas: [
      {
        dia: "Ter",
        horario: "08:00 - 09:50",
        materia: "Química Geral",
        professor: "Prof. Fábio",
        turma: "Química 2023"
      },
      {
        dia: "Qui",
        horario: "14:00 - 15:50",
        materia: "Química Analítica",
        professor: "Prof. Beatriz",
        turma: "Química 2024"
      }
    ]
  },
  'lab-202': {
    diasSemana: ["Seg", "Qua", "Sex"],
    shifts: {
      manhã: ["07:00 - 07:50", "08:00 - 08:50", "09:00 - 09:50", "10:00 - 10:50"],
      tarde: ["13:00 - 13:50", "14:00 - 14:50", "15:00 - 15:50", "16:00 - 16:50"]
    },
    aulas: [
      {
        dia: "Seg",
        horario: "09:00 - 09:50",
        materia: "Física I",
        professor: "Prof. Ana",
        turma: "Eng. Civil 2023"
      },
      {
        dia: "Qua",
        horario: "14:00 - 14:50",
        materia: "Física II",
        professor: "Prof. Ricardo",
        turma: "Eng. Mecânica 2024"
      },
      {
        dia: "Sex",
        horario: "10:00 - 10:50",
        materia: "Física III",
        professor: "Prof. Marcos",
        turma: "Eng. Elétrica 2023"
      }
    ]
  },
  'lab-203': {
    diasSemana: ["Ter", "Qui"],
    shifts: {
      tarde: ["13:00 - 14:50", "15:00 - 16:50"],
      noite: ["18:00 - 19:50", "20:00 - 21:50"]
    },
    aulas: [
      {
        dia: "Ter",
        horario: "13:00 - 14:50",
        materia: "Química Orgânica I",
        professor: "Prof. Fábio",
        turma: "Química 2023"
      },
      {
        dia: "Qui",
        horario: "18:00 - 19:50",
        materia: "Química Orgânica II",
        professor: "Prof. Carolina",
        turma: "Química 2024"
      }
    ]
  },
  'lab-301': {
    diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    shifts: {
      manhã: ["07:00 - 07:50", "08:00 - 08:50", "09:00 - 09:50", "10:00 - 10:50"],
      tarde: ["13:00 - 13:50", "14:00 - 14:50", "15:00 - 15:50", "16:00 - 16:50"],
      noite: ["18:00 - 18:50", "19:00 - 19:50", "20:00 - 20:50"]
    },
    aulas: [
      {
        dia: "Seg",
        horario: "08:00 - 08:50",
        materia: "Algoritmos",
        professor: "Prof. Mariana",
        turma: "CC 2023"
      },
      {
        dia: "Qua",
        horario: "14:00 - 14:50",
        materia: "Estrutura de Dados",
        professor: "Prof. Carlos",
        turma: "CC 2024"
      },
      {
        dia: "Sex",
        horario: "10:00 - 10:50",
        materia: "Programação Orientada a Objetos",
        professor: "Prof. Renato",
        turma: "SI 2023"
      }
    ]
  },
  'lab-302': {
    diasSemana: ["Seg", "Qua", "Sex"],
    shifts: {
      manhã: ["08:00 - 09:50", "10:00 - 11:50"],
      tarde: ["14:00 - 15:50", "16:00 - 17:50"],
      noite: ["19:00 - 20:50", "21:00 - 22:50"]
    },
    aulas: [
      {
        dia: "Seg",
        horario: "08:00 - 09:50",
        materia: "Aprendizado de Máquina",
        professor: "Prof. Mariana",
        turma: "CC 2024"
      },
      {
        dia: "Qua",
        horario: "14:00 - 15:50",
        materia: "Visão Computacional",
        professor: "Prof. Rafael",
        turma: "CC 2023"
      },
      {
        dia: "Sex",
        horario: "19:00 - 20:50",
        materia: "Processamento de Linguagem Natural",
        professor: "Prof. Juliana",
        turma: "Mestrado IA"
      }
    ]
  },
  'lab-401': {
    diasSemana: ["Ter", "Qui"],
    shifts: {
      manhã: ["08:00 - 10:50"],
      tarde: ["13:00 - 15:50"]
    },
    aulas: [
      {
        dia: "Ter",
        horario: "08:00 - 10:50",
        materia: "Pesquisa em Biotecnologia",
        professor: "Prof. Luiz",
        turma: "Doutorado"
      },
      {
        dia: "Qui",
        horario: "13:00 - 15:50",
        materia: "Metodologia Científica",
        professor: "Prof. Carolina",
        turma: "Mestrado"
      }
    ]
  },
  'lab-402': {
    diasSemana: ["Seg", "Qua", "Sex"],
    shifts: {
      manhã: ["07:00 - 09:50"],
      tarde: ["13:00 - 15:50"]
    },
    aulas: [
      {
        dia: "Seg",
        horario: "07:00 - 09:50",
        materia: "Genética Molecular",
        professor: "Prof. Luiz",
        turma: "Biotecnologia 2023"
      },
      {
        dia: "Qua",
        horario: "13:00 - 15:50",
        materia: "Biotecnologia Aplicada",
        professor: "Prof. Ana",
        turma: "Biotecnologia 2024"
      }
    ]
  },
  'lab-403': {
    diasSemana: ["Ter", "Qui", "Sab"],
    shifts: {
      manhã: ["08:00 - 10:50"],
      tarde: ["14:00 - 16:50"]
    },
    aulas: [
      {
        dia: "Ter",
        horario: "08:00 - 10:50",
        materia: "Microscopia Avançada",
        professor: "Prof. Carolina",
        turma: "Biologia 2023"
      },
      {
        dia: "Qui",
        horario: "14:00 - 16:50",
        materia: "Técnicas Laboratoriais",
        professor: "Prof. Roberto",
        turma: "Biologia 2024"
      }
    ]
  }
});

export const getUserBookings = () => [
  {
    id: 1,
    labId: 'lab-24',
    status: "pendente",
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

export const getAllBookings = () => {
  return [
    // Reservas do usuário
    ...getUserBookings().map(booking => ({
      ...booking,
      status: booking.status.toLowerCase().replace("confirmada", "confirmado")
    })),

    // Lab-24
    {
      id: 100,
      labId: 'lab-24',
      status: "confirmado",
      labSala: "Sala 24 - Bloco 1",
      requestDate: "2024-05-01T08:00:00",
      bookingDate: "2024-06-17",
      startTime: "08:00",
      endTime: "08:50",
      dia: "Seg",
      horario: "08:00 - 08:50",
      usuario: { nome: "Maria Oliveira", matricula: "2023002" }
    },
    {
      id: 101,
      labId: 'lab-24',
      status: "confirmado",
      labSala: "Sala 24 - Bloco 1",
      requestDate: "2024-05-01T09:00:00",
      bookingDate: "2024-06-17",
      startTime: "09:00",
      endTime: "09:50",
      dia: "Seg",
      horario: "09:00 - 09:50",
      usuario: { nome: "Carlos Santos", matricula: "2023003" }
    },
    {
      id: 102,
      labId: 'lab-24',
      status: "confirmado",
      labSala: "Sala 24 - Bloco 1",
      requestDate: "2024-05-02T10:00:00",
      bookingDate: "2024-06-18",
      startTime: "10:00",
      endTime: "10:50",
      dia: "Ter",
      horario: "10:00 - 10:50",
      usuario: { nome: "Ana Costa", matricula: "2023004" }
    },

    // Lab-102
    {
      id: 200,
      labId: 'lab-102',
      status: "confirmado",
      labSala: "Sala 102 - Bloco 1",
      requestDate: "2024-05-03T14:00:00",
      bookingDate: "2024-06-19",
      startTime: "14:00",
      endTime: "15:50",
      dia: "Qua",
      horario: "14:00 - 15:50",
      usuario: { nome: "Pedro Almeida", matricula: "2023005" }
    },
    {
      id: 201,
      labId: 'lab-102',
      status: "confirmado",
      labSala: "Sala 102 - Bloco 1",
      requestDate: "2024-05-04T15:00:00",
      bookingDate: "2024-06-20",
      startTime: "15:00",
      endTime: "16:50",
      dia: "Qui",
      horario: "15:00 - 16:50",
      usuario: { nome: "Juliana Pereira", matricula: "2023006" }
    },

    // Lab-103
    {
      id: 300,
      labId: 'lab-103',
      status: "confirmado",
      labSala: "Sala 103 - Bloco 1",
      requestDate: "2024-05-05T19:00:00",
      bookingDate: "2024-06-21",
      startTime: "19:00",
      endTime: "20:50",
      dia: "Sex",
      horario: "19:00 - 20:50",
      usuario: { nome: "Fernando Costa", matricula: "2023007" }
    },

    // Lab-104
    {
      id: 400,
      labId: 'lab-104',
      status: "confirmado",
      labSala: "Sala 104 - Bloco 1",
      requestDate: "2024-05-06T10:00:00",
      bookingDate: "2024-06-22",
      startTime: "10:00",
      endTime: "11:50",
      dia: "Sab",
      horario: "10:00 - 11:50",
      usuario: { nome: "Roberto Silva", matricula: "2023008" }
    },

    // Lab-201
    {
      id: 500,
      labId: 'lab-201',
      status: "confirmado",
      labSala: "Sala 201 - Bloco B",
      requestDate: "2024-05-07T11:00:00",
      bookingDate: "2024-06-23",
      startTime: "11:00",
      endTime: "12:50",
      dia: "Dom",
      horario: "11:00 - 12:50",
      usuario: { nome: "Camila Oliveira", matricula: "2023009" }
    },
    {
      id: 501,
      labId: 'lab-201',
      status: "confirmado",
      labSala: "Sala 201 - Bloco B",
      requestDate: "2024-05-08T14:00:00",
      bookingDate: "2024-06-24",
      startTime: "14:00",
      endTime: "15:50",
      dia: "Seg",
      horario: "14:00 - 15:50",
      usuario: { nome: "Rafael Mendes", matricula: "2023010" }
    },

    // Lab-202
    {
      id: 600,
      labId: 'lab-202',
      status: "confirmado",
      labSala: "Sala 202 - Bloco 2",
      requestDate: "2024-05-09T16:00:00",
      bookingDate: "2024-06-25",
      startTime: "16:00",
      endTime: "17:50",
      dia: "Ter",
      horario: "16:00 - 17:50",
      usuario: { nome: "Patricia Lima", matricula: "2023011" }
    },

    // Lab-203
    {
      id: 700,
      labId: 'lab-203',
      status: "confirmado",
      labSala: "Sala 203 - Bloco 2",
      requestDate: "2024-05-10T18:00:00",
      bookingDate: "2024-06-26",
      startTime: "18:00",
      endTime: "19:50",
      dia: "Qua",
      horario: "18:00 - 19:50",
      usuario: { nome: "Lucas Souza", matricula: "2023012" }
    },

    // Lab-301
    {
      id: 800,
      labId: 'lab-301',
      status: "confirmado",
      labSala: "Sala 301 - Bloco C",
      requestDate: "2024-05-11T19:00:00",
      bookingDate: "2024-06-27",
      startTime: "19:00",
      endTime: "20:50",
      dia: "Qui",
      horario: "19:00 - 20:50",
      usuario: { nome: "Gabriel Alves", matricula: "2023013" }
    },

    // Lab-302
    {
      id: 900,
      labId: 'lab-302',
      status: "confirmado",
      labSala: "Sala 302 - Bloco C",
      requestDate: "2024-05-12T20:00:00",
      bookingDate: "2024-06-28",
      startTime: "20:00",
      endTime: "21:50",
      dia: "Sex",
      horario: "20:00 - 21:50",
      usuario: { nome: "Isabela Costa", matricula: "2023014" }
    },

    // Lab-401
    {
      id: 1000,
      labId: 'lab-401',
      status: "confirmado",
      labSala: "Sala 401 - Bloco D",
      requestDate: "2024-05-13T09:00:00",
      bookingDate: "2024-06-29",
      startTime: "09:00",
      endTime: "10:50",
      dia: "Sab",
      horario: "09:00 - 10:50",
      usuario: { nome: "Marcos Silva", matricula: "2023015" }
    },

    // Lab-402
    {
      id: 1100,
      labId: 'lab-402',
      status: "confirmado",
      labSala: "Sala 402 - Bloco 4",
      requestDate: "2024-05-14T11:00:00",
      bookingDate: "2024-06-30",
      startTime: "11:00",
      endTime: "12:50",
      dia: "Dom",
      horario: "11:00 - 12:50",
      usuario: { nome: "Carolina Oliveira", matricula: "2023016" }
    },

    // Lab-403
    {
      id: 1200,
      labId: 'lab-403',
      status: "confirmado",
      labSala: "Sala 403 - Bloco 4",
      requestDate: "2024-05-15T14:00:00",
      bookingDate: "2024-07-01",
      startTime: "14:00",
      endTime: "15:50",
      dia: "Seg",
      horario: "14:00 - 15:50",
      usuario: { nome: "Bruno Mendes", matricula: "2023017" }
    },

    {
      id: 1300,
      labId: 'lab-24',
      status: "pendente",
      labSala: "Sala 24 - Bloco 1",
      requestDate: "2024-05-16T10:00:00",
      bookingDate: "2024-07-02",
      startTime: "10:00",
      endTime: "11:50",
      dia: "Ter",
      horario: "10:00 - 11:50",
      usuario: { nome: "Roberto Silva", matricula: "2023018" }
    },
    {
      id: 1400,
      labId: 'lab-302',
      status: "pendente",
      labSala: "Sala 302 - Bloco C",
      requestDate: "2024-05-17T11:00:00",
      bookingDate: "2024-07-03",
      startTime: "11:00",
      endTime: "12:50",
      dia: "Qua",
      horario: "11:00 - 12:50",
      usuario: { nome: "Camila Oliveira", matricula: "2023019" }
    }
  ];
};
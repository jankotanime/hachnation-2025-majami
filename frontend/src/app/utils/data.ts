import { Legislative, Bill } from "../types/legislative";

export const data: Legislative[] = [
  {
    id: "leg-001",
    title: "X Kadencja: Od 2023 roku",
    content: "Kategoria dotycząca cyfryzacji usług publicznych i transformacji cyfrowej",
    bills: [
      {
        id: "bill-001-1",
        title: "Ustawa o cyfryzacji usług publicznych",
        description: "Jednolite standardy API dla usług administracji",
        status: "uchwalony",
        statusHistory: [
          { status: "zapowiedziany", date: "2023-01-15" },
          { status: "konsultacje", date: "2023-03-20" },
          { status: "sejm", date: "2023-08-10" },
          { status: "uchwalony", date: "2023-11-13" },
        ],
      },
      {
        id: "bill-001-2",
        title: "Prawo podpisu elektronicznego",
        description: "Upowszechnianie podpisu elektronicznego",
        status: "uchwalony",
        statusHistory: [
          { status: "zapowiedziany", date: "2023-02-01" },
          { status: "rada_ministrow", date: "2023-04-15" },
          { status: "sejm", date: "2023-09-01" },
          { status: "uchwalony", date: "2023-11-20" },
        ],
      },
      {
        id: "bill-001-3",
        title: "Digitalizacja dokumentów",
        description: "Obowiązek digitalizacji dokumentów publicznych",
        status: "sejm",
        statusHistory: [
          { status: "zapowiedziany", date: "2023-03-10" },
          { status: "przed_konsultacjami", date: "2023-05-20" },
          { status: "konsultacje", date: "2023-07-15" },
          { status: "sejm", date: "2024-01-10" },
        ],
      },
      {
        id: "bill-001-4",
        title: "API w urzędach",
        description: "Interfejsy API dostępne dla obywateli",
        status: "konsultacje",
        statusHistory: [
          { status: "zapowiedziany", date: "2023-04-01" },
          { status: "konsultacje", date: "2023-06-15" },
        ],
      },
      {
        id: "bill-001-5",
        title: "Bezpieczeństwo danych",
        description: "Normy bezpieczeństwa dla usług cyfrowych",
        status: "przed_konsultacjami",
        statusHistory: [
          { status: "zapowiedziany", date: "2023-05-20" },
          { status: "przed_konsultacjami", date: "2024-02-01" },
        ],
      },
      {
        id: "bill-001-6",
        title: "Portal e-usług",
        description: "Centralna platforma e-usług",
        status: "zapowiedziany",
        statusHistory: [
          { status: "zapowiedziany", date: "2024-06-15" },
        ],
      },
    ],
  },
  {
    id: "leg-002",
    title: "IX Kadencja: 2019-2023",
    content: "Kategoria regulacji energetycznych i odnawialnych źródeł energii",
    bills: [
      {
        id: "bill-002-1",
        title: "Nowelizacja prawa energetycznego",
        description: "Gwarancja pochodzenia energii z OZE",
        status: "uchwalony",
        statusHistory: [
          { status: "zapowiedziany", date: "2019-03-01" },
          { status: "rada_ministrow", date: "2020-01-15" },
          { status: "sejm", date: "2021-05-20" },
          { status: "uchwalony", date: "2022-06-10" },
        ],
      },
      {
        id: "bill-002-2",
        title: "Prosument energii",
        description: "Uproszczone procedury przyłączeniowe",
        status: "sejm",
        statusHistory: [
          { status: "zapowiedziany", date: "2020-01-10" },
          { status: "konsultacje", date: "2020-09-15" },
          { status: "sejm", date: "2022-03-20" },
        ],
      },
      {
        id: "bill-002-3",
        title: "Energia słoneczna",
        description: "Wsparcie dla paneli słonecznych",
        status: "konsultacje",
        statusHistory: [
          { status: "zapowiedziany", date: "2021-02-01" },
          { status: "konsultacje", date: "2022-08-15" },
        ],
      },
      {
        id: "bill-002-4",
        title: "Energia wiatrowa",
        description: "Regulacje dla farm wiatrowych",
        status: "rada_ministrow",
        statusHistory: [
          { status: "zapowiedziany", date: "2021-06-10" },
          { status: "przed_konsultacjami", date: "2022-02-20" },
          { status: "rada_ministrow", date: "2023-04-15" },
        ],
      },
    ],
  },
  {
    id: "leg-003",
    title: "VIII Kadencja: 2015-2019",
    content: "Kategoria regulacji sztucznej inteligencji i ochrony danych",
    bills: [
      {
        id: "bill-003-1",
        title: "Ustawa o ochronie danych w AI",
        description: "Wymagania minimalizacji danych w systemach AI",
        status: "konsultacje",
        statusHistory: [
          { status: "zapowiedziany", date: "2023-01-01" },
          { status: "konsultacje", date: "2023-10-15" },
        ],
      },
      {
        id: "bill-003-2",
        title: "Rejestr modeli AI",
        description: "Rejestr modeli wysokiego ryzyka",
        status: "wstrzymany",
        statusHistory: [
          { status: "zapowiedziany", date: "2023-02-10" },
          { status: "przed_konsultacjami", date: "2023-06-20" },
          { status: "wstrzymany", date: "2024-01-10" },
        ],
      },
      {
        id: "bill-003-3",
        title: "Przejrzystość algorytmów",
        description: "Obowiązek ujawniania algorytmów decyzyjnych",
        status: "anulowany",
        statusHistory: [
          { status: "zapowiedziany", date: "2023-03-15" },
          { status: "konsultacje", date: "2023-07-20" },
          { status: "anulowany", date: "2024-02-28" },
        ],
      },
    ],
  },
];

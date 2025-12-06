export interface Action {
  id: string;
  title: string;
  description?: string;
  status: "zapowiedziany" | "przed_konsultacjami" | "konsultacje" | "rada_ministrow" | "sejm" | "senat" | "podpis_prezydenta" | "uchwalony" | "wstrzymany" | "anulowany";
}

export interface Bill {
  id: string;
  title: string;
  description?: string;
  status: "zapowiedziany" | "przed_konsultacjami" | "konsultacje" | "rada_ministrow" | "sejm" | "senat" | "podpis_prezydenta" | "uchwalony" | "wstrzymany" | "anulowany";
}

export interface Legislative {
    id: string,
    title: string,
    content: string,
    bills?: Bill[]
};

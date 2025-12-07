export type StatusType =
  | "zapowiedziany"
  | "przed_konsultacjami"
  | "konsultacje"
  | "rada_ministrow"
  | "sejm"
  | "senat"
  | "podpis_prezydenta"
  | "uchwalony"
  | "wstrzymany"
  | "anulowany"
  | "PASSED"
  | "REJECTED"
  | "DURING";

export interface StatusHistoryEntry {
  status: StatusType;
  date: string;
}

export interface Bill {
  id: string;
  title: string;
  description?: string;
  status: StatusType;
  statusHistory?: StatusHistoryEntry[];
}

export interface Action extends Bill {}

export interface Legislative {
  id: string;
  title: string;
  content: string;
  bills?: Bill[];
}

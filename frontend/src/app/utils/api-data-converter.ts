import { StatusType, StatusHistoryEntry } from "@/app/types/legislative";

const STATUS_MAP: Record<string, StatusType> = {
  PASSED: "uchwalony",
  REJECTED: "anulowany",
  DURING: "sejm",
};

export interface ApiLegislation {
  id: string;
  sejmTerm: number;
  apiLegislationNumber: number;
  title: string;
  description: string | null;
  aiExplanation: string | null;
  createdt: string;
  updatedAt: string;
  closureDate: string | null;
  updatedOnApiAt: string;
  status: "PASSED" | "REJECTED" | "DURING";
}

export const convertApiStatusToInternal = (apiStatus: string): StatusType => {
  return STATUS_MAP[apiStatus] || "zapowiedziany";
};

export const createStatusHistory = (
  legislation: ApiLegislation
): StatusHistoryEntry[] => {
  const history: StatusHistoryEntry[] = [];
  history.push({
    status: "zapowiedziany",
    date: legislation.createdt.split("T")[0],
  });
  const finalDate = legislation.closureDate || legislation.updatedOnApiAt;
  const finalStatus = convertApiStatusToInternal(legislation.status);

  if (history[history.length - 1].status !== finalStatus) {
    history.push({
      status: finalStatus,
      date: finalDate.split("T")[0],
    });
  }

  return history;
};

export const convertApiToAppBill = (legislation: ApiLegislation) => {
  const statusHistory = createStatusHistory(legislation);
  const lastStatus =
    statusHistory[statusHistory.length - 1]?.status || "zapowiedziany";

  return {
    id: legislation.id,
    title: legislation.title,
    description: legislation.description || undefined,
    status: lastStatus as StatusType,
    statusHistory,
  };
};

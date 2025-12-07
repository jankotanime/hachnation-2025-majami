import { Legislation } from "@/app/types/legislative";
import { tryCatch } from "../try-catch";

export async function fetchLegislatives(term: number, legislationNumber: number = 0) {
  if (!term) return { ok: false, error: "missing term" };

  const url = `http://api:8080?term=${encodeURIComponent(term)}&number=${encodeURIComponent(legislationNumber)}`;
  const [response, error] = await tryCatch(fetch(url));
  if (error) return { ok: false, error };
  const data: Legislation[] = await response.json();
  if (!response.ok) return { ok: false, error: data };
  return { ok: true, data };
}
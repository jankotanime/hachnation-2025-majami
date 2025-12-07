import { tryCatch } from "../try-catch";

export async function fetchLegislatives(term: number, legislationNumber: number = 10) {
  if (!term) return { ok: false, error: "missing term" };

  const url = `${process.env.NEXT_PUBLIC_API}?term=${encodeURIComponent(term)}&number=${encodeURIComponent(legislationNumber)}`;
  const [response, error] = await tryCatch(fetch(url));
  if (error) return { ok: false, error };
  const data = await response.json();
  if (!response.ok) return { ok: false, error: data };
  return { ok: true, data };
}
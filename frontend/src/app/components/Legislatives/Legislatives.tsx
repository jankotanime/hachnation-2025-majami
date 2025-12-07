import { Legislative } from "@/app/types/legislative";
import { data as legislatives } from "@/app/utils/data";
import { tryCatch } from "@/app/utils/try-catch";
import LegislativeItem from "./LegislativeItem";

async function fetchLegislatives(): Promise<Legislative[]> {
  const [response, error] = await tryCatch(
    fetch(`${process.env.NEXT_PUBLIC_API}`)
  );
  if (error) {
    console.error("catch error:", error);
    return [];
  }
  const data = await response.json();
  if (!response.ok) {
    console.error("error:", data);
    return [];
  }
  return data;
}

const LegislativesList = async () => {
  return (
    <div className="w-full-10 m-10">
      {legislatives.length === 0 ? (
        <p className="text-center py-8" style={{ color: 'var(--onSurface)' }}>Brak danych lub błąd API</p>
      ) : (
        <ul className="list-none p-0 m-0">
          {legislatives.map((item: Legislative, ind: number) => (
            <LegislativeItem item={item} key={ind}/>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LegislativesList;
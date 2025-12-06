import Link from "next/link";
import { Legislative } from "@/app/types/legislative";
import { data as legislatives } from "@/app/utils/data";
import { STATUS_VARIANTS } from "@/app/constans/statusVariants";
import { tryCatch } from "@/app/utils/try-catch";

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
  const getStatusCount = (legislative: Legislative, statusVariant: string): number => {
    if (!legislative.bills) return 0;
    return legislative.bills.filter((bill) => bill.status === statusVariant).length;
  };

  return (
    <div className="w-full-10 m-10">
      {legislatives.length === 0 ? (
        <p className="text-center py-8" style={{ color: 'var(--onSurface)' }}>Brak danych lub błąd API</p>
      ) : (
        <ul className="list-none p-0 m-0">
          {legislatives.map((item: Legislative) => (
            <li key={item.id} className="mb-4 rounded-xl overflow-hidden ">
              <Link
                href={`/categories/${item.id}`}
                className="block p-6 transition-colors no-underline"
                style={{ backgroundColor: 'var(--surface)',
                color: 'var(--onSurface)' }}
              >
                <span className="text-lg font-bold block mb-4" style={{ color: 'var(--onSurface)' }}>{item.title}</span>
                <div className="flex flex-wrap gap-2">
                  {STATUS_VARIANTS.map((status) => {
                    const count = getStatusCount(item, status.key);
                    return (
                      <span
                        key={status.key}
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        data-variant={status.key}
                        style={{
                          backgroundColor: status.bgColor,
                          color: status.color,
                          borderColor: 'var(--primary)'
                        }}
                      >
                        {status.label} {count}
                      </span>
                    );
                  })}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LegislativesList;
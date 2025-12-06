import { data as legislatives } from '@/app/utils/data';
import Link from 'next/link';

interface ParamsProps {
  params: Promise<{ id: string; actsId: string }>;
}

const ActionsContent = async ({ params }: ParamsProps) => {
  const { id: categoryId, actsId: billId } = await params;

  const category = legislatives.find((el) => el.id === categoryId);
  if (!category) return <div>Nie znaleziono kategorii</div>;

  const bill = category.bills?.find((bill) => bill.id === billId);
  if (!bill) return <div>Nie znaleziono ustawy</div>;

  return (
    <div className="p-8">
      <Link href={`/categories/${categoryId}`} className="inline-block mb-6 text-[rgba(161,51,51,1)] font-semibold hover:opacity-80 transition-opacity">
        ← Wróć
      </Link>

      <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--surface)', color: 'var(--onSurface)' }}>
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--onSurface)' }}>{bill.title}</h1>
        {bill.description && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--onSurface)', borderBottom: `2px solid var(--primary)` }}>Opis</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--onSurface)' }}>{bill.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionsContent;
import { data as legislatives } from '@/app/utils/data';
import { STATUS_VARIANTS } from '@/app/constans/statusVariants';
import CategoryContent from './components/CategoryContent/CategoryContent';

interface Props {
    params: Promise<{ id: string }>;
}
export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const item = legislatives.find((el) => el.id === id);

  if (!item) return <div>Nie znaleziono wpisu dla id: {id}</div>;

  const billsByStatus = STATUS_VARIANTS.map((status) => ({
    key: status.key,
    label: status.label,
    variant: status.key,
    items: (item.bills || []).filter((bill) => bill.status === status.key),
  })).filter(statusGroup => statusGroup.items.length > 0);

  return (
        <div className="w-full">
            <CategoryContent item={item} billsByStatus={billsByStatus} categoryId={id} />
        </div>
    )
}
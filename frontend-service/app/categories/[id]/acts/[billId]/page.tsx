import { data as legislatives } from '@/app/utils/data';
import styles from './page.module.css';
import Link from 'next/link';

interface ParamsProps {
  params: Promise<{ id: string; billId: string }>;
}

const ActionsContent = async ({ params }: ParamsProps) => {
  const { id: categoryId, billId } = await params;

  const category = legislatives.find((el) => el.id === categoryId);
  if (!category) return <div>Nie znaleziono kategorii</div>;

  const bill = category.bills?.find((bill) => bill.id === billId);
  if (!bill) return <div>Nie znaleziono ustawy</div>;

  return (
    <div className={styles.ActsContainer}>
      <Link href={`/categories/${categoryId}`} className={styles.backLink}>
        ←
      </Link>

      <div className={styles.ActsContent}>
        <h1 className={styles.ActsTitle}>{bill.title}</h1>
        {bill.description && (
          <div className={styles.ActsDescription}>
            <h2>Opis</h2>
            <p>{bill.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionsContent;
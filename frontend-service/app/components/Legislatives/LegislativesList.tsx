"use server";

import Link from "next/link";
import { Legislative } from "@/app/types/legislative";
import { data as legislatives } from "@/app/utils/data";
import styles from "./LegislativesList.module.css";
// import { tryCatch } from "@/app/utils/try-catch";
import { STATUS_VARIANTS } from "@/app/constans/statusVariants";

// async function fetchLegislatives(): Promise<Legislative[]> {
//   const [response, error] = await tryCatch(
//     fetch(`${process.env.NEXT_PUBLIC_API}`)
//   );
//   if (error) {
//     console.error("catch error:", error);
//     return [];
//   }
//   const data = await response.json();
//   if (!response.ok) {
//     console.error("error:", data);
//     return [];
//   }
//   return data;
// }

const LegislativesList = async () => {
  return (
    <div className={styles.wrapper}>
      {legislatives.length === 0 ? (
        <p className={styles.empty}>Brak danych lub błąd API</p>
      ) : (
        <ul className={styles.list}>
          {legislatives.map((item: Legislative) => (
            <li key={item.id} className={styles.card}>
              <Link href={`/categories/${item.id}`} className={styles.link}>
                <span className={styles.title}>{item.title}</span>
                <div className={styles.statuses}>
                  {STATUS_VARIANTS.map((status) => (
                    <span
                      key={status.key}
                      className={styles.badge}
                      data-variant={status.variant}
                    >
                      {status.label} {status.count}
                    </span>
                  ))}
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
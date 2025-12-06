'use client';

import { useState } from 'react';
import { Legislative, Bill } from '@/app/types/legislative';
import styles from './CategoryContent.module.css';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

interface StatusGroup {
  key: string;
  label: string;
  variant: string;
  items: Bill[];
}

interface Props {
  item: Legislative;
  billsByStatus: StatusGroup[];
}

export default function CategoryContent({ item, billsByStatus }: Props) {
  const [expandedStatus, setExpandedStatus] = useState<string | null>(null);

  const toggleStatus = (key: string) => {
    setExpandedStatus(expandedStatus === key ? null : key);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{item.title}</h1>
        <p className={styles.content}>{item.content}</p>
      </div>

      {billsByStatus.length > 0 && (
        <div className={styles.actionsSection}>
          <h2 className={styles.actionsTitle}>Ustawy według statusu</h2>
          <div className={styles.statusList}>
            {billsByStatus.map((statusGroup) => (
              <div key={statusGroup.key} className={styles.statusGroup} data-variant={statusGroup.variant}>
                <button
                  className={styles.statusButton}
                  onClick={() => toggleStatus(statusGroup.key)}
                  data-variant={statusGroup.variant}
                  data-expanded={expandedStatus === statusGroup.key}
                >
                  <span className={styles.statusGroupTitle}>
                    {statusGroup.label} ({statusGroup.items.length})
                  </span>
                  <span className={styles.chevron}>
                    {expandedStatus === statusGroup.key ? <ChevronDownIcon /> : <ChevronRightIcon />}
                  </span>
                </button>

                {expandedStatus === statusGroup.key && (
                  <ul className={styles.actionsList}>
                    {statusGroup.items.map((bill) => (
                      <li key={bill.id} className={styles.actionItem} data-variant={statusGroup.variant}>
                        <h4 className={styles.actionTitle}>{bill.title}</h4>
                        {bill.description && <p className={styles.actionDescription}>{bill.description}</p>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Legislative, Bill } from '@/app/types/legislative';
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
  categoryId: string;
  onActionClick?: (bill: Bill) => void;
}

export default function CategoryContent({ item, billsByStatus, categoryId, onActionClick }: Props) {
  const router = useRouter();
  const [expandedStatus, setExpandedStatus] = useState<string | null>(null);

  const toggleStatus = (key: string) => {
    setExpandedStatus(expandedStatus === key ? null : key);
  };

  const handleActionClick = (bill: Bill) => {
    if (onActionClick) {
      onActionClick(bill);
    }
    router.push(`/categories/${categoryId}/acts/${bill.id}`);
  };

  return (
    <div className="w-full max-w-full mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--onSurface)' }}>{item.title}</h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--onSurface)' }}>{item.content}</p>
      </div>

      {billsByStatus.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-5" style={{ color: 'var(--onSurface)' }}>Ustawy według statusu</h2>
          <div className="flex flex-col gap-3">
            {billsByStatus.map((statusGroup) => (
              <div key={statusGroup.key} className="rounded-lg overflow-hidden" data-variant={statusGroup.variant}>
                <button
                  className="w-full flex justify-between items-center border-none p-4 font-inherit cursor-pointer transition-colors"
                  onClick={() => toggleStatus(statusGroup.key)}
                  data-variant={statusGroup.variant}
                  data-expanded={expandedStatus === statusGroup.key}
                  style={{ backgroundColor: `var(--accent-red-50)`, color: 'var(--onSurface)' }}
                >
                  <span className="font-bold text-lg">
                    {statusGroup.label} ({statusGroup.items.length})
                  </span>
                  <span className="w-6 h-6">
                    {expandedStatus === statusGroup.key ? <ChevronDownIcon /> : <ChevronRightIcon />}
                  </span>
                </button>

                {expandedStatus === statusGroup.key && (
                  <ul className="list-none m-0 p-0 flex flex-col gap-2">
                    {statusGroup.items.map((bill) => (
                      <button
                        key={bill.id}
                        className="w-full text-left p-3 rounded border-l-4 border-l-[var(--primary)] bg-none border-none font-inherit cursor-pointer transition-all flex flex-col items-start"
                        data-variant={statusGroup.variant}
                        onClick={() => handleActionClick(bill)}
                      >
                        <h4 className="font-bold m-0 mb-1" style={{ color: 'var(--onSurface)' }}>{bill.title}</h4>
                        {bill.description && <p className="text-sm m-0" style={{ color: 'var(--onSurface)', opacity: 0.8 }}>{bill.description}</p>}
                      </button>
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

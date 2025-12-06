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
    if (onActionClick) onActionClick(bill);
    router.push(`/categories/${categoryId}/acts/${bill.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-onSurface mb-4">{item.title}</h1>
        <p className="text-lg leading-relaxed text-onSurface">{item.content}</p>
      </div>
      {billsByStatus.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-onSurface mb-5">Ustawy według statusu</h2>
          <div className="flex flex-col gap-3">
            {billsByStatus.map((statusGroup) => (
              <div key={statusGroup.key} className="rounded-xl overflow-hidden border border-gray-200">
                <button
                  onClick={() => toggleStatus(statusGroup.key)}
                  className="w-full flex justify-between items-center p-4 bg-backgroundNav text-onSurface font-semibold cursor-pointer transition-all hover:bg-gray-100"
                  style={{backgroundColor: 'var(--backgroundNav)'}}
                >
                  <span>{statusGroup.label} ({statusGroup.items.length})</span>
                  {expandedStatus === statusGroup.key
                    ? <ChevronDownIcon className="w-6 h-6" />
                    : <ChevronRightIcon className="w-6 h-6" />}
                </button>
                {expandedStatus === statusGroup.key && (
                  <ul className="flex flex-col gap-2 p-2" style={{backgroundColor: 'var(--backgroundNav)'}}>
                    {statusGroup.items.map((bill) => (
                      <li key={bill.id}>
                        <button
                          onClick={() => handleActionClick(bill)}
                          className="w-full text-left p-3 rounded-lg border-l-4 border-primary bg-backgroundNav hover:bg-gray-50 transition-all flex flex-col gap-1"
                          style={{backgroundColor: 'var(--backgroundNav)'}}
                        >
                          <h4 className="font-bold text-onSurface">{bill.title}</h4>
                          {bill.description && (
                            <p className="text-sm text-onSurface/80">{bill.description}</p>
                          )}
                        </button>
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

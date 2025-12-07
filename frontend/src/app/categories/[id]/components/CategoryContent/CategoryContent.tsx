'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Legislative, Bill } from '@/app/types/legislative';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { STATUS_VARIANTS } from '@/app/constans/statusVariants';

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

  const getStatusTheme = (statusKey: string) =>
    STATUS_VARIANTS.find((variant) => variant.key === statusKey);

  const getPanelHeight = (itemsCount: number) => Math.max(140, itemsCount * 96);

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
              <div key={statusGroup.key} className="rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleStatus(statusGroup.key)}
                  className="w-full flex justify-between items-center p-4 text-onSurface font-semibold cursor-pointer transition-all"
                  style={{
                    backgroundColor: getStatusTheme(statusGroup.key)?.bgColor || 'var(--backgroundNav)',
                    color: getStatusTheme(statusGroup.key)?.color || 'var(--onSurface)'
                  }}
                >
                  <span>{statusGroup.label} ({statusGroup.items.length})</span>
                  <ChevronRightIcon
                    className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${
                      expandedStatus === statusGroup.key ? 'rotate-90' : 'rotate-0'
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-400 ease-out"
                  style={{
                    backgroundColor: 'var(--backgroundNav)',
                    maxHeight: expandedStatus === statusGroup.key ? `${getPanelHeight(statusGroup.items.length)}px` : '0px',
                    opacity: expandedStatus === statusGroup.key ? 1 : 0,
                    pointerEvents: expandedStatus === statusGroup.key ? 'auto' : 'none'
                  }}
                >
                  <ul className="flex flex-col gap-2 p-2">
                    {statusGroup.items.map((bill) => (
                      <li key={bill.id}>
                        <button
                          onClick={() => handleActionClick(bill)}
                          className="w-full text-left p-3 rounded-lg hover:opacity-90 transition-all flex flex-col gap-2 cursor-pointer"
                          style={{
                            backgroundColor: getStatusTheme(bill.status)?.bgColor || 'var(--background)',
                            color: getStatusTheme(statusGroup.key)?.color || 'var(--onSurface)'
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-bold text-onSurface">{bill.title}</h4>
                          </div>
                          {bill.description && (
                            <p className="text-sm text-onSurface/80">{bill.description}</p>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

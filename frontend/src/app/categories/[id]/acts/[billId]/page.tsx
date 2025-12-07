'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { data } from '@/app/utils/data';
import { STATUS_VARIANTS } from '@/app/constans/statusVariants';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function BillDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [expandedStatus, setExpandedStatus] = useState<string | null>(null);
  const [expandedHistoryItem, setExpandedHistoryItem] = useState<number | null>(null);
  const categoryId = params.id as string;
  const billId = params.billId as string;
  const category = data.find(cat => cat.id === categoryId);
  const bill = category?.bills?.find(b => b.id === billId);

  if (!category || !bill) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center">
          <p style={{ color: 'var(--onBackground)' }} className="text-lg mb-4">
            Nie znaleziono ustawy
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--onPrimary)' }}
          >
            Wróć do strony głównej
          </Link>
        </div>
      </div>
    );
  }

  const getStatusVariant = (statusKey: string) => {
    return STATUS_VARIANTS.find(s => s.key === statusKey);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div className="sticky top-0 z-40 backdrop-blur-sm" style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--outline)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:opacity-70 transition-opacity cursor-pointer"
            style={{ backgroundColor: 'var(--surfaceContainer)', color: 'var(--onSurface)' }}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div>
            <p style={{ color: 'var(--onSurfaceVariant)' }} className="text-sm">
              {category.title}
            </p>
            <h1 style={{ color: 'var(--onSurface)' }} className="text-2xl font-bold">
              {bill.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)' }}>
          <div className="mb-6">
            <p style={{ color: 'var(--onSurfaceVariant)' }} className="text-sm font-semibold mb-2">
              Opis
            </p>
            <p style={{ color: 'var(--onSurface)' }} className="text-base">
              {bill.description || 'Brak opisu'}
            </p>
          </div>

          <div>
            <p style={{ color: 'var(--onSurfaceVariant)' }} className="text-sm font-semibold mb-3">
              Aktualny status
            </p>
            {(() => {
              const statusVariant = getStatusVariant(bill.status);
              return (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: statusVariant?.bgColor,
                    color: statusVariant?.color,
                  }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusVariant?.color }} />
                  {statusVariant?.label}
                </div>
              );
            })()}
          </div>
        </div>
        <div className="mb-8 p-6 rounded-xl" style={{ backgroundColor: 'var(--surface)' }}>
          <h2 style={{ color: 'var(--onSurface)' }} className="text-xl font-bold mb-4">
            Statusy w procesie
          </h2>
          <div className="flex flex-col gap-2">
            {bill.statusHistory && bill.statusHistory.length > 0 && (
              <>
                {bill.statusHistory.slice(0, -1).length > 0 && (
                  <div className="rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedStatus(expandedStatus === 'history' ? null : 'history')}
                      className="w-full flex justify-between items-center p-4 font-semibold cursor-pointer transition-all"
                      style={{
                        backgroundColor: 'rgba(161, 51, 51, 0.15)',
                        color: 'rgba(161, 51, 51, 1)',
                      }}
                    >
                      <span>Przeszłe statusy ({bill.statusHistory.length - 1})</span>
                      <ChevronRightIcon
                        className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${
                          expandedStatus === 'history' ? 'rotate-90' : 'rotate-0'
                        }`}
                      />
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-400 ease-out"
                      style={{
                        backgroundColor: 'var(--backgroundNav)',
                        maxHeight: expandedStatus === 'history' ? `${(bill.statusHistory.length - 1) * 180 + 20}px` : '0px',
                        opacity: expandedStatus === 'history' ? 1 : 0,
                        pointerEvents: expandedStatus === 'history' ? 'auto' : 'none'
                      }}
                    >
                      <div className="flex flex-col gap-2 p-2">
                        {bill.statusHistory.slice(0, -1).map((entry, index) => {
                          const statusVariant = getStatusVariant(entry.status);
                          const date = new Date(entry.date);
                          const formattedDate = date.toLocaleDateString('pl-PL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          });
                          const isExpanded = expandedHistoryItem === index;

                          return (
                            <button
                              key={index}
                              onClick={() => setExpandedHistoryItem(isExpanded ? null : index)}
                              className="text-left rounded-lg border transition-all duration-500 ease-out hover:shadow-md overflow-hidden"
                              style={{
                                backgroundColor: statusVariant?.bgColor,
                                borderColor: statusVariant?.color,
                                borderWidth: '1px',
                                minHeight: isExpanded ? '130px' : '20px',
                              }}
                            >
                              <div className="p-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p
                                      className="font-semibold text-sm"
                                      style={{ color: statusVariant?.color }}
                                    >
                                      {statusVariant?.label}
                                    </p>
                                    <p style={{ color: 'var(--onSurfaceVariant)' }} className="text-xs mt-1">
                                      {formattedDate}
                                    </p>
                                  </div>
                                  <ChevronRightIcon
                                    className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ml-2 mt-1 ${
                                      isExpanded ? 'rotate-90' : 'rotate-0'
                                    }`}
                                    style={{ color: statusVariant?.color }}
                                  />
                                </div>
                                {isExpanded && (
                                  <div className="mt-3 pt-3 border-t" style={{ borderColor: statusVariant?.color }}>
                                    <p style={{ color: 'var(--onSurface)' }} className="text-sm leading-relaxed">
                                      Status w trakcie realizacji. Ustawa przechodzi przez kolejne etapy legislacyjne zgodnie z procedurą sejmu.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                <div className="rounded-xl overflow-hidden border-2" style={{ borderColor: getStatusVariant(bill.status)?.color }}>
                  <div
                    className="p-4 font-semibold"
                    style={{
                      backgroundColor: getStatusVariant(bill.status)?.bgColor,
                      color: getStatusVariant(bill.status)?.color,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>Aktualny: {getStatusVariant(bill.status)?.label}</span>
                      <span className="text-xs px-2 py-1 rounded font-bold bg-gradient-to-r animate-pulse" style={{
                        color: getStatusVariant(bill.status)?.color,
                      }}>
                        AKTUALNIE
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

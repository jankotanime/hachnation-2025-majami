import { STATUS_VARIANTS } from '@/app/constans/statusVariants';
import { StatusHistoryEntry } from '@/app/types/legislative';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface BillStatusHistoryProps {
    entry: StatusHistoryEntry,
    index: number,
    expandedHistoryItem: number | null,
    setExpandedHistoryItem: (index: number | null) => void
}
const BillStatusHistory = ({entry, index, expandedHistoryItem, setExpandedHistoryItem}: BillStatusHistoryProps) => {
    const getStatusVariant = (statusKey: string) => {
        return STATUS_VARIANTS.find(s => s.key === statusKey);
    };
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
}

export default BillStatusHistory
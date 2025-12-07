import Link from "next/link";
import { STATUS_VARIANTS } from "@/app/constans/statusVariants";
import { data } from "@/app/utils/data";

const ActsList = () => {
    const allBills = data.flatMap((category) =>
        (category.bills || []).map((bill) => ({
            categoryId: category.id,
            categoryTitle: category.title,
            bill,
        }))
    );

    const getStatusTheme = (statusKey: string) =>
        STATUS_VARIANTS.find((variant) => variant.key === statusKey);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--onSurface)" }}>
                Wszystkie ustawy
            </h1>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {allBills.map(({ categoryId, categoryTitle, bill }) => {
                    const theme = getStatusTheme(bill.status);
                    return (
                        <li key={`${categoryId}-${bill.id}`} className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--surface)" }}>
                            <Link
                                href={`/categories/${categoryId}/acts/${bill.id}`}
                                className="block p-4 md:p-5 no-underline transition-colors hover:opacity-90"
                                style={{ backgroundColor: "var(--surface)", color: "var(--onSurface)" }}
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <p className="text-xs uppercase tracking-wide" style={{ color: "var(--onSurface)", opacity: 0.7 }}>
                                                {categoryTitle}
                                            </p>
                                            <h3 className="text-lg font-semibold" style={{ color: "var(--onSurface)" }}>
                                                {bill.title}
                                            </h3>
                                        </div>
                                        <span
                                            className="px-3 py-1 rounded-full text-xs font-semibold"
                                            style={{
                                                backgroundColor: theme?.bgColor || "var(--backgroundNav)",
                                                color: theme?.color || "var(--onSurface)",
                                                border: `1px solid ${theme?.color || "transparent"}`,
                                            }}
                                        >
                                            {theme?.label || bill.status}
                                        </span>
                                    </div>
                                    {bill.description && (
                                        <p className="text-sm" style={{ color: "var(--onSurface)", opacity: 0.85 }}>
                                            {bill.description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ActsList;
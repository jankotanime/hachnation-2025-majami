import Link from "next/link";
import { STATUS_VARIANTS } from "@/app/constans/statusVariants";
import { fetchLegislatives } from "@/app/utils/api/fetchLegislatives";
import { Legislation } from "@/app/types/legislative";

type ActsListProps = {
    id: string;
};

  const ActsList = async ({ id }: ActsListProps) => {
    const dataAwait = await fetchLegislatives(Number(id), 0);

    console.log(dataAwait)
    const data: Legislation[] | undefined = dataAwait ? dataAwait.data : []

    if (data != undefined) {

    console.log(id)

    const getStatusTheme = (statusKey: string) =>
        STATUS_VARIANTS.find((variant) => variant.key === statusKey);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--onSurface)" }}>
                Wszystkie ustawy
            </h1>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {data.map(({ id, sejmTerm, apiLegislationNumber, title, description,  aiExplanation, stages, status  }) => {
                    const theme = getStatusTheme(status);
                    return (
                        <li key={`${id}`} className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--surface)" }}>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <p className="text-xs uppercase tracking-wide" style={{ color: "var(--onSurface)", opacity: 0.7 }}>
                                                {}
                                            </p>
                                            <h3 className="text-lg font-semibold" style={{ color: "var(--onSurface)" }}>
                                                {title}
                                            </h3>
                                        </div>
                                        {/* <div className="w-36 flex justify-center items-center shrink-0">
                                            <Eagle status={bill.status} />
                                            </div> */}
                                        <span
                                            className="px-3 py-1 rounded-full text-xs font-semibold"
                                            style={{
                                                backgroundColor: theme?.bgColor || "var(--backgroundNav)",
                                                color: theme?.color || "var(--onSurface)",
                                                border: `1px solid ${theme?.color || "transparent"}`,
                                            }}
                                            >
                                            {theme?.label || status}
                                        </span>
                                    </div>
                                    {description && (
                                        <p className="text-sm" style={{ color: "var(--onSurface)", opacity: 0.85 }}>
                                            {description}
                                        </p>
                                    )}
                                </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
    }

    return (
        <div>

        </div>
    )
};

export default ActsList;
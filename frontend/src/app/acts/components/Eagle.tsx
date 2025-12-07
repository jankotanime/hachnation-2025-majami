import Image from "next/image"

const Eagle = ({ status }: { status: string }) => {
    return (
        <Image
            src={
                status === "uchwalony"
                    ? "/images/flaga-p1.png"
                    : status === "sejm"
                        ? "/images/flaga-p2.png"
                        : status === "anulowany"
                            ? "/images/flaga-p3.png"
                            : "/images/flaga-p3.png"
            }
            alt="Eagle"
            width={400}
            height={10}
        />
    )
}

export default Eagle
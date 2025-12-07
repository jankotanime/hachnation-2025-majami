import Image from "next/image";

const Footer = () => {
    return (
        <footer className="w-full" style={{ backgroundColor: 'var(--surface)', color: 'var(--onSurface)' }}>
            <div className="pt-8">
                <div className="h-1 w-full" style={{ backgroundColor: 'var(--accent-red-200)'}}></div>
            </div>
            <div className="px-8 py-12 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div>
                        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--accent-red-200)' }}>O projekcie</h3>
                        <p className="text-sm leading-relaxed opacity-90">
                            Platforma informacyjna poświęcona ustawom i aktom prawnym. Śledzenie przebiegu procesów legislacyjnych w Polsce z dokładnymi informacjami o statusie każdej ustawy.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--accent-red-200)' }}>Nawigacja</h3>
                        <ul className="text-sm space-y-2 opacity-90">
                            <li><a href="/" className="hover:opacity-70 transition-opacity">Strona główna</a></li>
                            <li><a href="#" className="hover:opacity-70 transition-opacity">O projekcie</a></li>
                            <li><a href="#" className="hover:opacity-70 transition-opacity">Kontakt</a></li>
                            <li><a href="#" className="hover:opacity-70 transition-opacity">Polityka prywatności</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--accent-red-200)' }}>Informacje</h3>
                        <p className="text-sm leading-relaxed opacity-90">
                            Projekt wspierający transparentność procesu legislacyjnego. Wszystkie dane pochodzą z oficjalnych źródeł rządowych i parlamentarnych.
                        </p>
                    </div>
                </div>
                <div className="border-t" style={{ borderColor: 'var(--accent-red-200)' }} >
                    <div className="pt-8 flex flex-col items-center justify-center">
                        <Image
                            src="/images/godlo.png"
                            alt="godlo"
                            width={50}
                            height={50}
                            className="mb-4"
                        />
                        <p className="text-xs opacity-75 text-center">
                            © 2025 Platforma Legislacyjna. Wszystkie prawa zastrzeżone.
                        </p>
                        <p className="text-xs opacity-60 mt-2">
                            Realtime monitoring aktów prawnych Rzeczypospolitej Polskiej
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
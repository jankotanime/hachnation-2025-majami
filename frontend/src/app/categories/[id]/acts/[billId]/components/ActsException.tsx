import Link from "next/link";
const ActsException = () => {
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

export default ActsException
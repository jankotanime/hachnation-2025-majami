import LegislativesList from "./components/Legislatives/Legislatives";

export default function Home() {
  return (
    <div className="mt-5" style={{ backgroundColor: 'var(--background)'}}>
      <LegislativesList />
    </div>
  );
}

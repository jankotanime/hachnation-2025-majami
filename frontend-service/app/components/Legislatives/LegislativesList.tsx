'use server'
import React from 'react';
import { tryCatch } from '@/app/utils/try-catch';

async function fetchLegislatives(): Promise<Legislative[]> {
  const [response, error] = await tryCatch(
    fetch(`${process.env.NEXT_PUBLIC_API}`)
  );
  if (error) {
    console.error("catch error:", error);
    return [];
  }
  const data = await response.json();
  if (!response.ok) {
    console.error("error:", data);
    return [];
  }
  return data;
}

const LegislativesList = async () => {
  const legislatives = await fetchLegislatives();

  return (
    <div>
      <h2>Legislatives</h2>
      {legislatives.length === 0 ? (
        <p>Brak danych lub błąd API</p>
      ) : (
        <ul>
          {legislatives.map((item: Legislative) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LegislativesList;
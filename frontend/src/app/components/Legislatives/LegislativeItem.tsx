'use client';

import Link from "next/link";
import { useState } from "react";
import { Legislative } from "@/app/types/legislative";

interface Props {
  item: Legislative;
}

export default function LegislativeItem({ item }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li className="mb-4 rounded-xl overflow-hidden">
      <Link
        href={`/acts/${item.id}`}
        className="block p-6 transition-all no-underline"
        style={{
          backgroundColor: isHovered ? 'var(--accent-red-50)' : 'var(--surface)',
          color: 'var(--onSurface)',
          boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="text-lg font-bold block" style={{ color: 'var(--onSurface)' }}>
          {item.title}
        </span>
      </Link>
    </li>
  );
}

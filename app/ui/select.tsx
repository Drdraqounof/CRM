import React from 'react';

export function Select({
  children,
  ...props
}: { children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className="border rounded px-3 py-2 w-full" {...props}>
      {children}
    </select>
  );
}

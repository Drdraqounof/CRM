
import React, { ReactNode, HTMLAttributes } from 'react';

export function Card({
  children,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="bg-white rounded-lg shadow p-4" {...props}>
      {children}
    </div>
  );
}


export function CardHeader({
  children,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="mb-2 font-bold text-lg" {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="text-xl font-semibold mb-1" {...props}>
      {children}
    </div>
  );
}

export function CardDescription({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="text-gray-500 mb-2" {...props}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="mb-2" {...props}>
      {children}
    </div>
  );
}

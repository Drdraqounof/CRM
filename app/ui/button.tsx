
import React, { ReactNode, ButtonHTMLAttributes } from 'react';

export function Button({
  children,
  className = '',
  ...props
}: { children: ReactNode; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button 
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}

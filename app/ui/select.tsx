import React from 'react';

export function Select({ children, ...props }) {
  return <select className="border rounded px-3 py-2 w-full" {...props}>{children}</select>;
}

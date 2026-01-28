"use client";

import { useEffect, useState } from "react";
import { loadTheme, getTheme, ThemeColor } from "@/lib/theme";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeColor>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(loadTheme());
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  const themeConfig = getTheme(theme);

  return (
    <div className={`${themeConfig.bg} min-h-screen transition-colors duration-300`}>
      {children}
    </div>
  );
}

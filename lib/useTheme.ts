import { useEffect, useState } from "react";
import { loadTheme, getTheme, ThemeColor } from "@/lib/theme";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeColor>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const currentTheme = loadTheme();
    setTheme(currentTheme);
    setMounted(true);

    // Listen for storage changes (when theme is changed in another tab)
    const handleStorageChange = () => {
      setTheme(loadTheme());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    theme,
    themeConfig: mounted ? getTheme(theme) : getTheme("light"),
    mounted,
  };
}

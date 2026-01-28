export type ThemeColor = "light" | "dark" | "navy" | "tan" | "caramel";

export const themes = {
  light: {
    name: "Light",
    bg: "bg-gray-50",
    surface: "bg-white",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    border: "border-gray-200",
    primary: "bg-blue-600 hover:bg-blue-700",
    primaryText: "text-blue-600",
    sidebar: "bg-white border-r border-gray-200",
    card: "bg-white border border-gray-200",
    accent: "bg-blue-50",
  },
  dark: {
    name: "Dark",
    bg: "bg-gray-900",
    surface: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-300",
    border: "border-gray-700",
    primary: "bg-blue-600 hover:bg-blue-700",
    primaryText: "text-blue-400",
    sidebar: "bg-gray-800 border-r border-gray-700",
    card: "bg-gray-800 border border-gray-700",
    accent: "bg-blue-900",
  },
  navy: {
    name: "Navy",
    bg: "bg-slate-900",
    surface: "bg-slate-800",
    text: "text-white",
    textSecondary: "text-slate-300",
    border: "border-slate-700",
    primary: "bg-indigo-600 hover:bg-indigo-700",
    primaryText: "text-indigo-400",
    sidebar: "bg-slate-800 border-r border-slate-700",
    card: "bg-slate-800 border border-slate-700",
    accent: "bg-indigo-900",
  },
  tan: {
    name: "Tan",
    bg: "bg-amber-50",
    surface: "bg-white",
    text: "text-amber-950",
    textSecondary: "text-amber-800",
    border: "border-amber-200",
    primary: "bg-amber-700 hover:bg-amber-800",
    primaryText: "text-amber-700",
    sidebar: "bg-amber-100 border-r border-amber-300",
    card: "bg-white border border-amber-200",
    accent: "bg-amber-100",
  },
  caramel: {
    name: "Caramel",
    bg: "bg-orange-50",
    surface: "bg-white",
    text: "text-orange-950",
    textSecondary: "text-orange-800",
    border: "border-orange-200",
    primary: "bg-orange-600 hover:bg-orange-700",
    primaryText: "text-orange-600",
    sidebar: "bg-orange-100 border-r border-orange-300",
    card: "bg-white border border-orange-200",
    accent: "bg-orange-100",
  },
};

export const getTheme = (color: ThemeColor) => themes[color];

export const saveTheme = (color: ThemeColor) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("app-theme", color);
  }
};

export const loadTheme = (): ThemeColor => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("app-theme");
    if (saved && saved in themes) {
      return saved as ThemeColor;
    }
  }
  return "light";
};

import { useThemeContext } from "@/providers/ThemeProvider";

export function useTheme() {
  return useThemeContext();
}
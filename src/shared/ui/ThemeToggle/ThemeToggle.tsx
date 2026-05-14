import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { AppButton } from "@/shared/ui/AppButton";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <AppButton
      variant="ghost"
      onClick={toggleTheme}
      icoLeft={theme === "light" ? Moon : Sun}
    />
  );
};

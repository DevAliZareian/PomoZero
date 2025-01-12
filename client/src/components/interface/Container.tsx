import { PropsWithChildren } from "react";
import { useMode } from "../../contexts/ModeContext";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Container({ children }: PropsWithChildren) {
  const isDarkMode = useDarkMode();
  const { color } = useMode();
  return (
    <div style={{ backgroundColor: isDarkMode ? "black" : color }} className="relative w-full min-h-screen flex flex-col items-center justify-start p-3 transition-colors duration-300 ease-in-out">
      {children}
    </div>
  );
}

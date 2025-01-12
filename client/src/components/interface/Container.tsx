import { PropsWithChildren } from "react";
import { useMode } from "../../contexts/ModeContext";
import { useDarkMode } from "../../hooks/useDarkMode";

type ContainerProps = {
  setShowTasksOption: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Container({ children, setShowTasksOption }: PropsWithChildren<ContainerProps>) {
  const isDarkMode = useDarkMode();
  const { color } = useMode();
  return (
    <div
      onClick={() => setShowTasksOption(false)}
      style={{ backgroundColor: isDarkMode ? "black" : color }}
      className="relative w-full min-h-screen flex flex-col items-center justify-start p-3 transition-colors duration-300 ease-in-out"
    >
      {children}
    </div>
  );
}

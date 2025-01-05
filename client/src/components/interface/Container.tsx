import { PropsWithChildren } from "react";
import { useMode } from "../../contexts/ModeContext";

export default function Container({ children }: PropsWithChildren) {
  const { color } = useMode();
  return (
    <div style={{ backgroundColor: color }} className="relative w-full min-h-screen flex flex-col items-center justify-start p-3 transition-colors duration-300 ease-in-out">
      {children}
    </div>
  );
}

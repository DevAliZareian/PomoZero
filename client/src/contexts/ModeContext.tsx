import React, { createContext, PropsWithChildren, useContext, useState, useMemo } from "react";
import { Mode } from "../utils/types";

type ModeContextTypes = {
  mode: Mode;
  color: string;
  initialTime: string;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  nextMode: () => void; // Add this function to cycle modes
};

const modeSettings: Record<Mode, { color: string; initialTime: string }> = {
  work: { color: "#0B90A7ff", initialTime: "00:00:03" },
  shortRest: { color: "#2a9d8f", initialTime: "00:00:03" },
  longRest: { color: "#F0885Cff", initialTime: "00:00:03" },
};

const modeSequence: Mode[] = ["work", "shortRest", "longRest"]; // Define the sequence of modes

const ModeContext = createContext<ModeContextTypes | undefined>(undefined);

export default function ModeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<Mode>("work");

  const { color, initialTime } = useMemo(() => modeSettings[mode], [mode]);

  const nextMode = () => {
    setMode((prevMode) => {
      const currentIndex = modeSequence.indexOf(prevMode);
      const nextIndex = (currentIndex + 1) % modeSequence.length; // Cycle back to the start
      console.log(modeSequence[nextIndex]);
      return modeSequence[nextIndex];
    });
  };

  return <ModeContext.Provider value={{ mode, color, initialTime, setMode, nextMode }}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}

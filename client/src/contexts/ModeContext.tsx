import React, { createContext, PropsWithChildren, useContext, useState, useMemo } from "react";
import { Mode } from "../utils/types";

type ModeContextTypes = {
  mode: Mode;
  color: string;
  initialTime: string;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
};

const modeSettings: Record<Mode, { color: string; initialTime: string }> = {
  work: { color: "#3A3F47", initialTime: "00:25:00" },
  shortRest: { color: "#B9A7D1", initialTime: "00:05:00" },
  longRest: { color: "#2a9d8f", initialTime: "00:15:00" },
};

const ModeContext = createContext<ModeContextTypes | undefined>(undefined);

export default function ModeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<Mode>("work");
  const { color, initialTime } = useMemo(() => modeSettings[mode], [mode]);
  return <ModeContext.Provider value={{ mode, color, initialTime, setMode }}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}

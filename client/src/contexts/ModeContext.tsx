import React, { createContext, PropsWithChildren, useContext, useState, useMemo } from "react";

type Mode = "work" | "shortRest" | "longRest";

type ModeContextTypes = {
  mode: Mode;
  color: string;
  time: string;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
};

const modeSettings: Record<Mode, { color: string; time: string }> = {
  work: { color: "#e76f51", time: "00:25:00" },
  shortRest: { color: "#f4a261", time: "00:05:00" },
  longRest: { color: "#2a9d8f", time: "00:15:00" },
};

const ModeContext = createContext<ModeContextTypes | undefined>(undefined);

export default function ModeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<Mode>("work");
  const { color, time } = useMemo(() => modeSettings[mode], [mode]);
  return <ModeContext.Provider value={{ mode, color, time, setMode }}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}

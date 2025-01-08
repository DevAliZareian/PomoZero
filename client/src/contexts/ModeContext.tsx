import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { Mode } from "../utils/types";
import { useSetting } from "./SettingContext";

type ModeContextTypes = {
  mode: Mode;
  color: string;
  initialTime: string;
  pomodoroCounter: number;
  resetPomodoroCounter: () => void;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  nextMode: () => void;
};

const modeSettings: Record<Mode, { color: string }> = {
  work: { color: "#1b263b" },
  shortRest: { color: "#2a9d8f" },
  longRest: { color: "#F0885Cff" },
};

const ModeContext = createContext<ModeContextTypes | undefined>(undefined);

export default function ModeProvider({ children }: PropsWithChildren) {
  const { settings } = useSetting();
  const [mode, setMode] = useState<Mode>("work");
  const [pomodoroCounter, setPomodoroCounter] = useState<number>(() => {
    const storedCounter = localStorage.getItem("pomodoroCounter");
    return Number(storedCounter) || 1;
  });

  const { color } = modeSettings[mode];
  const initialTime = settings[mode];

  const nextMode = () => {
    setMode((prevMode) => {
      if (prevMode === "work") {
        const newCounter = pomodoroCounter + 1;
        setPomodoroCounter(newCounter);
        localStorage.setItem("pomodoroCounter", newCounter.toString());

        return newCounter % settings.longBreakInterval === 0 ? "longRest" : "shortRest";
      }

      if (prevMode === "shortRest" || prevMode === "longRest") {
        return "work";
      }

      return prevMode;
    });
  };

  function resetPomodoroCounter() {
    setPomodoroCounter(1);
    localStorage.setItem("pomodoroCounter", "1");
  }

  const value = {
    mode,
    color,
    initialTime,
    pomodoroCounter,
    resetPomodoroCounter,
    setMode,
    nextMode,
  };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}

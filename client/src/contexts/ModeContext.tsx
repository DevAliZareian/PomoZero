import React, { createContext, PropsWithChildren, useContext, useState, useMemo, useCallback } from "react";
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

const ModeContext = createContext<ModeContextTypes | undefined>(undefined);

export default function ModeProvider({ children }: PropsWithChildren) {
  const { settings } = useSetting();
  const [mode, setMode] = useState<Mode>("work");

  const [pomodoroCounter, setPomodoroCounter] = useState<number>(() => {
    const storedCounter = Number(localStorage.getItem("pomodoroCounter"));
    return isNaN(storedCounter) ? 1 : storedCounter;
  });

  const color = settings[`${mode}Color`];
  const initialTime = settings[mode];

  const nextMode = useCallback(() => {
    setMode((prevMode) => {
      if (prevMode === "work") {
        const newCounter = pomodoroCounter + 1;
        setPomodoroCounter(newCounter);
        localStorage.setItem("pomodoroCounter", newCounter.toString());

        return newCounter % settings.longBreakInterval === 0 ? "longRest" : "shortRest";
      }
      return "work";
    });
  }, [pomodoroCounter, settings.longBreakInterval]);

  const resetPomodoroCounter = useCallback(() => {
    setPomodoroCounter(1);
    localStorage.setItem("pomodoroCounter", "1");
  }, []);

  const value = useMemo(
    () => ({
      mode,
      color,
      initialTime,
      pomodoroCounter,
      resetPomodoroCounter,
      setMode,
      nextMode,
    }),
    [mode, color, initialTime, pomodoroCounter, resetPomodoroCounter, nextMode]
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}

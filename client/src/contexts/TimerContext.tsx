import { createContext, useContext, useMemo, useState, useEffect, useCallback, PropsWithChildren } from "react";
import { parseTime, sendNotification } from "../utils/helpers";
import { useMode } from "../contexts/ModeContext";

type TimerContextType = {
  time: number;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  progress: number;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: PropsWithChildren) => {
  const { initialTime } = useMode();
  const parsedInitialTime = useMemo(() => parseTime(initialTime), [initialTime]);

  const [time, setTime] = useState<number>(parsedInitialTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const decrementTime = useCallback(() => {
    setTime((prevTime) => {
      if (prevTime <= 1) {
        setIsActive(false);
        /* sendNotification(); */
        return 0;
      }
      return prevTime - 1;
    });
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(decrementTime, 1000);
    return () => clearInterval(interval);
  }, [isActive, decrementTime]);

  useEffect(() => {
    setProgress(((parsedInitialTime - time) / parsedInitialTime) * 100);
  }, [time, parsedInitialTime]);

  useEffect(() => {
    setTime(parsedInitialTime);
  }, [parsedInitialTime]);

  const value = { time, isActive, setIsActive, progress };

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

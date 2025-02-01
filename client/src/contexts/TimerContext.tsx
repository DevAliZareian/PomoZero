import { createContext, useContext, useMemo, useState, useEffect, useCallback, PropsWithChildren } from "react";
import { parseTime, sendNotification } from "../utils/helpers";
import { useMode } from "../contexts/ModeContext";
import { useTasks } from "./TasksContext";
import { useSetting } from "./SettingContext";

type TimerContextType = {
  time: number;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  progress: number;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: PropsWithChildren) => {
  const { initialTime, mode, nextMode } = useMode();
  const { settings } = useSetting();
  const { updateActPomodoros, getActiveTask } = useTasks();

  const parsedInitialTime = useMemo(() => parseTime(initialTime), [initialTime]);
  const [time, setTime] = useState<number>(parsedInitialTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const activeTaskId = useMemo(() => getActiveTask()?.id, [getActiveTask]);

  const resetTimer = useCallback(() => {
    setTime(parsedInitialTime);
    setProgress(0);
  }, [parsedInitialTime]);

  const handleTimerEnd = useCallback(() => {
    setIsActive(false);
    sendNotification("Timer Ended", "Your timer has finished.");

    if (mode === "work" && activeTaskId) {
      updateActPomodoros(activeTaskId);
    }
    nextMode();
    resetTimer();
  }, [activeTaskId, mode, nextMode, resetTimer, updateActPomodoros]);

  const decrementTime = useCallback(() => {
    setTime((prevTime) => {
      if (prevTime <= 1) {
<<<<<<< Updated upstream
        handleTimerEnd();
=======
        setIsActive(false);
        sendNotification("پوموزیرو", "وقت تمومه!");
        setTimeout(() => {
          if (mode === "work" && activeTaskId) {
            updateActPomodoros(activeTaskId);
          }
          nextMode();
        }, 0);

        resetTimer();
>>>>>>> Stashed changes
        return 0;
      }
      return prevTime - 1;
    });
  }, [handleTimerEnd]);

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

  useEffect(() => {
    const shouldAutoStart = (mode === "work" && settings.autoStartPomodoros) || (mode !== "work" && settings.autoStartBreaks);

    setIsActive(shouldAutoStart);
    resetTimer();
  }, [mode, settings.autoStartPomodoros, settings.autoStartBreaks, resetTimer]);

  const value = useMemo(() => ({ time, isActive, setIsActive, progress }), [time, isActive, progress]);

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

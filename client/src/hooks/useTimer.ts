import { useEffect, useState, useMemo, useCallback } from "react";
import { parseTime, sendNotification } from "../utils/helpers";

export function useTimer(initialTime: string) {
  const parsedInitialTime = useMemo(() => parseTime(initialTime), [initialTime]);

  const [time, setTime] = useState<number>(parsedInitialTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const decrementTime = useCallback(() => {
    setTime((prevTime) => {
      if (prevTime <= 1) {
        /* sendNotification(); */
        setIsActive(false);
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

  return { isActive, setIsActive, progress, time };
}

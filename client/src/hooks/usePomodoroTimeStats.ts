import { useState, useEffect } from "react";
import { useTasks } from "../contexts/TasksContext";
import { useMode } from "../contexts/ModeContext";
import { useSetting } from "../contexts/SettingContext";

interface PomodoroTimeStats {
  endTime: string;
  timeDifference: number;
}

// Helper function to parse time string in "HH:mm" format and return the number of minutes
const parseTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

function usePomodoroTimeStats(): PomodoroTimeStats {
  const { settings } = useSetting();
  const { getPomodorosSum, tasks } = useTasks();
  const { pomodoroCounter } = useMode();

  const [endTime, setEndTime] = useState<string>("");
  const [timeDifference, setTimeDifference] = useState<number>(0);

  useEffect(() => {
    const calculatePomodoroEndTime = () => {
      const currentTime = new Date();

      const pomodoroTimeInMinutes = parseTimeToMinutes(settings.work); // Total Pomodoro time in minutes
      const shortRestTimeInMinutes = parseTimeToMinutes(settings.shortRest); // Short Rest time in minutes
      const longRestTimeInMinutes = parseTimeToMinutes(settings.longRest); // Long Rest time in minutes

      const totalPomodoros = getPomodorosSum("pomodoros") - getPomodorosSum("actPomodoros") < 0 ? 0 : getPomodorosSum("pomodoros") - getPomodorosSum("actPomodoros");

      // Total Pomodoro and short rest time in minutes
      let pomodoroEndTimeInMinutes = pomodoroTimeInMinutes * totalPomodoros + shortRestTimeInMinutes;
      if (pomodoroCounter % settings.longBreakInterval === 0) {
        pomodoroEndTimeInMinutes = pomodoroTimeInMinutes * totalPomodoros + shortRestTimeInMinutes + longRestTimeInMinutes; // Long rest interval
      }

      // Add the minutes to the current time
      currentTime.setMinutes(currentTime.getMinutes() + pomodoroEndTimeInMinutes);

      // Calculate the time difference in milliseconds
      const now = new Date();
      const diffInMillis = currentTime.getTime() - now.getTime();

      // Convert milliseconds to hours
      const diffInHours = diffInMillis / (1000 * 60 * 60);
      const difference = diffInHours < 1 ? 0 : Number(diffInHours.toFixed()); // If less than 1 hour, set to 0

      // Format the Pomodoro end time
      let hours = currentTime.getHours();
      const minutes = currentTime.getMinutes().toString().padStart(2, "0");

      if (settings.hourFormat === "12hrs") {
        // Convert 24-hour format to 12-hour format
        /* const period = hours >= 12 ? "PM" : "AM"; */
        hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        const formattedEndTime = `${hours}:${minutes}`;
        setEndTime(formattedEndTime);
      } else {
        // Use 24-hour format
        const formattedEndTime = `${hours.toString().padStart(2, "0")}:${minutes}`;
        setEndTime(formattedEndTime);
      }

      setTimeDifference(difference);
    };

    calculatePomodoroEndTime();

    // Recalculate every minute
    const intervalId = setInterval(calculatePomodoroEndTime, 60000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [settings, tasks]);

  return { endTime, timeDifference };
}

export default usePomodoroTimeStats;

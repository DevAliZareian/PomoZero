import { useTimer } from "../../contexts/TimerContext";
import { useDarkMode } from "../../hooks/useDarkMode";
import { formatTime } from "../../utils/helpers";

export default function Timer() {
  const { time } = useTimer();
  const isDarkMode = useDarkMode();
  return <h1 className={`font-bold text-[6rem] mt-[18px] ${isDarkMode ? "text-[rgb(170,170,170)]" : "text-white"} tabular-nums text-center`}>{formatTime(time)}</h1>;
}

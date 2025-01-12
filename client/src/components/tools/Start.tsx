import { useMode } from "../../contexts/ModeContext";
import { useTimer } from "../../contexts/TimerContext";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Start() {
  const { setIsActive, isActive } = useTimer();
  const { color } = useMode();
  const isDarkMode = useDarkMode();
  return (
    <button
      onClick={() => setIsActive(!isActive)}
      style={{ color: isDarkMode ? "rgb(170,170,170)" : color, boxShadow: !isActive ? "rgb(235, 235, 235) 0px 6px 0px" : "none" }}
      className={`${isActive && "translate-y-[6px]"} cursor-pointer border-none p-4 rounded-[4px] shadow text-2xl font-bold w-1/2 ${isDarkMode ? "bg-none" : "bg-white"}`}
    >
      {isActive ? "توقف" : "شروع"}
    </button>
  );
}

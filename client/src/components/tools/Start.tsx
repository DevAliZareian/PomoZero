import { useMode } from "../../contexts/ModeContext";
import { useTimer } from "../../contexts/TimerContext";

export default function Start() {
  const { setIsActive, isActive } = useTimer();
  const { color } = useMode();
  return (
    <button
      onClick={() => setIsActive(!isActive)}
      style={{ color, boxShadow: !isActive ? "rgb(235, 235, 235) 0px 6px 0px" : "none" }}
      className={`${isActive && "translate-y-[6px]"} cursor-pointer border-none p-4 rounded-[4px] shadow text-2xl font-bold w-1/2 bg-white`}
    >
      {isActive ? "توقف" : "شروع"}
    </button>
  );
}

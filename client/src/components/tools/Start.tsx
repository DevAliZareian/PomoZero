import { useMode } from "../../contexts/ModeContext";
import { useTimer } from "../../contexts/TimerContext";

export default function Start() {
  const { setIsActive, isActive } = useTimer();
  const { color } = useMode();
  return (
    <button disabled={isActive} onClick={() => setIsActive(true)} style={{ color }} className="cursor-pointer border-none p-4 rounded-[4px] shadow text-2xl font-bold w-1/2 bg-white">
      شروع
    </button>
  );
}

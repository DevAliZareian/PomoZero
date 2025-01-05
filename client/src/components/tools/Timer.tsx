import { useTimer } from "../../contexts/TimerContext";
import { formatTime } from "../../utils/helpers";

export default function Timer() {
  const { time } = useTimer();
  return <h1 className="font-bold text-[6rem] mt-[18px] text-white tabular-nums text-center">{formatTime(time)}</h1>;
}

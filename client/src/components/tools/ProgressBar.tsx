import { useTimer } from "../../contexts/TimerContext";

export default function ProgressBar() {
  const { progress } = useTimer();
  return <div className={`absolute bottom-0 border-b border-b-white`} style={{ width: `${progress}%` }}></div>;
}

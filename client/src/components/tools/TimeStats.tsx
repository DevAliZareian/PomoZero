import { useTasks } from "../../contexts/TasksContext";
import usePomodoroTimeStats from "../../hooks/usePomodoroTimeStats";

export default function TimeStats() {
  const { endTime, timeDifference } = usePomodoroTimeStats();
  const { tasks, getPomodorosSum } = useTasks();
  const totalPomodoros = getPomodorosSum("pomodoros");
  const totalActPomodoros = getPomodorosSum("actPomodoros");
  return (
    <>
      {tasks.length > 0 && (
        <div className="mt-7 py-[18px] px-3 border-t border-t-[rgba(255,255,255,0.8)] text-center flex items-center justify-center gap-4 bg-[rgba(255,255,255,0.1)] w-full">
          <div className="mx-2 inline-block text-[rgba(255,255,255,0.7)]">
            {"پوموها: "}
            <span className="text-[rgb(255,255,255)] font-bold text-[24px] ml-[1px] mr-[2px]">{totalActPomodoros}</span>
            <span className="ml-[1px] mr-[3px]">/</span>
            <span className="text-[rgb(255,255,255)] font-bold text-[24px] ml-[1px] mr-[2px]">{totalPomodoros}</span>
          </div>
          <div className="mx-2 inline-block text-[rgba(255,255,255,0.7)]">
            {"تمام میشه در: "}
            <span className="text-[rgb(255,255,255)] font-bold text-[24px] ml-[1px] mr-[2px]">{endTime}</span> ({timeDifference} ساعت)
          </div>
        </div>
      )}
    </>
  );
}

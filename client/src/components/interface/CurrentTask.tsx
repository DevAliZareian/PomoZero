import { useTasks } from "../../contexts/TasksContext";

export default function CurrentTask() {
  const { currentTask } = useTasks();
  return (
    <>
      <div className="cursor-pointer select-none inline-block text-base opacity-[0.6] mb-1 text-white">#1</div>
      <div className="text-lg font-extralight text-white">{currentTask ? currentTask : "وقت کاره!"}</div>
    </>
  );
}

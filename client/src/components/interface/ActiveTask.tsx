import { useTasks } from "../../contexts/TasksContext";

export default function ActiveTask() {
  const { getActiveTask } = useTasks();
  const activeTask = getActiveTask();
  return (
    <>
      <div className="cursor-pointer select-none inline-block text-base opacity-[0.6] mb-1 text-white">#1</div>
      <div className="text-lg font-extralight text-white">{activeTask ? activeTask.title : "وقت کاره!"}</div>
    </>
  );
}

import { useTasks } from "../../contexts/TasksContext";

export default function AddTask() {
  const { setTaskForm } = useTasks();
  return (
    <div
      onClick={() => setTaskForm({ show: true })}
      className="w-full h-16 bg-[rgba(0,0,0,0.1)] rounded-[8px] flex items-center justify-center cursor-pointer opacity-[0.8] mt-3 border-2 border-dashed border-[rgba(255,255,255,0.4)]"
    >
      ماموریت جدید
    </div>
  );
}

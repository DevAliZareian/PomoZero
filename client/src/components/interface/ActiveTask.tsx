import { useMode } from "../../contexts/ModeContext";
import { useTasks } from "../../contexts/TasksContext";

export default function ActiveTask() {
  const { getActiveTask } = useTasks();
  const { mode, pomodoroCounter, resetPomodoroCounter } = useMode();
  const activeTask = getActiveTask();

  const getDefaultTitle = () => {
    switch (mode) {
      case "work":
        return "وقت کاره!";
      case "shortRest":
        return "یه لیوان آب بخور";
      case "longRest":
        return "شو خوش";
    }
  };

  const title = activeTask ? activeTask.title : getDefaultTitle();

  return (
    <div className="text-white">
      <div onClick={resetPomodoroCounter} className="cursor-pointer select-none text-base opacity-60 mb-1">
        #{pomodoroCounter}
      </div>
      <div className="text-lg font-extralight">{title}</div>
    </div>
  );
}

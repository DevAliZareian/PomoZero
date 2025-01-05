import { useTasks } from "../../contexts/TasksContext";
import Task from "../interface/Task";
export default function Tasks() {
  const { tasks } = useTasks();

  return <div className="flex flex-col items-center justify-center w-full gap-3">{tasks.length >= 0 && tasks.map((task) => <Task key={task.id} task={task} />)}</div>;
}

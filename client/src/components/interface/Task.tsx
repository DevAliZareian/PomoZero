import { useTasks } from "../../contexts/TasksContext";
import type { Task } from "../../utils/types";
import TaskForm from "../tools/TaskForm";

type TaskProps = {
  task: Task;
};

export default function Task({ task }: TaskProps) {
  const { currentTask, setCurrentTask, setTaskForm, taskForm } = useTasks();
  return (
    <>
      {taskForm.editor?.id == task.id ? (
        <TaskForm />
      ) : (
        <div
          key={task.id}
          onClick={() => {
            localStorage.setItem("CurrentTask", String({ id: task.id, title: task.title })), setCurrentTask(task.id);
          }}
          className={`${
            currentTask === task.id ? "border-[rgb(34,34,34)] border-r-[6px]" : ""
          } w-full h-16 bg-white rounded-[8px] flex items-center justify-between p-3 cursor-pointer text-[rgb(85,85,85)] font-bold`}
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(223,223,223)" className="w-[32px]">
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
            {task.title}
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block text-[rgb(170,170,170)] text-[18px] font-bold mr-[18px] w-10">
              <span className="text-[14px] ml-[2px]">{task.pomodoros} /</span>0
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                setTaskForm({
                  show: true,
                  editor: { id: task.id, title: task.title, pomodoros: task.pomodoros },
                });
                console.log(taskForm);
              }}
              className="flex items-center justify-center text-center rounded-[4px] cursor-pointer bg-white border border-[rgb(223,223,223)] shadow-none text-white p-[5px] min-w-[auto]"
            >
              <img src="https://pomofocus.io/icons/vertical-ellipsis.png" alt="setting" className="w-5 opacity-[0.4]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

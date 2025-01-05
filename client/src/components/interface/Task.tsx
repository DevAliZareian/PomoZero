import { useTasks } from "../../contexts/TasksContext";
import type { Task } from "../../utils/types";
import TaskForm from "../tools/TaskForm";

type TaskProps = {
  task: Task;
};

export default function Task({ task }: TaskProps) {
  const { setTaskForm, setTaskActive, toggleTaskCompletion, taskForm } = useTasks();
  return (
    <>
      {taskForm.editor?.id == task.id ? (
        <TaskForm />
      ) : (
        <div
          onClick={() => {
            setTaskActive(task.id);
          }}
          className={`${task.isActive ? "border-[rgb(34,34,34)] border-r-[6px]" : ""} w-full bg-white rounded-[8px] flex flex-col items-center justify-center p-3 cursor-pointer  gap-2`}
        >
          <div key={task.id} className="flex items-center justify-between w-full text-[rgb(85,85,85)] font-bold">
            <div className="flex items-center gap-2">
              <svg
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTaskCompletion(task.id);
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={task.isCompleted ? "rgb(186,73,73)" : "rgb(223,223,223)"}
                className="w-[32px]"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className={task.isCompleted ? "line-through" : ""}>{task.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block text-[rgb(170,170,170)] text-[18px] font-bold mr-[18px] w-10">
                <span className="text-[14px] ml-[2px]">{task.pomodoros} /</span>0
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setTaskForm({
                    show: true,
                    editor: { id: task.id, title: task.title, pomodoros: task.pomodoros, note: task.note },
                  });
                }}
                className="flex items-center justify-center text-center rounded-[4px] cursor-pointer bg-white border border-[rgb(223,223,223)] shadow-none text-white p-[5px] min-w-[auto]"
              >
                <img src="https://pomofocus.io/icons/vertical-ellipsis.png" alt="setting" className="w-5 opacity-[0.4]" />
              </button>
            </div>
          </div>
          {task.note && (
            <div className="pr-[30px] pb-3 select-text cursor-text w-full">
              <div style={{ boxShadow: "rgba(0,0,0,0.1) 0px 1px 0px" }} className="w-full text-right relative rounded-[8px] bg-[rgb(252,248,222)]">
                <p className="text-[15px] whitespace-pre-wrap text-[rgb(96,85,21)] py-[10px] px-[12px] break-words">{task.note}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

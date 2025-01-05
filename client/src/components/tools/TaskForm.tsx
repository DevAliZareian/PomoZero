import { SubmitHandler, useForm } from "react-hook-form";
import { useTasks } from "../../contexts/TasksContext";
import { useState } from "react";

type FormDataType = {
  title: string;
  pomodoros: number;
};

export default function TaskForm() {
  const { addTask, removeTask, editTask, taskForm, setTaskForm, currentTask } = useTasks();
  const { register, handleSubmit } = useForm<FormDataType>();
  const [pomodoros, setPomodoros] = useState<number>(taskForm.editor?.pomodoros || 1);

  const onSubmit: SubmitHandler<FormDataType> = ({ title }) => {
    if (taskForm.editor) return editTask(Number(currentTask), title, pomodoros);
    addTask(title, pomodoros);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[8px] text-right mt-3 shadow w-full p-5 flex flex-col h-full relative">
      <input
        defaultValue={taskForm.editor?.title || ""}
        {...register("title")}
        type="text"
        placeholder="میخوای چیکار کنی؟"
        className="outline-none placeholder:italic rounded-[4px] text-[22px] py-[10px] shadow-none border-none text-[rgb(85,85,85)] w-full font-bold"
      />
      <div className="flex flex-col items-start justify-center mt-3 gap-2 flex-grow mb-16">
        <h2 className="font-bold text-[rgb(85,85,85)]">دفعات</h2>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={pomodoros}
            onChange={(e) => setPomodoros(e.target.valueAsNumber)}
            className="rounded-[6px] bg-[rgb(239,239,239)] text-[16px] p-[10px] shadow-none border-none text-[rgb(85,85,85)] w-20 font-bold outline-none"
          />
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.preventDefault(), setPomodoros((prev) => prev - 1);
              }}
              className="flex items-center justify-center text-center rounded-[4px] cursor-pointer text-[14px] px-[8px] py-[12px] w-10 bg-white text-[rgb(85,85,85)] shadow border border-[rgb(223,223,223)]"
            >
              <img src="https://pomofocus.io/icons/caret-down.png" className="w-[10px] opacity-[0.6]" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault(), setPomodoros((prev) => prev + 1);
              }}
              className="flex items-center justify-center text-center rounded-[4px] cursor-pointer text-[14px] px-[8px] py-[12px] w-10 bg-white text-[rgb(85,85,85)] shadow border border-[rgb(223,223,223)]"
            >
              <img src="https://pomofocus.io/icons/caret-up.png" className="w-[10px] opacity-[0.6]" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="flex items-center justify-center text-center cursor-pointer text-[14px] shadow-none border-none text-[rgba(0,0,0,0.4)] font-bold underline">یادداشت</button>
        </div>
      </div>
      <div
        className={`p-4 text-left rounded-b-[8px] bg-[rgb(239,239,239)] flex items-center ${
          taskForm.editor != null ? "justify-between" : "justify-end"
        } gap-3 mt-auto absolute bottom-0 left-0 right-0`}
      >
        {taskForm.editor ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              removeTask(Number(currentTask));
            }}
            className="flex items-center justify-center text-center rounded-[4px] cursor-pointer opacity-[0.9] text-[14px] py-[8px] px-[12px] text-[rgb(136,136,136)] font-bold"
          >
            حذف
          </button>
        ) : null}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setTaskForm({ show: false });
            }}
            className="flex items-center justify-center text-center rounded-[4px] cursor-pointer opacity-[0.9] text-[14px] py-[8px] px-[12px] text-[rgb(136,136,136)] font-bold"
          >
            لغو
          </button>
          <button
            type="submit"
            className="flex items-center justify-center text-center rounded-[4px] cursor-pointer shadow text-white py-[8px] px-[12px] text-[14px] bg-[rgb(34,34,34)] border-2 border-[rgb(34,34,34)]"
          >
            ذخیره
          </button>
        </div>
      </div>
    </form>
  );
}

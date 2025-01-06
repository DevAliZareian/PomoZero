import { PropsWithChildren, useState } from "react";
import { useTasks } from "../../contexts/TasksContext";

export default function TasksSection({ children }: PropsWithChildren) {
  const [showTasksOption, setShowTasksOption] = useState<boolean>(false);
  const { clearTasks, clearActPomodoros, removeCompletedTasks } = useTasks();
  return (
    <footer className="w-full flex flex-col items-center justify-center text-white mt-5 mb-11">
      <div className="w-full flex items-center justify-between border-b-2 pb-3 border-b-white">
        <p className="text-lg font-bold">وظایف</p>
        <div className="relative">
          <button
            onClick={() => setShowTasksOption(!showTasksOption)}
            className="flex items-center justify-center text-center rounded-[4px] cursor-pointer opacity-[0.9] bg-[rgba(255,255,255,0.2)] shadow-none mr-[10px] text-[13px] border-none text-white p-2 min-w-[auto]"
          >
            <img src="https://pomofocus.io/icons/threedots-white.png" alt="setting" className="w-5" />
          </button>
          {showTasksOption && (
            <div className="absolute left-0 translate-y-[10px] w-max z-10 rounded-[4px] py-1 shadow pointer-events-auto bg-white">
              <div
                onClick={() => {
                  clearTasks(), setShowTasksOption(false);
                }}
                className="flex items-center cursor-pointer text-[14px] py-3 px-4 text-black"
              >
                <img src="https://pomofocus.io/icons/delete-black.png" className="opacity-[0.8] ml-2 w-[0.85rem]" alt="" />
                حذف تمام کارها
              </div>
              <div
                onClick={() => {
                  clearActPomodoros(), setShowTasksOption(false);
                }}
                className="flex items-center cursor-pointer text-[14px] py-3 px-4 text-black"
              >
                <img src="https://pomofocus.io/icons/delete-black.png" className="opacity-[0.8] ml-2 w-[0.85rem]" alt="" />
                ریست کردن پومودوروها
              </div>
              <div
                onClick={() => {
                  removeCompletedTasks(), setShowTasksOption(false);
                }}
                className="flex items-center cursor-pointer text-[14px] py-3 px-4 text-black"
              >
                <img src="https://pomofocus.io/icons/delete-black.png" className="opacity-[0.8] ml-2 w-[0.85rem]" alt="" />
                حذف تمام کارهای انجام شده
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-[18px]"></div>
      {children}
    </footer>
  );
}

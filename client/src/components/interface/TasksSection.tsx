import { PropsWithChildren, useState } from "react";
import { useTasks } from "../../contexts/TasksContext";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function TasksSection({ children }: PropsWithChildren) {
  const isDarkMode = useDarkMode();

  const [showTasksOption, setShowTasksOption] = useState<boolean>(false);
  const { clearTasks, clearActPomodoros, removeCompletedTasks } = useTasks();
  return (
    <>
      {!isDarkMode && (
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
                    <img
                      src="https://pomofocus.io/icons/clear-black.png
"
                      className="opacity-[0.8] ml-2 w-[0.85rem]"
                      alt=""
                    />
                    ریست کردن پومودوروها
                  </div>
                  <div
                    onClick={() => {
                      removeCompletedTasks(), setShowTasksOption(false);
                    }}
                    className="flex items-center cursor-pointer text-[14px] py-3 px-4 text-black"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="opacity-[0.8] ml-2 w-[0.9rem]">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                    حذف تمام کارهای انجام شده
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-[18px]"></div>
          {children}
        </footer>
      )}
    </>
  );
}

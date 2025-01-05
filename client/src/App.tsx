import { useMode } from "./contexts/ModeContext";
import ModeSelector from "./components/tools/ModeSelector";
import Timer from "./components/tools/Timer";
import Start from "./components/tools/Start";
import Header from "./components/interface/Header";
import Tasks from "./components/tools/Tasks";
import TaskForm from "./components/tools/TaskForm";
import { useTasks } from "./contexts/TasksContext";

function App() {
  const { color } = useMode();
  const { taskForm, setTaskForm, currentTask } = useTasks();

  return (
    <div style={{ backgroundColor: color }} className="relative w-full min-h-screen flex flex-col items-center justify-start p-3 transition-colors duration-300 ease-in-out">
      <Header />
      <div className="relative w-full max-w-screen-md mt-10">
        <div className="text-center">
          <main className="w-full bg-[rgba(255,255,255,0.1)] flex flex-col items-center justify-center p-4 rounded-[6px] mb-5">
            <ModeSelector />
            <Timer />
            <Start />
          </main>
          <div className="cursor-pointer select-none inline-block text-base opacity-[0.6] mb-1 text-white">#1</div>
          <div className="text-lg font-extralight text-white">{currentTask ? currentTask : "وقت کاره!"}</div>
          <footer className="w-full flex flex-col items-center justify-center text-white mt-5 mb-11">
            <div className="w-full flex items-center justify-between border-b-2 pb-3 border-b-white">
              <p className="text-lg font-bold">وظایف</p>
              <button className="flex items-center justify-center text-center rounded-[4px] cursor-pointer opacity-[0.9] bg-[rgba(255,255,255,0.2)] shadow-none mr-[10px] text-[13px] border-none text-white p-2 min-w-[auto]">
                <img src="https://pomofocus.io/icons/threedots-white.png" alt="setting" className="w-5" />
              </button>
            </div>
            <div className="mt-[18px]"></div>
            <Tasks />
            {taskForm.show && !taskForm.editor ? (
              <TaskForm />
            ) : (
              <div
                onClick={() => setTaskForm({ show: true })}
                className="w-full h-16 bg-[rgba(0,0,0,0.1)] rounded-[8px] flex items-center justify-center cursor-pointer opacity-[0.8] mt-3 border-2 border-dashed border-[rgba(255,255,255,0.4)]"
              >
                ماموریت جدید
              </div>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;

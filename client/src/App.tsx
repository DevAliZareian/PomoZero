import { formatTime } from "./utils/helpers";
import { useTimer } from "./hooks/useTimer";
import { useMode } from "./contexts/ModeContext";

function App() {
  const { isActive, progress, setIsActive, time } = useTimer("00:00:05");
  const { color, setMode } = useMode();
  return (
    <form style={{ backgroundColor: color }} className="relative w-full min-h-screen flex flex-col items-center justify-start p-3">
      <header className="relative w-full text-white border-b border-b-zinc-500 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7">
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-bold text-2xl">پوموزیرو</p>
          </div>
        </div>
        <div className={`absolute bottom-0 border-b border-b-white`} style={{ width: `${progress}%` }}></div>
      </header>
      <br />
      <br />
      <div className="relative w-full max-w-screen-md">
        <div className="text-center">
          <main className="w-full bg-[rgba(255,255,255,0.1)] flex flex-col items-center justify-center p-4 rounded-[6px] mb-5">
            <div className="inline-flex items-center justify-center gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault(), setMode("work");
                }}
                className="font-bold text-white cursor-pointer bg-[rgba(0,0,0,0.15)] border-none m-0 rounded-[4px] text-lg px-3 py-1 text-center"
              >
                پومودورو
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault(), setMode("shortRest");
                }}
                className="font-light text-white cursor-pointer bg-none border-none m-0 rounded-[4px] text-lg px-3 py-1 text-center"
              >
                چرت زدن
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault(), setMode("longRest");
                }}
                className="font-light text-white cursor-pointer bg-none border-none m-0 rounded-[4px] text-lg px-3 py-1 text-center"
              >
                خوابیدن
              </button>
            </div>
            <h1 className="font-bold text-[100px] mt-[18px] text-white tabular-nums text-center">{formatTime(time)}</h1>

            <button disabled={isActive} onClick={() => setIsActive(true)} style={{ color }} className="cursor-pointer border-none p-4 rounded-[4px] shadow text-2xl font-bold w-1/2 bg-white">
              شروع
            </button>
          </main>
          <div className="cursor-pointer select-none inline-block text-base opacity-[0.6] mb-1 text-white">#1</div>
          <div className="text-lg font-thin text-white">وقت کاره!</div>
          <div className="w-full flex flex-col items-center justify-center"></div>
          <footer className="w-full flex flex-col items-center justify-center text-white mt-5 mb-11">
            <div className="w-full flex items-center justify-between border-b-2 pb-3 border-b-white">
              <p className="text-lg font-bold">وظایف</p>
              <p>...</p>
            </div>
            <div className="mt-5"></div>
            <div className="w-full h-16 bg-[rgba(0,0,0,0.1)] rounded-[8px] flex items-center justify-center cursor-pointer opacity-[0.8] mt-3 border-2 border-dashed border-[rgba(255,255,255,0.4)]">
              ماموریت جدید
            </div>
          </footer>
        </div>
      </div>
    </form>
  );
}

export default App;

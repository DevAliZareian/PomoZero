import ProgressBar from "../tools/ProgressBar";

export default function Header({ setShowSetting }: { setShowSetting: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <header className="relative w-full text-white border-b border-b-[rgba(0,0,0,0.1)] pb-2 max-w-screen-md">
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
        <div className="flex items-center">
          <button
            onClick={() => setShowSetting(true)}
            className="flex items-center justify-center text-center rounded-[4px] cursor-pointer opacity-[0.9] bg-[rgba(255,255,255,0.2)] shadow-none mr-[10px] text-[13px] border-none text-white p-2 min-w-[auto]"
          >
            <img src="https://pomofocus.io/icons/config-white.png" alt="setting" className="w-5" />
          </button>
        </div>
      </div>
      <ProgressBar />
    </header>
  );
}

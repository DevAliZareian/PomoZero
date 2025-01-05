import { PropsWithChildren } from "react";

export default function TasksSection({ children }: PropsWithChildren) {
  return (
    <footer className="w-full flex flex-col items-center justify-center text-white mt-5 mb-11">
      <div className="w-full flex items-center justify-between border-b-2 pb-3 border-b-white">
        <p className="text-lg font-bold">وظایف</p>
        <button className="flex items-center justify-center text-center rounded-[4px] cursor-pointer opacity-[0.9] bg-[rgba(255,255,255,0.2)] shadow-none mr-[10px] text-[13px] border-none text-white p-2 min-w-[auto]">
          <img src="https://pomofocus.io/icons/threedots-white.png" alt="setting" className="w-5" />
        </button>
      </div>
      <div className="mt-[18px]"></div>
      {children}
    </footer>
  );
}

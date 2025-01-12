import { PropsWithChildren } from "react";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Box({ children }: PropsWithChildren) {
  const isDarkMode = useDarkMode();
  return <div className={`w-full ${isDarkMode ? "" : "bg-[rgba(255,255,255,0.1)]"} flex flex-col items-center justify-center pt-[20px] pb-[30px] rounded-[6px] mb-5`}>{children}</div>;
}

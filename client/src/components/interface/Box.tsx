import { PropsWithChildren } from "react";

export default function Box({ children }: PropsWithChildren) {
  return <div className="w-full bg-[rgba(255,255,255,0.1)] flex flex-col items-center justify-center p-4 rounded-[6px] mb-5">{children}</div>;
}

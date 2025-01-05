import { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
  return (
    <div className="relative w-full max-w-screen-md mt-10">
      <div className="text-center">{children}</div>
    </div>
  );
}

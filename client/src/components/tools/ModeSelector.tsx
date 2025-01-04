import { useMode } from "../../contexts/ModeContext";
import { Mode } from "../../utils/types";

export default function ModeSelector() {
  const switches: { state: Mode; text: string }[] = [
    { state: "work", text: "پومودورو" },
    { state: "shortRest", text: "استراحت کوتاه" },
    { state: "longRest", text: "مرخصی" },
  ];

  return (
    <div className="inline-flex items-center justify-center gap-4">
      {switches.map((switchProps) => (
        <Switch key={switchProps.state} {...switchProps} />
      ))}
    </div>
  );
}

type SwitchProps = {
  state: Mode;
  text: string;
};

function Switch({ state, text }: SwitchProps) {
  const { setMode, mode } = useMode();

  const isActive = mode === state;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setMode(state);
      }}
      className={`
        ${isActive ? "font-bold bg-[rgba(0,0,0,0.15)]" : "font-light"}
        text-white cursor-pointer border-none rounded-[4px]
        text-lg px-3 py-1 text-center transition-all duration-300 ease-in-out flex-shrink-0
      `}
    >
      {text}
    </button>
  );
}

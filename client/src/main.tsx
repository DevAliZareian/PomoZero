import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ModeProvider from "./contexts/ModeContext.tsx";
import { TimerProvider } from "./contexts/TimerContext.tsx";
import { TasksProvider } from "./contexts/TasksContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ModeProvider>
    <TasksProvider>
      <TimerProvider>
        <App />
      </TimerProvider>
    </TasksProvider>
  </ModeProvider>
);

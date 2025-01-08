import { DefaultSettingsType } from "./types";

export const DEFAULT_SETTINGS: DefaultSettingsType = {
  work: "00:25:00",
  shortRest: "00:05:00",
  longRest: "00:15:00",
  autoStartBreaks: false,
  autoStartPomodoros: false,
  longBreakInterval: 4,
  autoCheckTasks: false,
  autoSwitchTasks: false,
  colorThemes: { work: "#FF5733", shortRest: "#33FF57", longRest: "#3357FF" },
  hourFormat: "24hrs",
  darkModeWhenRunning: false,
};

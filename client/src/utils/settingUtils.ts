import { DefaultSettingsType } from "./types";

export const transformSettingsToFormValues = (settings: DefaultSettingsType) => ({
  work: String(parseInt(settings.work.split(":")[1], 10)),
  shortRest: String(parseInt(settings.shortRest.split(":")[1], 10)),
  longRest: String(parseInt(settings.longRest.split(":")[1], 10)),
  autoStartBreaks: settings.autoStartBreaks,
  autoStartPomodoros: settings.autoStartPomodoros,
  longBreakInterval: settings.longBreakInterval,
  autoCheckTasks: settings.autoCheckTasks,
  autoSwitchTasks: settings.autoSwitchTasks,
  darkModeWhenRunning: settings.darkModeWhenRunning,
});

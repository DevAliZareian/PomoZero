export type Mode = "work" | "shortRest" | "longRest";

export type DefaultSettingsType = {
  work: string;
  shortRest: string;
  longRest: string;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  longBreakInterval: number;
  autoCheckTasks: boolean;
  autoSwitchTasks: boolean;
  workColor: string;
  shortRestColor: string;
  longRestColor: string;
  hourFormat: "12hrs" | "24hrs";
  darkModeWhenRunning: boolean;
};

export type Task = {
  id: number;
  title: string;
  note?: string;
  pomodoros: number;
  actPomodoros?: number;
  isActive?: boolean;
  isCompleted?: boolean;
};

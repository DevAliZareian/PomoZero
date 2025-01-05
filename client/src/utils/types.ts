export type Mode = "work" | "shortRest" | "longRest";
export type Task = {
  id: number;
  title: string;
  note?: string;
  pomodoros: number;
  isActive?: boolean;
  isCompleted?: boolean;
};

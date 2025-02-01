import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { Task } from "../utils/types";
import { useSetting } from "./SettingContext";

type TaskFormType = {
  show: boolean;
  editor?: {
    id: number;
    title: string;
    pomodoros: number;
    note?: string;
    actPomodoros?: number;
  } | null;
};

type ContextValue = {
  tasks: Task[];
  addTask: (title: string, pomodoros: number, note?: string) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string, pomodoros: number, note?: string, actPomodoros?: number) => void;
  setTaskActive: (id: number) => void;
  getActiveTask: () => Task | undefined;
  toggleTaskCompletion: (id: number) => void;
  updateActPomodoros: (id: number) => void;
  taskForm: TaskFormType;
  setTaskForm: React.Dispatch<React.SetStateAction<TaskFormType>>;
  clearTasks: () => void;
  removeCompletedTasks: () => void;
  clearActPomodoros: () => void;
  getPomodorosSum: (type: "pomodoros" | "actPomodoros") => number;
};

const TasksContext = createContext<ContextValue | undefined>(undefined);

export function TasksProvider({ children }: PropsWithChildren) {
  const { settings } = useSetting();

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskForm, setTaskForm] = useState<TaskFormType>({ show: false, editor: null });

  const persistTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const reorderTasks = (updatedTasks: Task[]): Task[] => {
    if (!settings.autoSwitchTasks) return updatedTasks;

    const completed = updatedTasks.filter((task) => task.isCompleted);
    const incomplete = updatedTasks.filter((task) => !task.isCompleted);

    return [...incomplete, ...completed];
  };

  const addTask = (title: string, pomodoros: number, note?: string) => {
    if (!title) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      pomodoros,
      note,
      isActive: false,
    };
    persistTasks([...tasks, newTask]);
    setTaskForm({ show: false });
  };

  const removeTask = (id: number) => {
    persistTasks(tasks.filter((task) => task.id !== id));
    setTaskForm({ show: false });
  };

  const editTask = (id: number, title: string, pomodoros: number, note?: string, actPomodoros?: number) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, title, pomodoros, note, actPomodoros } : task));
    persistTasks(updatedTasks);
    setTaskForm({ show: false });
  };

  const setTaskActive = (id: number) => {
    persistTasks(tasks.map((task) => ({ ...task, isActive: task.id === id })));
  };

  const getActiveTask = () => tasks.find((task) => task.isActive);

  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
    persistTasks(reorderTasks(updatedTasks));
  };

  const updateActPomodoros = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== id) return task;

      const newActPomodoros = (task.actPomodoros || 0) + 1;
      const isCompleted = settings.autoCheckTasks && newActPomodoros >= task.pomodoros ? true : task.isCompleted;

      return { ...task, actPomodoros: newActPomodoros, isCompleted };
    });
    persistTasks(reorderTasks(updatedTasks));
  };

  const clearTasks = () => {
    localStorage.removeItem("tasks");
    setTasks([]);
  };

  const removeCompletedTasks = () => {
    persistTasks(tasks.filter((task) => !task.isCompleted));
  };

  const clearActPomodoros = () => {
    persistTasks(tasks.map((task) => ({ ...task, actPomodoros: 0 })));
  };

  const getPomodorosSum = (type: "pomodoros" | "actPomodoros"): number => tasks.reduce((sum, task) => sum + (task[type] || 0), 0);

  const value: ContextValue = {
    tasks,
    addTask,
    removeTask,
    editTask,
    setTaskActive,
    getActiveTask,
    toggleTaskCompletion,
    updateActPomodoros,
    taskForm,
    setTaskForm,
    clearTasks,
    removeCompletedTasks,
    clearActPomodoros,
    getPomodorosSum,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}

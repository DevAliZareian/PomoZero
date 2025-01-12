import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { Task } from "../utils/types";
import { useSetting } from "./SettingContext";

type TaskFormType = {
  show: boolean;
  editor?: { id: number; title: string; pomodoros: number; note?: string; actPomodoros?: number } | null;
};

type ContextValue = {
  tasks: Task[];
  addTask: (title: string, pomodoros: number, note?: string) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string, pomodoros: number, note?: string, actPomodoros?: number) => void;
  setTaskActive: (id: number) => void;
  getActiveTask: () => Task | undefined;
  toggleTaskCompletion: (id: number) => void;
  updateActPomodoros: (id: number, actPomodoros?: number) => void;
  taskForm: TaskFormType;
  setTaskForm: React.Dispatch<React.SetStateAction<TaskFormType>>;
  clearTasks: () => void;
  removeCompletedTasks: () => void;
  clearActPomodoros: () => void;
  getPomodorosSum: (type: "pomodoros" | "actPomodoros") => number;
};

const TasksContext = createContext<ContextValue | undefined>(undefined);

export function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskForm, setTaskForm] = useState<TaskFormType>({ show: false, editor: null });
  const { settings } = useSetting();

  function addTask(title: string, pomodoros: number, note?: string) {
    if (!title) return;

    const newTask: Task = { id: Date.now(), title, note, pomodoros, isActive: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskForm({ show: false });
  }

  function removeTask(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskForm({ show: false });
  }

  function editTask(id: number, title: string, pomodoros: number, note?: string, actPomodoros?: number) {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, title, pomodoros, note, actPomodoros } : task));
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskForm({ show: false });
  }

  function setTaskActive(id: number) {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, isActive: true } : { ...task, isActive: false }));
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function getActiveTask() {
    return tasks.find((task) => task.isActive);
  }

  function reorderTasks(tasks: Task[], autoSwitchTasks: boolean): Task[] {
    if (!autoSwitchTasks) return tasks;

    const completedTasks = tasks.filter((task) => task.isCompleted);
    const incompleteTasks = tasks.filter((task) => !task.isCompleted);
    return [...incompleteTasks, ...completedTasks];
  }

  function toggleTaskCompletion(id: number) {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));

    const reorderedTasks = reorderTasks(updatedTasks, settings.autoSwitchTasks);

    setTasks(reorderedTasks);
    localStorage.setItem("tasks", JSON.stringify(reorderedTasks));
  }

  function updateActPomodoros(id: number) {
    if (!id) return;

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const newActPomodoros = (Number(task.actPomodoros) || 0) + 1;

        const isCompleted = settings.autoCheckTasks && newActPomodoros >= task.pomodoros ? true : task.isCompleted;

        return {
          ...task,
          actPomodoros: newActPomodoros,
          isCompleted,
        };
      }
      return task;
    });

    const reorderedTasks = reorderTasks(updatedTasks, settings.autoSwitchTasks);

    setTasks(reorderedTasks);
    localStorage.setItem("tasks", JSON.stringify(reorderedTasks));
  }

  function clearTasks() {
    localStorage.removeItem("tasks");
    setTasks([]);
  }

  function removeCompletedTasks() {
    const updatedTasks = tasks.filter((task) => !task.isCompleted);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function clearActPomodoros() {
    const updatedTasks = tasks.map((task) => ({ ...task, actPomodoros: 0 }));
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function getPomodorosSum(type: "pomodoros" | "actPomodoros"): number {
    return tasks.reduce((sum, task) => {
      return sum + (Number(task[type]) || 0);
    }, 0);
  }

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

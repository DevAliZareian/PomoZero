import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { Task } from "../utils/types";

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
};

const TasksContext = createContext<ContextValue | undefined>(undefined);

export function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskForm, setTaskForm] = useState<TaskFormType>({ show: false, editor: null });

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

  function toggleTaskCompletion(id: number) {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function updateActPomodoros(id: number) {
    if (!id) return;
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            actPomodoros: (Number(task.actPomodoros) || 0) + 1,
          }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    console.log(tasks);
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

  const value: ContextValue = { tasks, addTask, removeTask, editTask, setTaskActive, getActiveTask, toggleTaskCompletion, updateActPomodoros, taskForm, setTaskForm, clearTasks, removeCompletedTasks };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}

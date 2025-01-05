import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { Task } from "../utils/types";

type TaskFormType = {
  show: boolean;
  editor?: { id: number; title: string; pomodoros: number; note?: string } | null;
};

type ContextValue = {
  tasks: Task[];
  addTask: (title: string, pomodoros: number, note?: string) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string, pomodoros: number, note?: string) => void;
  currentTask: number | null;
  setCurrentTask: React.Dispatch<React.SetStateAction<number | null>>;
  taskForm: TaskFormType;
  setTaskForm: React.Dispatch<React.SetStateAction<TaskFormType>>;
};

const TasksContext = createContext<ContextValue | undefined>(undefined);

export function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [currentTask, setCurrentTask] = useState<number | null>(Number(localStorage.getItem("CurrentTask")));
  const [taskForm, setTaskForm] = useState<TaskFormType>({ show: false, editor: null });

  function addTask(title: string, pomodoros: number, note?: string) {
    if (!title) return;

    const newTask: Task = { id: Date.now(), title, note, pomodoros };
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

  function editTask(id: number, title: string, pomodoros: number, note?: string) {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, title, pomodoros, note } : task));

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskForm({ show: false });
  }

  const value: ContextValue = { tasks, addTask, removeTask, editTask, currentTask, setCurrentTask, taskForm, setTaskForm };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}

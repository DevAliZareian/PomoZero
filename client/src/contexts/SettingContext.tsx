import { createContext, PropsWithChildren, useContext, useState } from "react";
import { DefaultSettingsType } from "../utils/types";

type SettingContextType = {
  settings: DefaultSettingsType;
  updateSettings: (settings: Partial<DefaultSettingsType>) => void;
  setDefaultSettings: () => void;
};

const DEFAULT_SETTINGS: DefaultSettingsType = {
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

const LOCAL_STORAGE_KEY = "DefaultSettings";

const SettingContext = createContext<SettingContextType | undefined>(undefined);

export function SettingProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<DefaultSettingsType>(() => {
    const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
  });

  const updateSettings = (newSettings: Partial<DefaultSettingsType>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSettings));
  };

  function setDefaultSettings() {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
  }

  const value = { settings, updateSettings, setDefaultSettings };

  return <SettingContext.Provider value={value}>{children}</SettingContext.Provider>;
}

export function useSetting() {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSetting must be used within a SettingProvider");
  }
  return context;
}

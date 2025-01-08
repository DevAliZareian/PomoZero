import { createContext, PropsWithChildren, useContext, useState } from "react";
import { DefaultSettingsType } from "../utils/types";
import { DEFAULT_SETTINGS } from "../utils/constants";

type SettingContextType = {
  settings: DefaultSettingsType;
  updateSettings: (settings: Partial<DefaultSettingsType>) => void;
  setDefaultSettings: () => void;
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

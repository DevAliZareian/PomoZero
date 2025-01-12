import { useSetting } from "../contexts/SettingContext";
import { useTimer } from "../contexts/TimerContext";

export function useDarkMode() {
  const { settings } = useSetting();
  const { isActive } = useTimer();
  return settings.darkModeWhenRunning && isActive;
}

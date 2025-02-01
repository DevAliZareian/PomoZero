import { useForm } from "react-hook-form";
import { useSetting } from "../../contexts/SettingContext";
import { transformSettingsToFormValues } from "../../utils/settingUtils";
import { DEFAULT_SETTINGS } from "../../utils/constants";
import { DefaultSettingsType } from "../../utils/types";
import Form from "./interface/Form";
import TimeSettings from "./features/TimeSettings";
import TasksSettings from "./features/TasksSettings";
import ThemeSettings from "./features/ThemeSettings";

export default function SettingForm({ setShowSetting }: { setShowSetting: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { settings, setDefaultSettings } = useSetting();
  const { register, handleSubmit, control, reset, setValue } = useForm<DefaultSettingsType>({
    defaultValues: transformSettingsToFormValues(settings),
  });

  const handleReset = () => {
    setDefaultSettings();
    reset(transformSettingsToFormValues(DEFAULT_SETTINGS));
  };

  return (
    <Form setShowSetting={setShowSetting} handleSubmit={handleSubmit} handleReset={handleReset}>
      <TimeSettings register={register} control={control} />
      <TasksSettings control={control} />
      <ThemeSettings control={control} setValue={setValue} />
    </Form>
  );
}

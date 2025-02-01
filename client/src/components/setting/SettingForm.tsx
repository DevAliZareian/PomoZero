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
    <Form setShowSetting={setShowSetting} handleSubmit={handleSubmit}>
      <div className="px-5">
        <TimeSettings register={register} control={control} />
        <div className="h-[1px] w-full bg-[rgb(233,233,233)]"></div>
        <TasksSettings control={control} />
        <div className="h-[1px] w-full bg-[rgb(233,233,233)]"></div>
        <ThemeSettings control={control} setValue={setValue} />
      </div>
      <div className="flex items-center justify-end gap-2 w-full py-[14px] px-5 text-left rounded-b-lg bg-[rgb(239,239,239)]">
        <button
          onClick={handleReset}
          className="flex items-center justify-center text-center rounded-[4px] cursor-pointer opacity-[0.9] text-[14px] py-[8px] px-[12px] text-[rgb(136,136,136)] font-bold"
        >
          تنظیمات پیش‌فرض
        </button>
        <button
          type="submit"
          className="flex items-center justify-center text-center rounded-[4px] cursor-pointer shadow text-white py-[8px] px-[12px] text-[14px] bg-[rgb(34,34,34)] border-2 border-[rgb(34,34,34)]"
        >
          ذخیره
        </button>
      </div>
    </Form>
  );
}

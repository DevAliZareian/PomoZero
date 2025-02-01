import { Control, Controller } from "react-hook-form";
import ReactSwitch from "react-switch";
import { DefaultSettingsType } from "../../../utils/types";

export default function TasksSettings({ control }: { control: Control<DefaultSettingsType, any> }) {
  return (
    <>
      <div className="text-[14px] text-[rgb(170,170,170)] font-bold mt-7 mb-[10px] flex items-center">
        <img className="w-4 opacity-[0.3] ml-[6px]" src="https://pomofocus.io/icons/check-black.png" alt="" />
        وظایف
      </div>
      <div className="pb-[12px] mb-[12px]">
        <div className="py-3 min-h-8 flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="inline-block">
              <span className="text-[rgb(85,85,85)] font-bold flex items-center">تایید خودکار وظایف</span>
            </div>
            <Controller name="autoCheckTasks" control={control} render={({ field }) => <ReactSwitch checked={field.value || false} onChange={field.onChange} />} />
          </div>
        </div>
        <div className="py-3 min-h-8 flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="inline-block">
              <span className="text-[rgb(85,85,85)] font-bold flex items-center">کنترل خودکار وظایف</span>
            </div>
            <Controller name="autoSwitchTasks" control={control} render={({ field }) => <ReactSwitch checked={field.value || false} onChange={field.onChange} />} />
          </div>
        </div>
      </div>
    </>
  );
}

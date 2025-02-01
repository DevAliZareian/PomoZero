import { Control, Controller, UseFormRegister } from "react-hook-form";
import ReactSwitch from "react-switch";
import { DefaultSettingsType } from "../../../utils/types";

type TimeSettingsProp = {
  register: UseFormRegister<DefaultSettingsType>;
  control: Control<DefaultSettingsType, any>;
};

export default function TimeSettings({ register, control }: TimeSettingsProp) {
  return (
    <>
      <div className="text-[14px] text-[rgb(170,170,170)] font-bold mt-7 mb-[10px] flex items-center">
        <img className="w-4 opacity-[0.3] ml-[6px]" src="https://pomofocus.io/icons/clock-black.png" alt="" />
        ساعت
      </div>
      <div className="pb-[12px] mb-[12px]">
        <div className="py-3 min-h-8 flex flex-col">
          <div className="inline-block">
            <span className="text-[rgb(85,85,85)] font-bold flex items-center">زمان (دقیقه)</span>
          </div>
          <div className="flex justify-between mt-[10px]">
            <div className="pl-2">
              <label className="text-[14px] text-[rgb(170,170,170)] font-bold mb-1">پومودورو</label>
              <input
                {...register("work", { required: true, min: 1 })}
                className="outline-none rounded-[6px] bg-[rgb(239,239,239)] text-base p-[10px] shadow-none border-none text-[rgb(85,85,85)] w-full"
              />
            </div>
            <div className="pl-2">
              <label className="text-[14px] text-[rgb(170,170,170)] font-bold mb-1">استراحت کوتاه</label>
              <input
                {...register("shortRest", { required: true, min: 1 })}
                className="outline-none rounded-[6px] bg-[rgb(239,239,239)] text-base p-[10px] shadow-none border-none text-[rgb(85,85,85)] w-full"
              />
            </div>
            <div>
              <label className="text-[14px] text-[rgb(170,170,170)] font-bold mb-1">مرخصی</label>
              <input
                {...register("longRest", { required: true, min: 1 })}
                className="outline-none rounded-[6px] bg-[rgb(239,239,239)] text-base p-[10px] shadow-none border-none text-[rgb(85,85,85)] w-full"
              />
            </div>
          </div>
        </div>
        <div className="py-3 min-h-8 flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="inline-block">
              <span className="text-[rgb(85,85,85)] font-bold flex items-center">شروع خودکار استراحت‌ها</span>
            </div>
            <Controller name="autoStartBreaks" control={control} render={({ field }) => <ReactSwitch checked={field.value || false} onChange={field.onChange} />} />
          </div>
        </div>
        <div className="py-3 min-h-8 flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="inline-block">
              <span className="text-[rgb(85,85,85)] font-bold flex items-center">شروع خودکار پومودوروها</span>
            </div>
            <Controller name="autoStartPomodoros" control={control} render={({ field }) => <ReactSwitch checked={field.value || false} onChange={field.onChange} />} />
          </div>
        </div>
        <div className="py-3 min-h-8 flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="inline-block">
              <span className="text-[rgb(85,85,85)] font-bold flex items-center">چند پومودورو تا مرخصی</span>
            </div>
            <input
              {...register("longBreakInterval")}
              type="number"
              min={0}
              step={1}
              className="outline-none rounded-[6px] bg-[rgb(239,239,239)] text-base p-[10px] shadow-none border-none text-[rgb(85,85,85)] w-[4.5rem]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

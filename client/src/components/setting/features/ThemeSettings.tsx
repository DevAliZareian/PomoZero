import { Control, Controller, UseFormSetValue } from "react-hook-form";
import ReactSwitch from "react-switch";
import { openPopupWindow } from "../../../utils/helpers";
import { useSetting } from "../../../contexts/SettingContext";
import { useState } from "react";
import { SketchPicker } from "react-color";
import { DefaultSettingsType } from "../../../utils/types";

type TimeSettingsProp = {
  setValue: UseFormSetValue<DefaultSettingsType>;
  control: Control<DefaultSettingsType, any>;
};

export default function ThemeSettings({ setValue, control }: TimeSettingsProp) {
  const { settings } = useSetting();
  const [selectedField, setSelectedField] = useState<"workColor" | "shortRestColor" | "longRestColor" | null>();
  const [selectedFieldColor, setSelectedFieldColor] = useState({ workColor: settings.workColor, shortRestColor: settings.shortRestColor, longRestColor: settings.longRestColor });
  const [select, setSelect] = useState<"24hrs" | "12hrs">(settings.hourFormat);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  return (
    <>
      <div className="text-[14px] text-[rgb(170,170,170)] font-bold mt-7 mb-[10px] flex items-center">
        <img className="w-4 opacity-[0.3] ml-[6px]" src="	https://pomofocus.io/icons/theme-black.png" alt="" />
        قالب
      </div>
      <div className="pb-[12px] mb-[12px]">
        <div className="py-3 min-h-8 flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="inline-block">
              <span className="text-[rgb(85,85,85)] font-bold flex items-center">پالت رنگی</span>
            </div>
            <div className="relative flex items-center gap-[0.7rem]">
              {!selectedField ? (
                <div className="flex gap-4">
                  {(["workColor", "shortRestColor", "longRestColor"] as const).map((field) => (
                    <div
                      key={field}
                      style={{ backgroundColor: selectedFieldColor[field] }}
                      className="cursor-pointer select-none w-7 h-7 rounded-[0.4rem]"
                      onClick={() => setSelectedField(field)}
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <SketchPicker
                    color={selectedFieldColor[selectedField]}
                    onChange={(color) => {
                      setValue(selectedField, color.hex);
                      setSelectedFieldColor((prev) => ({
                        ...prev,
                        [selectedField]: color.hex,
                      }));
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedField(null)}
                    className="flex items-center justify-center text-center rounded-[4px] cursor-pointer text-[14px] py-[8px] px-[12px] text-[rgb(136,136,136)] font-bold hover:opacity-100 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    ذخیره
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="py-3 min-h-8 flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="inline-block">
              <span className="text-[rgb(85,85,85)] font-bold flex items-center">فرمت ساعت</span>
            </div>
            <div className="flex items-center justify-end">
              <div className="w-32 relative text-[14px]">
                <div
                  onClick={() => setShowSelect(!showSelect)}
                  className="cursor-pointer relative w-full text-[rgb(120,120,120)] font-[500] select-none rounded-[4px] bg-[rgb(235,235,235)] p-3 text-[14px]"
                >
                  <img className="absolute top-[14px] left-3 opacity-[0.5] w-3" src="https://pomofocus.io/icons/down-arrow-black.png" alt="" />
                  {select == "24hrs" ? "24 ساعت" : "12 ساعت"}
                </div>
                {showSelect && (
                  <div className="absolute bg-white w-full rounded-[4px] z-10 shadow mt-1">
                    <div className="py-2">
                      <div
                        onClick={() => {
                          setSelect("24hrs");
                          setShowSelect(false);
                          setValue("hourFormat", "24hrs");
                        }}
                        className="p-3 text-[rgb(120,120,120)] font-[500] cursor-pointer flex items-center"
                      >
                        24 ساعت
                      </div>
                      <div
                        onClick={() => {
                          setSelect("12hrs");
                          setShowSelect(false);
                          setValue("hourFormat", "12hrs");
                        }}
                        className="p-3 text-[rgb(120,120,120)] font-[500] cursor-pointer flex items-center"
                      >
                        12 ساعت
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="py-3 min-h-8 flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="inline-block">
              <span className="text-[rgb(85,85,85)] font-bold flex items-center">فعال شدن حالت تیره هنگام اجرا</span>
            </div>
            <Controller name="darkModeWhenRunning" control={control} render={({ field }) => <ReactSwitch checked={field.value || false} onChange={field.onChange} />} />
          </div>
        </div>
        <div className="py-3 min-h-8 flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="inline-block">
              <span className="text-[rgb(85,85,85)] font-bold flex items-center">پنجره کوچک</span>
            </div>
            <button
              onClick={() => openPopupWindow("/", "Popup Title", 400, 600)}
              className="flex items-center justify-center text-center rounded-[4px] cursor-pointer opacity-[0.9] text-[14px] py-2 px-3 min-w-[70px] bg-white text-[85,85,85] border border-[rgb(224,224,224)] font-normal shadow-sm"
            >
              <img src="https://pomofocus.io/icons/external-link.svg" alt="" className="w-3 ml-1 opacity-[0.7]" />
              باز کردن
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

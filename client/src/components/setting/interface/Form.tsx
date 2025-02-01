import { PropsWithChildren } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { DefaultSettingsType } from "../../../utils/types";
import { useSetting } from "../../../contexts/SettingContext";

type FormProps = {
  handleSubmit: UseFormHandleSubmit<DefaultSettingsType, undefined>;
  setShowSetting: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Form({ children, handleSubmit, setShowSetting }: PropsWithChildren<FormProps>) {
  const { updateSettings } = useSetting();

  const formatTime = (time: string) => `00:${String(time).padStart(2, "0")}:00`;
  const onSubmit = (formData: DefaultSettingsType) => {
    const updatedSettings = {
      ...formData,
      work: formatTime(formData.work),
      shortRest: formatTime(formData.shortRest),
      longRest: formatTime(formData.longRest),
    };

    updateSettings(updatedSettings);
    setShowSetting(false);
  };
  return (
    <div onClick={() => setShowSetting(false)} className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm pt-12 pb-14 overflow-y-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className="text-[rgb(34,34,34)] rounded-[8px] bg-white relative max-w-sm w-[95%] z-50 translate-y-[20px] shadow overflow-hidden m-auto"
      >
        <img
          onClick={() => setShowSetting(false)}
          className="absolute top-[17px] right-[18px] cursor-pointer w-[14px] opacity-[0.3] z-50"
          src="https://pomofocus.io/icons/remove-black-sm.png"
          alt=""
        />
        <div className="relative max-w-3xl m-auto">
          <h2 className="text-[15px] text-[rgb(170,170,170)] font-bold py-[16px] px-[23px] border-b border-b-[rgb(238,238,238)] text-center">تنظیمات</h2>
          {children}
        </div>
      </form>
    </div>
  );
}

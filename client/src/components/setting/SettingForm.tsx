import ReactSwitch from "react-switch";
import { useState } from "react";

export default function SettingForm({ setShowSetting }: { setShowSetting: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [checked, setChecked] = useState<boolean>(false);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm pt-12 pb-14 overflow-y-auto">
      <div className="text-[rgb(34,34,34)] rounded-[8px] bg-white relative max-w-sm w-[95%] z-50 translate-y-[20px] shadow overflow-hidden m-auto">
        <img
          onClick={() => setShowSetting(false)}
          className="absolute top-[17px] right-[18px] cursor-pointer w-[14px] opacity-[0.3] z-50"
          src="https://pomofocus.io/icons/remove-black-sm.png"
          alt=""
        />
        <div className="relative max-w-3xl m-auto">
          <h2 className="text-[15px] text-[rgb(170,170,170)] font-bold py-[16px] px-[23px] border-b border-b-[rgb(238,238,238)] text-center">تنظیمات</h2>
          <div className="px-5">
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
                    <input type="number" min={0} step={1} className="outline-none rounded-[6px] bg-[rgb(239,239,239)] text-base p-[10px] shadow-none border-none text-[rgb(85,85,85)] w-full" />
                  </div>
                  <div className="pl-2">
                    <label className="text-[14px] text-[rgb(170,170,170)] font-bold mb-1">استراحت کوتاه</label>
                    <input type="number" min={0} step={1} className="outline-none rounded-[6px] bg-[rgb(239,239,239)] text-base p-[10px] shadow-none border-none text-[rgb(85,85,85)] w-full" />
                  </div>
                  <div>
                    <label className="text-[14px] text-[rgb(170,170,170)] font-bold mb-1">مرخصی</label>
                    <input type="number" min={0} step={1} className="outline-none rounded-[6px] bg-[rgb(239,239,239)] text-base p-[10px] shadow-none border-none text-[rgb(85,85,85)] w-full" />
                  </div>
                </div>
              </div>
              <div className="py-3 min-h-8 flex flex-col">
                <div className="w-full flex items-center justify-between">
                  <div className="inline-block">
                    <span className="text-[rgb(85,85,85)] font-bold flex items-center">شروع خودکار استراحت‌ها</span>
                  </div>
                  <ReactSwitch checked={checked} onChange={(e) => setChecked(e.valueOf())} />
                </div>
              </div>
              <div className="py-3 min-h-8 flex flex-col">
                <div className="w-full flex items-center justify-between">
                  <div className="inline-block">
                    <span className="text-[rgb(85,85,85)] font-bold flex items-center">شروع خودکار پومودوروها</span>
                  </div>
                  <ReactSwitch checked={checked} onChange={(e) => setChecked(e.valueOf())} />
                </div>
              </div>
              <div className="py-3 min-h-8 flex flex-col">
                <div className="w-full flex items-center justify-between">
                  <div className="inline-block">
                    <span className="text-[rgb(85,85,85)] font-bold flex items-center">چند پومودورو تا مرخصی</span>
                  </div>
                  <input type="number" min={0} step={1} className="outline-none rounded-[6px] bg-[rgb(239,239,239)] text-base p-[10px] shadow-none border-none text-[rgb(85,85,85)] w-[4.5rem]" />
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full bg-[rgb(233,233,233)]"></div>
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
                  <ReactSwitch checked={checked} onChange={(e) => setChecked(e.valueOf())} />
                </div>
              </div>
              <div className="py-3 min-h-8 flex flex-col">
                <div className="w-full flex items-center justify-between">
                  <div className="inline-block">
                    <span className="text-[rgb(85,85,85)] font-bold flex items-center">کنترل خودکار وظایف</span>
                  </div>
                  <ReactSwitch checked={checked} onChange={(e) => setChecked(e.valueOf())} />
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full bg-[rgb(233,233,233)]"></div>
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
                  <div className="flex items-center gap-[0.7rem]">
                    <div className="cursor-pointer select-none bg-[rgb(186,73,73)] w-7 h-7 rounded-[0.4rem]"></div>
                    <div className="cursor-pointer select-none bg-[rgb(56,133,138)] w-7 h-7 rounded-[0.4rem]"></div>
                    <div className="cursor-pointer select-none bg-[rgb(57,112,151)] w-7 h-7 rounded-[0.4rem]"></div>
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
                        24 ساعت
                      </div>
                      {showSelect && (
                        <div className="absolute bg-white w-full rounded-[4px] z-10 shadow mt-1">
                          <div className="py-2">
                            <div className="p-3 text-[rgb(120,120,120)] font-[500] cursor-pointer flex items-center">24 ساعت</div>
                            <div className="p-3 text-[rgb(120,120,120)] font-[500] cursor-pointer flex items-center">12 ساعت</div>
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
                  <ReactSwitch checked={checked} onChange={(e) => setChecked(e.valueOf())} />
                </div>
              </div>
              <div className="py-3 min-h-8 flex flex-col">
                <div className="w-full flex items-center justify-between">
                  <div className="inline-block">
                    <span className="text-[rgb(85,85,85)] font-bold flex items-center">پنجره کوچک</span>
                  </div>
                  <button className="flex items-center justify-center text-center rounded-[4px] cursor-pointer opacity-[0.9] text-[14px] py-2 px-3 min-w-[70px] bg-white text-[85,85,85] border border-[rgb(224,224,224)] font-normal shadow-sm">
                    <img src="https://pomofocus.io/icons/external-link.svg" alt="" className="w-3 ml-1 opacity-[0.7]" />
                    باز کردن
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

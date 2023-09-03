import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLocked } from "../store/reducers/global";
import TimeObj from "./TimeObj";
import DateObj from "./DateObj";
import BatteryIcon from "./BatteryIcon";
import BatteryLevel from "./BatteryLevel";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import Hammer from "react-hammerjs";

export default function LockScreen() {
  const dispatch = useAppDispatch();
  const isLocked = useAppSelector((state) => state.global.isLocked);
  const wallpaper = useAppSelector((state) => state.global.wallpaper);

  return (
    <div
      className={twMerge(
        "absolute bottom-full left-0 z-30 h-screen w-full bg-cover bg-center bg-no-repeat opacity-0 transition-all duration-[250ms]",
        isLocked && "bottom-0 opacity-100 duration-500",
      )}
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="flex h-screen w-full flex-col justify-between bg-black/70 text-gray-100 backdrop-blur">
        <div className="flex flex-col items-center px-5 py-20">
          <TimeObj className="mb-1 text-[70px] font-bold" />
          <div className="flex items-center text-xs">
            <DateObj />
            <div className="mx-5 h-4 w-[0.5px] bg-gray-100"></div>
            <div className="flex items-center">
              <BatteryIcon className="mr-2" />
              <BatteryLevel />
            </div>
          </div>
        </div>
        <Hammer
          onSwipeUp={() => dispatch(setLocked(false))}
          direction="DIRECTION_UP"
        >
          <div className="flex flex-col items-center px-5 py-14">
            <HiOutlineChevronDoubleUp className="mb-4 text-base" />
            <p className="text-sm">Swipe up to unlock</p>
          </div>
        </Hammer>
      </div>
    </div>
  );
}

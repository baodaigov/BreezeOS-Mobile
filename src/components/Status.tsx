import { useAppSelector } from "@/store/hooks";
import BatteryLevel from "./BatteryLevel";
import { FaBolt } from "react-icons/fa6";
import { FiWifi } from "react-icons/fi";
import { LuSignal } from "react-icons/lu";
import { PiLeafFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

interface StatusProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function Status({ onClick }: StatusProps) {
  const settings = useAppSelector((state) => state.settings);
  const battery = useAppSelector((state) => state.settings.battery);

  return (
    <div className="flex items-center" onClick={onClick}>
      <LuSignal className="mr-2 text-sm" />
      {settings.wifi && <FiWifi className="mr-2 text-sm" />}
      <div
        className={twMerge(
          "flex items-center justify-center rounded-full bg-blue-500 px-3 py-1 font-bold text-gray-800",
          battery.level <= 10 && "bg-red-500",
        )}
      >
        {battery.charging && <FaBolt className="mr-1" />}
        {battery.batterySaver && <PiLeafFill className="mr-1" />}
        <BatteryLevel />
      </div>
    </div>
  );
}

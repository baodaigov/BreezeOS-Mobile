import { useAppSelector } from "@/store/hooks";
import { BsBatteryFull, BsBatteryCharging } from "react-icons/bs";

interface BatteryIconProps {
  className?: string;
}

export default function BatteryIcon({ className }: BatteryIconProps) {
  const batteryCharging = useAppSelector(
    (state) => state.settings.battery.charging,
  );

  return batteryCharging ? (
    <BsBatteryCharging className={className} />
  ) : (
    <BsBatteryFull className={className} />
  );
}

import { useEffect } from "react";
import { useBattery } from "react-use";
import {
  setBatteryCharging,
  setBatteryLevel,
} from "../store/reducers/settings";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface BatteryLevelProps {
  className?: string;
}

export default function BatteryLevel({ className }: BatteryLevelProps) {
  const dispatch = useAppDispatch();
  const battery = useAppSelector((state) => state.settings.battery);

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

  useEffect(() => {
    if (isNaN(batteryPercent)) {
      dispatch(setBatteryLevel("-"));
    } else {
      dispatch(setBatteryLevel(batteryPercent));
    }

    if (batteryState.charging) {
      dispatch(setBatteryCharging(true));
    } else {
      dispatch(setBatteryCharging(false));
    }
  }, [batteryState]);

  return <p className={className}>{battery.level}%</p>;
}

import { useBattery } from "react-use";

export default function BatteryLevel({ className }){
    const batteryState = useBattery();

    let batteryPercent = Math.round(batteryState.level * 100);

    return <p className={className}>{batteryPercent}%</p>
}
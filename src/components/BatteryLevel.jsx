import { useBattery } from "react-use";

export default function BatteryLevel({ className }){
    const batteryState = useBattery();

    let batteryPercent = Math.round(batteryState.level * 100);

    return <>{isNaN(batteryPercent) ? <p className={className}>-</p> : <p className={className}>{batteryPercent}%</p>}</>
}
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useBattery } from "react-use";
import { displayPlatformMenu } from "../reducers/modal";

export default function BatteryLevel({ className }){
    const dispatch = useDispatch();
    const batteryState = useBattery();

    let batteryPercent = Math.round(batteryState.level * 100);

    useEffect(() => {
        if(isNaN(batteryPercent)) dispatch(displayPlatformMenu(true))
    }, [batteryPercent]);

    return <>{isNaN(batteryPercent) ? <p className={className}>-</p> : <p className={className}>{batteryPercent}%</p>}</>
}
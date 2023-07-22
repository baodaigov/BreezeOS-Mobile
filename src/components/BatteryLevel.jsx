import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useBattery } from "react-use";
import { displayPlatformMenu } from "../reducers/modal";
import { setBatteryCharging, setBatteryLevel } from "../reducers/settings";

export default function BatteryLevel({ className }){
    const dispatch = useDispatch();
    const battery = useSelector(state => state.settings.battery);

    const batteryState = useBattery();

    let batteryPercent = Math.round(batteryState.level * 100);

    useEffect(() => {
        if(isNaN(batteryPercent)){
            dispatch(setBatteryLevel('-'));
            dispatch(displayPlatformMenu(true));
        } else {
            dispatch(setBatteryLevel(batteryPercent));
            dispatch(displayPlatformMenu(false));
        }

        if(batteryState.charging){
            dispatch(setBatteryCharging(true));
        } else {
            dispatch(setBatteryCharging(false));
        }
    }, [batteryPercent, batteryState]);

    return <p className={className}>{battery.level}%</p>
}
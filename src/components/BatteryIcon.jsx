import { useSelector, useDispatch } from 'react-redux';
import { setCharging } from '../reducers/battery';
import { BsBatteryFull, BsBatteryCharging } from 'react-icons/bs';
import { useBattery } from 'react-use';
import { useEffect } from 'react';

export default function BatteryIcon({ className }){
    const dispatch = useDispatch();

    const batteryState = useBattery();

    const batteryChargingStatus = useSelector(state => state.battery.charging);

    useEffect(() => {
        if(batteryState.charging){
            dispatch(setCharging(true));
        } else {
            dispatch(setCharging(false));
        }
    }, [batteryState]);

    return <>{batteryChargingStatus ? <BsBatteryCharging className={className}/> : <BsBatteryFull className={className}/>}</>
}
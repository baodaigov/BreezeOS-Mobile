import { useDispatch } from 'react-redux';
import { BsBatteryFull, BsBatteryCharging } from 'react-icons/bs';
import { useBattery } from 'react-use';
import { useEffect } from 'react';

export default function BatteryIcon({ className }){
    const batteryState = useBattery();

    return <>{batteryState.charging ? <BsBatteryCharging className={className}/> : <BsBatteryFull className={className}/>}</>
}
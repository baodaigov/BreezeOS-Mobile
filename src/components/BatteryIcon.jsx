import { useSelector } from 'react-redux';
import { BsBatteryFull, BsBatteryCharging } from 'react-icons/bs';

export default function BatteryIcon({ className }){
    const batteryCharging = useSelector(state => state.settings.battery.charging);

    return <>{batteryCharging ? <BsBatteryCharging className={className}/> : <BsBatteryFull className={className}/>}</>
}
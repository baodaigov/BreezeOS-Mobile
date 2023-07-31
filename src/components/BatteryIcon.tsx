import { useSelector } from 'react-redux';
import { BsBatteryFull, BsBatteryCharging } from 'react-icons/bs';

interface BatteryIconProps {
    className?: string
}

export default function BatteryIcon({ className }: BatteryIconProps){
    const batteryCharging: any = useSelector<any>(state => state.settings.battery.charging);

    return <>{batteryCharging ? <BsBatteryCharging className={className}/> : <BsBatteryFull className={className}/>}</>
}
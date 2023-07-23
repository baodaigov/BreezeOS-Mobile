import { useSelector } from 'react-redux';
import { useBattery } from 'react-use';
import BatteryLevel from './BatteryLevel';
import { FaBolt } from 'react-icons/fa6';
import { FiWifi } from 'react-icons/fi';
import { LuSignal } from 'react-icons/lu';
import { PiLeafFill } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';

export default function Status({ onClick }){
    const settings = useSelector(state => state.settings);
    const battery = useSelector(state => state.settings.battery);

    return (
        <div className='flex items-center' onClick={onClick}>
            <LuSignal className='text-sm mr-2'/>
            {settings.wifi && <FiWifi className='text-sm mr-2'/>}
            <div className={twMerge('flex justify-center items-center bg-[#3795ff] rounded-full py-1 px-3 text-gray-800 font-bold', battery.level <= 10 && 'bg-[#e46a6a]')}>
                {battery.charging && <FaBolt className='mr-1'/> }
                {battery.batterySaver && <PiLeafFill className='mr-1'/>}
                <BatteryLevel/>
            </div>
        </div>
    )
}
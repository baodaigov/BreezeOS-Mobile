import { useAppSelector } from '../store/hooks';
import BatteryLevel from './BatteryLevel';
import { FaBolt } from 'react-icons/fa6';
import { FiWifi } from 'react-icons/fi';
import { LuSignal } from 'react-icons/lu';
import { PiLeafFill } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';

interface StatusProps {
    onClick: React.MouseEventHandler<HTMLDivElement>
}

export default function Status({ onClick }: StatusProps){
    const settings = useAppSelector(state => state.settings);
    const battery = useAppSelector(state => state.settings.battery);

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
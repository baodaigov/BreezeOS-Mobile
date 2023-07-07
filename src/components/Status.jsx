import { useBattery } from 'react-use';
import BatteryLevel from './BatteryLevel';
import BatteryIcon from './BatteryIcon';
import { FaBolt } from 'react-icons/fa6';
import { FiWifi } from 'react-icons/fi';
import { LuSignal } from 'react-icons/lu';

export default function Status({ onClick }){
    const batteryState = useBattery();

    return (
        <div className='flex items-center' onClick={onClick}>
            <LuSignal className='text-sm mr-2'/>
            <FiWifi className='text-sm mr-2'/>
            <div className='flex justify-center items-center bg-[#3795ff] rounded-full py-1 px-3 text-gray-800 font-bold'>
                {batteryState.charging ? <FaBolt className='mr-1'/> : ''}
                <BatteryLevel/>
            </div>
        </div>
    )
}
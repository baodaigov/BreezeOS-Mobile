import BatteryIcon from './BatteryIcon';
import BatteryLevel from './BatteryLevel';
import { FiWifi } from 'react-icons/fi';

export default function Status(){
    return (
        <div className='flex items-center'>
            <FiWifi className='text-sm mr-2 last:mr-0'/>
            <div className='flex items-center'>
                <BatteryIcon className='mr-1 text-sm'/>
                <BatteryLevel/>
            </div>
        </div>
    )
}
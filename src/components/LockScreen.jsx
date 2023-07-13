import { useDispatch, useSelector } from "react-redux";
import { setLocked } from '../reducers/global';
import TimeObj from "./TimeObj";
import DateObj from "./DateObj";
import BatteryIcon from "./BatteryIcon";
import BatteryLevel from "./BatteryLevel";
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';
import { twMerge } from "tailwind-merge";
import Hammer from '@win11react/react-hammerjs';

export default function LockScreen(){
    const dispatch = useDispatch();
    const isLocked = useSelector(state => state.global.isLocked);
    const wallpaper = useSelector(state => state.global.wallpaper);

    return (
        <div className={twMerge('absolute bottom-full left-0 z-20 bg-center bg-no-repeat bg-cover h-screen w-full opacity-0 transition-all duration-[250ms]', isLocked && 'bottom-0 duration-500 opacity-100')} style={{ backgroundImage: `url(${wallpaper})`}}>
            <div className='font-light flex flex-col justify-between h-screen w-full bg-black/70 backdrop-blur text-gray-100'>
                <div className="flex flex-col items-center py-20 px-5">
                    <TimeObj className='font-bold text-6xl mb-6'/>
                    <div className="text-xs flex items-center">
                        <DateObj/>
                        <div className='w-[0.5px] h-4 mx-5 bg-gray-100'></div>
                        <div className="flex items-center">
                            <BatteryIcon className='mr-2'/>
                            <BatteryLevel/>
                        </div>
                    </div>
                </div>
                <Hammer onSwipeUp={() => dispatch(setLocked(false))} direction='DIRECTION_UP'>
                    <div className='flex flex-col items-center py-14 px-5'>
                        <HiOutlineChevronDoubleUp className='text-base mb-4'/>
                        <p className='text-sm'>Swipe up to unlock</p>
                    </div>
                </Hammer>
            </div>
        </div>
    )
}
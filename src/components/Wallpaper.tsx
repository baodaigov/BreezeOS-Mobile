import { useAppDispatch, useAppSelector } from "../store/hooks";
// import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { openRecentTasks } from '../store/reducers/global';
import ActionButton from "./ActionButton";

export default function Wallpaper(){
    const dispatch = useAppDispatch();
    const global = useAppSelector(state => state.global);
    const wallpaper = useAppSelector(state => state.global.wallpaper);
    // const [index, setIndex] = useState<number>(0);

    return (
        <div className='w-full h-full bg-gray-950 text-gray-100'>
            <div className='flex flex-col justify-between items-center text-center px-5 py-14 h-full'>
                <div className='mb-6'>
                    <p className='font-semibold mb-3 text-2xl'>Recent Tasks</p>
                    <p className='text-gray-500 text-xs'>Swipe up to close a window. Or click a window to open it.</p>
                </div>
                <div className={twMerge('absolute top-0 left-0 bottom-0 right-0 m-auto bg-center bg-no-repeat bg-cover w-full h-full transition-all duration-300', global.recentTasks.active && 'rounded-xl h-[450px] w-64 active:h-[424px] active:w-60')} style={{ backgroundImage: `url(${wallpaper})` }} onClick={() => dispatch(openRecentTasks(false))}></div>
                <div className="flex justify-center mt-6">
                    <ActionButton className='py-3 px-5 bg-gray-100/5 active:bg-gray-100/10'>
                        <p className='text-sm'>Clear all</p>
                    </ActionButton>
                </div>
            </div>
        </div>
    )
}
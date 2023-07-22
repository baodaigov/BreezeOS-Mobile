import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

export default function NightShiftOverlay(){
    const nightShift = useSelector(state => state.settings.nightShift);
    return <div className='absolute z-[9999] top-0 left-0 w-full h-screen bg-amber-500 transition-all duration-[1500ms] pointer-events-none' style={{ opacity: nightShift.active ? nightShift.level : 0 }}></div>
}
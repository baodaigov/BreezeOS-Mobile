import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

export default function BrightnessOverlay(){
    const brightness = useSelector(state => state.settings.brightness);
    return <div className='absolute z-20 top-0 left-0 w-full h-screen bg-black pointer-events-none' style={{ opacity: `${(100 - brightness) / 100}` }}></div>
}
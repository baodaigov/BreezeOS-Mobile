import { useAppSelector } from "../store/hooks";

export default function BrightnessOverlay(){
    const brightness = useAppSelector(state => state.settings.brightness);
    return <div className='absolute z-[9999] top-0 left-0 w-full h-screen bg-black pointer-events-none' style={{ opacity: (100 - brightness) / 100 }}></div>
}
import { useSelector } from "react-redux"
import { twMerge } from "tailwind-merge"

export default function SplashScreen(){
    const screenSplash = useSelector(state => state.global.screenSplash);

    return (
        <div className={twMerge('bg-black flex justify-center items-center absolute z-20 w-full h-screen opacity-0 pointer-events-none', screenSplash && 'opacity-100 pointer-events-auto')}>
            <p className='text-5xl font-bold text-white'>BreezeOS</p>
        </div>
    )
}
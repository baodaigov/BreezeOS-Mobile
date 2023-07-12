import { twMerge } from "tailwind-merge"

export default function ModalBg({ children, active }){
    return (
        <div className={twMerge('relative text-center z-20 h-screen w-full flex justify-center items-center bg-black/90 text-gray-100 transition-all opacity-0 pointer-events-none', active && 'opacity-100 pointer-events-auto')}>{children}</div>
    )
}
import { Signal } from "@preact/signals"
import { twMerge } from "tailwind-merge"

interface ModalBgProps {
    children: React.ReactNode
    active: boolean | Signal<boolean>
}

export default function ModalBg({ children, active }: ModalBgProps){
    return (
        <div className={twMerge('absolute text-center z-30 h-full w-full flex justify-center items-center bg-black/90 text-gray-100 transition-all opacity-0 pointer-events-none', active && 'opacity-100 pointer-events-auto')}>{children}</div>
    )
}
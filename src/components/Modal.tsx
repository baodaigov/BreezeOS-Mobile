import { twMerge } from "tailwind-merge";
import ActionButton from "./ActionButton";

interface ModalProps {
    title: string
    description: string
    buttons: {
        value: string
        disabled?: boolean
        action: () => void
    }[]
}

export default function Modal({ title, description, buttons }: ModalProps){
    return (
        <div className="w-96 h-full flex justify-center items-center m-5">
            <div className='text-xs rounded-md text-left bg-zinc-100/90 backdrop-blur-md text-gray-800 dark:bg-zinc-900/80 dark:backdrop-blur-md dark:text-gray-100 px-6 py-4'>
                <div className='mb-8 my-1'>
                    <p className='font-semibold text-base mb-3'>{title}</p>
                    <p>{description}</p>
                </div>
                <div className='flex flex-row-reverse'>
                    <div className='flex'>
                        {buttons.map(i => (
                            <ActionButton className={twMerge('bg-transparent transition-all duration-200 active:bg-[#83aaff]/20 dark:active:bg-[#83aaff]/10 active:transition-none text-[#83aaff] rounded-full px-3 py-2 ml-2', i.disabled && 'text-gray-100/10 pointer-events-none')} onClick={i.action}>
                                <p>{i.value}</p>
                            </ActionButton>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
import ActionButton from "./ActionButton";

export default function Modal({ title, description, buttons }){
    return (
        <div className='text-xs rounded-md bg-zinc-900/70 text-left text-gray-100 px-6 py-4 w-96'>
            <div className='mb-8 my-1'>
                <p className='font-semibold text-base mb-3'>{title}</p>
                <p>{description}</p>
            </div>
            <div className='flex flex-row-reverse'>
                <div className='flex'>
                    {buttons.map(i => (
                        <ActionButton className='bg-transparent transition-all duration-200 active:bg-[#83aaff]/10 active:transition-none text-[#83aaff] rounded-full px-3 py-2 ml-2' onClick={i.action}>
                            <p>{i.value}</p>
                        </ActionButton>
                    ))}
                </div>
            </div>
        </div>
    )
}
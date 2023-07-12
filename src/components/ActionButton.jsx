import { twMerge } from "tailwind-merge"

export default function ActionButton({ className, id, onClick, children }){
    return (
        <div className={twMerge('rounded-full flex justify-center items-center transition duration-75', className)} id={id} onClick={onClick}>{children}</div>
    )
}
import { twMerge } from "tailwind-merge";

export default function Input({ className, placeholder, value, focus }){
    return (
        <div className={className}>
            <p className='text-gray-100/20'>{placeholder}</p>
            <p>{value}</p>
        </div>
    )
}
import React from "react"
import { twMerge } from "tailwind-merge"

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export default function ActionButton({
    className,
    id,
    onClick,
    children,
    ...props
}: ActionButtonProps){
    return (
        <button className={twMerge('cursor-default rounded-full flex justify-center items-center transition duration-75', className)} id={id} onClick={onClick} {...props}>{children}</button>
    )
};
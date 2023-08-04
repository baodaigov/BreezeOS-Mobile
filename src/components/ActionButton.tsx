import React from "react"
import { twMerge } from "tailwind-merge"

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export default function ActionButton({
    className,
    children,
    ...props
}: ActionButtonProps){
    return (
        <button className={twMerge('cursor-default rounded-full flex justify-center items-center', className)} {...props}>{children}</button>
    )
};
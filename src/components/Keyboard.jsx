import { useEffect, useState } from "react";
import { BsArrowReturnLeft, BsGlobe2, BsShift, BsShiftFill } from "react-icons/bs";
import { GoSmiley } from "react-icons/go";
import { IoBackspaceOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function Keyboard(){
    const keysArray = [
        // ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        // ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
        // ['#+=', '.', ',', '?', '!', '\'', 'backspace'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['caps', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
        ['num', 'lang', 'emoji', 'space', 'return']
    ];

    const [keysType, setKeysType] = useState(null);
    const [caps, setCaps] = useState(false);
    const [num, setNum] = useState(false);

    const Key = ({ children, className }) => {
        return (
            <div className={twMerge('flex justify-center items-center w-10 bg-gray-800/30 py-3 px-1 rounded-md m-[3px] text-gray-100 transition-all duration-200 active:bg-gray-700/40 active:transition-none', className)}>
                {children}
            </div>
        )
    }

    function generate(key){
        switch(key){
            case 'backspace':
                return (
                    <Key className='w-[54px]'>
                        <IoBackspaceOutline/>
                    </Key>
                )
            case 'caps':
                return (
                    <Key className='w-[54px]'>
                        {caps ? <BsShiftFill/> : <BsShift/>}
                    </Key>
                )
            case 'num':
                return (
                    <Key className='text-sm w-9'>
                        <p>{num ? 'ABC' : '123'}</p>
                    </Key>
                )
            case 'emoji':
                return (
                    <Key className='w-8'>
                        <GoSmiley/>
                    </Key>
                )
            case 'lang':
                return (
                    <Key className='w-8'>
                        <BsGlobe2/>
                    </Key>
                )
            case 'space':
                return (
                    <Key className='w-52'></Key>
                )
            case 'return':
                return (
                    <Key className='w-28'>
                        <BsArrowReturnLeft/>
                    </Key>
                )
            default:
                return (
                    <Key>
                        <p>{key}</p>
                    </Key>
                )
        }
    }

    return (
        <div className='absolute bottom-0 z-10 bg-gray-900/90 backdrop-blur p-1 pb-12 w-full'>
            <div className="flex flex-col">
                {keysArray.map(keys => (
                    <div className="flex justify-center w-full">
                        {keys.map(key => (
                            <>
                                {generate(key)}
                            </>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
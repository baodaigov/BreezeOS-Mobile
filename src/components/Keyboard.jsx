import { Fragment, useEffect, useState } from "react";
import { BsArrowReturnLeft, BsGlobe2, BsShift, BsShiftFill } from "react-icons/bs";
import { GoSmiley } from "react-icons/go";
import { IoBackspaceOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function Keyboard(){
    const keysArray = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
        ['shift', '.', ',', '?', '!', '\'', 'backspace'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
        ['123', 'lang', 'emoji', 'space', 'return']
    ];

    const alpha = 'abcdefghijklmnopqrstuvwxyz';

    const [key, setKey] = useState('');
    const [keysType, setKeysType] = useState(null);
    const [disableSpaceLang, setDisableSpaceLang] = useState(false);
    const [lang, setLang] = useState('English (US)');
    const [shift, setShift] = useState(false);
    const [num, setNum] = useState(false);

    useEffect(() => {
        const keys = JSON.parse(JSON.stringify(keysArray)).slice(3);
        setKeysType(keys);

        const numKeys = JSON.parse(JSON.stringify(keysArray));
        numKeys.splice(3, 3);

        const capitalKeys = JSON.parse(JSON.stringify(keysArray)).slice(3);
        const alphabet = alpha.split("");

        capitalKeys.forEach(arr => {
            arr.forEach((key, index, _arr) => {
                if (key.length === 1 && alphabet.indexOf(key) > -1) {
                    _arr[index] = shift ? key.toUpperCase() : key.toLowerCase();
                }
            });
        });

        if(shift){
            setKeysType(capitalKeys);
        }

        if(num){
            setKeysType(numKeys);
            if(shift){
                numKeys.splice(0, 2, ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='], ['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•']);
            }
        }

        setTimeout(() => setDisableSpaceLang(true), 3000);

    }, [shift, num]);

    function keyClick(key){
        const k = key && key.trim();
        if(k === 'shift') return setShift(!shift);
        if(k === '123') return setNum(!num);
        return setKey(key);
    }

    function generate(key){
        switch(key){
            case 'backspace':
                return (
                    <Key className={`w-[60px] ${num && 'w-[104px]'}`} onClick={() => keyClick(key)}>
                        <IoBackspaceOutline/>
                    </Key>
                )
            case 'shift':
                return (
                    <Key className={`w-[60px] ${num && 'w-[104px]'}`} onClick={() => keyClick(key)}>
                        {shift ? <BsShiftFill/> : <BsShift/>}
                    </Key>
                )
            case '123':
                return (
                    <Key className='text-xs w-10' onClick={() => keyClick(key)}>
                        <p>
                            {num && key === "123"
                                ? "ABC"
                                : num && key === "ABC"
                                ? "123"
                                : key
                            }
                        </p>
                    </Key>
                )
            case 'emoji':
                return (
                    <Key className='w-8' onClick={() => keyClick(key)}>
                        <GoSmiley/>
                    </Key>
                )
            case 'lang':
                return (
                    <Key className='w-8' onClick={() => keyClick(key)}>
                        <BsGlobe2/>
                    </Key>
                )
            case 'space':
                return (
                    <Key className='text-xs w-[198px]' onClick={() => keyClick(key)}>
                        <p className={twMerge(`text-gray-100 transition-all duration-300 opacity-100`, disableSpaceLang && 'opacity-0')}>{lang}</p>
                    </Key>
                )
            case 'return':
                return (
                    <Key className='w-28' onClick={() => keyClick(key)}>
                        <BsArrowReturnLeft/>
                    </Key>
                )
            default:
                return (
                    <Key onClick={() => keyClick(key)}>
                        <p>{key}</p>
                    </Key>
                )
        }
    }

    const Key = ({ children, className, onClick }) => {
        return (
            <div
                className={twMerge(
                    'flex justify-center items-center w-[38px] bg-gray-800/30 py-3 px-1 rounded-md m-[3px] text-gray-100 transition-colors duration-300 active:bg-gray-700/40 active:transition-none',
                    className
                )}
                onClick={onClick}
            >
                {children}
            </div>
        )
    }

    return (
        <>
            <div className='absolute top-10 bg-gray-900 text-white p-8 w-full flex flex-col text-center justify-center rounded-md'>
                <p className='text-xs mb-5'>
                    This box is being used to display the key whenever it's clicked.
                    <br/>
                    &#40;for development only&#41;
                </p>
                <p className='text-2xl font-bold'>{key}</p>
            </div>
            <div className='absolute bottom-0 z-10 bg-gray-900/90 backdrop-blur p-1 pb-12 w-full'>
                <div className="flex flex-col">
                    {keysType && keysType.map((keys, i) => (
                        <div className="flex justify-center w-full" key={i}>
                            {keys.map(key => (
                                <>{generate(key)}</>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

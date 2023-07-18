import { useEffect, useState } from "react";
import { BsArrowReturnLeft, BsGlobe2, BsShift, BsShiftFill } from "react-icons/bs";
import { GoSmiley } from "react-icons/go";
import { IoBackspaceOutline, IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import ActionButton from './ActionButton';
import { setKeyboardActive, setEmojiKeyboard } from "../reducers/keyboard";
import { VscChevronLeft } from 'react-icons/vsc';

export default function Keyboard({ theme = 'dark' }){
    const dispatch = useDispatch();
    const keyboard = useSelector(state => state.keyboard);

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
    const [height, setHeight] = useState(294);
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
        if(k === 'emoji') return dispatch(setEmojiKeyboard(true));

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
                        <p className={twMerge(`transition-all duration-300 opacity-100`, disableSpaceLang && 'opacity-0')}>{lang}</p>
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
                    `flex justify-center items-center w-[38px] ${theme === 'dark' ? 'bg-gray-800/30 text-gray-100 active:bg-gray-700/40' : 'bg-gray-200/30 text-gray-800 active:bg-gray-400/10'} py-3 px-1 rounded-md m-[3px] transition-colors duration-300 active:transition-none`,
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
            <div className={twMerge(`absolute -bottom-full z-10 ${theme === 'dark' ? 'bg-gray-900/90' : 'bg-gray-50/80'} backdrop-blur p-1 pb-12 w-full flex flex-col transition-all duration-300`, keyboard.active && 'bottom-0')} style={{ height: `${height}px` }}>
                <div className='flex flex-row-reverse py-1 px-2'>
                    <ActionButton className={`p-1 bg-transparent ${theme === 'dark' ? 'active:bg-gray-100/5 text-gray-100' : 'active:bg-gray-900/10'}`} onClick={() => dispatch(setKeyboardActive(false))}>
                        <IoCloseOutline className='text-lg'/>
                    </ActionButton>
                </div>
                {!keyboard.emoji && (
                    <div className='flex flex-col'>
                        {keysType && keysType.map((keys, i) => (
                            <div className="flex justify-center w-full" key={i}>
                                {keys.map(key => (
                                    <>{generate(key)}</>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
                {keyboard.emoji && (
                    <div className={`flex flex-col justify-between h-full px-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                        <p>Emoji keyboard coming soon</p>
                        <div className="flex">
                            <ActionButton className={`p-1 bg-transparent ${theme === 'dark' ? 'active:bg-gray-100/5' : 'active:bg-gray-900/10'}`} onClick={() => dispatch(setEmojiKeyboard(false))}>
                                <VscChevronLeft className='text-xl'/>
                            </ActionButton>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

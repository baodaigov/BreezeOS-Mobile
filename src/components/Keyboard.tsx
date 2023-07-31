import { useAppSelector, useAppDispatch } from "../store/hooks";
import React, { useEffect, useState } from "react";
import { BsArrowReturnLeft, BsGlobe2, BsShift, BsShiftFill } from "react-icons/bs";
import { GoSmiley } from "react-icons/go";
import { IoBackspaceOutline, IoCloseOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import ActionButton from './ActionButton';
import { setKeyboardActive, setEmojiKeyboard } from "../store/reducers/keyboard";
import { VscChevronLeft } from 'react-icons/vsc';
import Hammer from 'react-hammerjs';

interface KeyboardProps {
    theme?: 'dark' | 'light'
}

export default function Keyboard({ theme = 'dark' }: KeyboardProps){
    const dispatch = useAppDispatch();
    const keyboard = useAppSelector(state => state.keyboard);
    const lang = useAppSelector(state => state.keyboard.lang);

    const keysArray = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
        ['shift', '.', ',', '?', '!', '\'', 'backspace'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
        ['123', 'lang', 'emoji', 'space', 'return']
    ];

    const emojiArray = [
        ['😀', '😃', '😄', '😁', '😆', '🥹', '😅', '😂', '🤣', '🥲', '☺️'],
    ];

    const alpha = 'abcdefghijklmnopqrstuvwxyz';

    const [keysType, setKeysType] = useState<string[][] | null>(null);
    // const [emojisType, setEmojisType] = useState(null);
    const [langIndex, setLangIndex] = useState<number>(0);
    const [shift, setShift] = useState<boolean>(false);
    const [num, setNum] = useState<boolean>(false);
    const currentLang = lang[langIndex];

    useEffect(() => {
        const keys: string[][] = JSON.parse(JSON.stringify(keysArray)).slice(3);
        setKeysType(keys);

        const numKeys: string[][] = JSON.parse(JSON.stringify(keysArray));
        numKeys.splice(3, 3);

        const capitalKeys: string[][] = JSON.parse(JSON.stringify(keysArray)).slice(3);
        const alphabet = alpha.split('');

        capitalKeys.forEach(arr => {
            arr.forEach((key, index, _arr) => {
                if (key.length === 1 && alphabet.indexOf(key) > -1) {
                    _arr[index] = shift ? key.toUpperCase() : key.toLowerCase();
                }
            });
        });

        if(!keyboard.active){
            setShift(false);
            setNum(false);
            dispatch(setEmojiKeyboard(false));
        }

        if(shift){
            setKeysType(capitalKeys);
        }

        if(num){
            setKeysType(numKeys);
            if(shift){
                numKeys.splice(0, 2, ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='], ['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•']);
            }
        }
    }, [shift, num, keyboard]);

    function keyClick(key: string){
        const k = key && key.trim();
        if(k === 'shift') return setShift(!shift);
        if(k === '123') return setNum(!num);
        if(k === 'lang') return setTimeout(() => setLangIndex(prev => prev === lang.length - 1 ? 0 : prev + 1), 100);
        if(k === 'emoji') return setTimeout(() => dispatch(setEmojiKeyboard(true)), 150);

        return console.log(key);
    }

    function generate(key: string){
        switch(key){
            case 'a':
                return (
                    <Key
                        onClick={() => keyClick(key)}
                        onPressDown={() => console.log('ok')}
                        onPressUp={() => console.log('ok 2')}
                        options={{
                            recognizers: {
                                press: {
                                    time: 350
                                }
                            }
                        }}
                    >
                        <p>a</p>
                    </Key>
                )
            case 'backspace':
                return (
                    <Key
                        className={`w-[60px] ${num && 'w-[104px]'}`}
                        onPressDown={() => keyClick(key)}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <IoBackspaceOutline/>
                    </Key>
                )
            case 'shift':
                return (
                    <Key
                        className={`w-[60px] ${num && 'w-[104px]'}`}
                        onPressDown={() => keyClick(key)}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        {shift ? <BsShiftFill/> : <BsShift/>}
                    </Key>
                )
            case '123':
                return (
                    <Key
                        className='text-xs w-10'
                        onPressDown={() => keyClick(key)}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <p>{num && key === "123" ? "ABC" : key}</p>
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
                        <p>{currentLang}</p>
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

    interface KeyProps extends Hammer.ReactHammerProps {
        className?: string
        onClick?: HammerListener
        onPressDown?: HammerListener
    }

    const Key: React.FC<KeyProps> = ({ children, className, onClick, onPressDown, onPressUp, ...props }) => {
        return (
            <Hammer
                onTap={onClick}
                onPress={onPressDown}
                onPressUp={onPressUp}
                {...props}
            >
                <div
                    className={twMerge(
                        `relative flex justify-center items-center w-[38px] ${theme === 'dark' ? 'bg-gray-800/30 text-gray-100 active:bg-gray-700/40' : 'bg-gray-200/30 text-gray-800 active:bg-gray-400/10'} py-3 px-1 rounded-md m-[3px] transition-all duration-300 active:transition-none active:-translate-y-1`,
                        className
                    )}
                >
                    {children}
                </div>
            </Hammer>
        )
    }

    return (
        <div className={twMerge(`absolute -bottom-full z-10 ${theme === 'dark' ? 'bg-gray-900/90' : 'bg-gray-50/80'} backdrop-blur p-1 pb-12 w-full flex flex-col transition-all duration-300 opacity-0 pointer-events-none`, keyboard.active && 'bottom-0 opacity-100 pointer-events-auto')}>
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
                    <div className="px-2 py-4">
                        {emojiArray.map(keys => (
                            <div className='flex'>
                                {keys.map(key => (
                                    <p>{key}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                        <ActionButton className={`p-1 bg-transparent ${theme === 'dark' ? 'active:bg-gray-100/5' : 'active:bg-gray-900/10'}`} onClick={() => dispatch(setEmojiKeyboard(false))}>
                            <VscChevronLeft className='text-xl'/>
                        </ActionButton>
                    </div>
                </div>
            )}
        </div>
    )
}

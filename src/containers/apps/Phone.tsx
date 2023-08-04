import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { twMerge } from "tailwind-merge";
import { setColor, setImage, setName, setPhoneNumber } from '../../store/reducers/apps/phone';
import EmergencyBg from '../../images/emergency-bg.jpeg';
import DefaultBg from '../../images/default.jpg';
import avatar1 from '../../images/cyplucastero.jpg';
import { BiSolidMicrophoneOff, BiPencil } from 'react-icons/bi';
import { IoIosKeypad } from 'react-icons/io';
import { FaVolumeUp } from 'react-icons/fa';
import { IoBackspaceOutline, IoChatbubbleEllipses, IoClose } from 'react-icons/io5';
import ActionButton from "../../components/ActionButton";
import Sound from '../../sounds/call.mp3'
import { switchStyle } from "../../store/reducers/header";
import { BsStar, BsStarFill } from 'react-icons/bs';
import { RiContactsLine, RiHistoryLine } from 'react-icons/ri';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { HiPhone } from 'react-icons/hi';
import { AiOutlineExclamation, AiOutlineUser } from 'react-icons/ai';
import { IconType } from "react-icons"
import { signal } from "@preact/signals";
import Hammer from 'react-hammerjs';
import ContactImg from '../../images/contact.svg';

const history = signal<{
    name: string
    number: string | null
    color: string | null
    image: any
}[]>([]);

const favorite = signal<{
    name: string
    number: string | null
    color: string | null
    image: any
}[]>([]);

export default function Phone(){
    const keypad = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['*', '0', '#']
    ]
    const dispatch = useAppDispatch();
    const phone = useAppSelector(state => state.phone);
    const settings = useAppSelector(state => state.settings);
    const [number, setNumber] = useState<string[]>([]);
    const contact = [
        {
            name: 'Dao Thanh Minh',
            image: null,
            number: '(682)-310-1496',
            color: 'bg-sky-500'
        },
        {
            name: 'Cyprus Lucastero',
            image: avatar1,
            number: '(420)-696-6969',
            color: 'bg-lime-500'
        },
        {
            name: 'Thanh Ha`',
            image: null,
            number: '+842488830157',
            color: 'bg-indigo-600'
        },
        {
            name: 'truong giang',
            image: null,
            number: '+842488819047',
            color: 'bg-orange-300'
        },
        {
            name: 'cyplucastero@gmail.com',
            image: null,
            number: null,
            color: 'bg-red-500'
        },
    ]

    const [section, setSection] = useState<number>(0);
    const emergencyNumber = '911';
    const favoriteValue = favorite.value;
    const historyValue = history.value;
    const sound = new Audio(Sound);
    const [callEnded, setCallEnded] = useState<boolean>(false);

    interface AvatarProps {
        name: string
        image: any
        color: string | null
        size?: number
        fontSize?: number
        isEmergency?: boolean
        children?: React.ReactNode
    }

    const Avatar: React.FC<AvatarProps> = ({ name, image, color, size = 40, fontSize = 16, isEmergency, children }) => {
        return (
            <>
                {isEmergency ? (
                    <div className='relative overflow-hidden rounded-full flex justify-center items-center bg-red-500 text-gray-800' style={{ width: size, height: size, fontSize: fontSize }}>
                        <AiOutlineExclamation/>
                    </div>
                ) : (
                    <div className={`relative overflow-hidden rounded-full flex justify-center items-center ${image === null && color}`} style={{ width: size, height: size, fontSize: fontSize }}>
                        {image === null ? (
                            <>
                                {name !== '' ? <p className='font-semibold'>{name.charAt(0).toUpperCase()}</p> : <AiOutlineUser className='w-full h-full bg-sky-600 text-gray-800'/>}
                            </>
                        ) : (
                            <img className='w-full h-full' src={image}/>
                        )}
                        {children}
                    </div>
                )}
            </>
        )
    }

    interface ContactProps {
        name: string
        image: any
        number: string | null
        color: string | null
    }

    const Contact: React.FC<ContactProps> = ({ name, image, number, color }) => {
        const [contactShown, setContactShown] = useState(false);
        const [isFavorite, setFavorite] = useState<boolean>(false);
        const [addCallerActive, setAddCallerActive] = useState<boolean>(false);

        useEffect(() => {
            if(isFavorite){
                const newFavorite = [
                    ...favoriteValue,
                    {
                        name: name,
                        image: image,
                        number: number,
                        color: color
                    }
                ];

                favorite.value = newFavorite;
            }
        }, [favorite, isFavorite]);

        return (
            <>
                <div className="w-full px-2 py-1">
                    <div className='flex justify-between items-center w-full rounded-full p-4 text-gray-800 dark:text-gray-100 transition-all duration-300 active:bg-gray-800/10 dark:active:bg-gray-100/10 active:transition-none' onClick={() => setContactShown(true)}>
                        <div className="flex items-center">
                            <Avatar name={name} image={image} color={color} isEmergency={number === emergencyNumber && true}/>
                            <div className="flex flex-col ml-3">
                                <p className='font-bold mb-1'>{number === emergencyNumber ? 'Emergency service' : name !== '' ? name : `${number}`}</p>
                                <p className="text-xs text-gray-500">{number && number}</p>
                            </div>
                        </div>
                        <VscChevronRight className='text-gray-500 text-xl'/>
                    </div>
                </div>
                <div className={twMerge('absolute z-10 top-0 bottom-0 right-0 left-0 m-auto w-[90%] h-[90%] flex flex-col py-8 px-4 bg-zinc-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-100 transition-all duration-300 opacity-0 pointer-events-none', contactShown && 'w-full h-full opacity-100 pointer-events-auto')}>
                    <div className="flex justify-between mb-4">
                        <ActionButton className='p-2 transition-all duration-200 active:bg-gray-800/10 dark:active:bg-gray-100/10 active:transition-none' onClick={() => setContactShown(false)}>
                            <VscChevronLeft className='text-xl'/>
                        </ActionButton>
                        <ActionButton className='p-2 transition-all duration-200 text-sky-600 active:bg-sky-600/10 active:transition-none' onClick={() => setFavorite(!isFavorite)}>
                            {isFavorite ? <BsStarFill className='text-lg'/> : <BsStar className='text-lg'/>}
                        </ActionButton>
                    </div>
                    <div className="flex flex-col items-center my-5">
                        <Avatar name={name} image={image} color={color} size={96} fontSize={48} isEmergency={number === emergencyNumber && true}>
                            {name !== '' && number !== null && (
                                <div className="bg-black/70 w-full h-full absolute top-0 left-0 bottom-0 right-0 p-5 flex justify-center items-center opacity-0 hover:opacity-100">
                                    <BiPencil className='text-3xl'/>
                                </div>
                            )}
                        </Avatar>
                        <p className='text-xl mt-5'>{number === emergencyNumber ? 'Emergency service' : name !== '' ? name : `${number}`}</p>
                        <p className='text-xs text-gray-500 mt-2'>{number}</p>
                    </div>
                    <div className="flex justify-center items-center mb-7">
                        {number !== null && (
                            <ActionButton
                                className='text-[13px] bg-sky-300 text-sky-800 transition-all duration-300 active:bg-sky-300/75 active:transition-none py-3 px-5 mr-3'
                                onClick={() => {
                                    setContactShown(false);
                                    setTimeout(() => {
                                        dispatch(setName(name));
                                        dispatch(setImage(image));
                                        dispatch(setColor(color));
                                        dispatch(setPhoneNumber(number));
                                    }, 500);
                                }}
                            >
                                <HiPhone className='text-base mr-2'/>
                                <p>Call</p>
                            </ActionButton>
                        )}
                        <ActionButton
                            className='text-[13px] bg-sky-300 text-sky-800 transition-all duration-300 active:bg-sky-300/75 active:transition-none py-3 px-5'
                            onClick={() => {
                                setContactShown(false);
                            }}
                        >
                            <IoChatbubbleEllipses className='text-sm mr-2'/>
                            <p>Message</p>
                        </ActionButton>
                    </div>
                    {/* {name === '' && (
                        <div className='rounded-md py-2 px-3 mb-4 text-sm bg-gray-800/5 text-gray-800 dark:bg-gray-100/5 dark:text-gray-100'>
                            <p className='inline'>This caller is not in your contact list.</p>
                            <p
                                className='ml-1 inline text-sky-600'
                                onClick={() => {
                                    setContactShown(false);
                                    setTimeout(() => setAddCallerActive(true), 500);
                                }}
                            >
                                Add this caller...
                            </p>
                        </div>
                    )} */}
                        <div className='rounded-md py-2 px-3 mb-4 text-sm bg-gray-800/5 text-gray-800 dark:bg-gray-100/5 dark:text-gray-100'>
                            <p className='inline'>This caller is not in your contact list.</p>
                            <p
                                className='ml-1 inline text-sky-600'
                                onClick={() => {
                                    setContactShown(false);
                                    setTimeout(() => setAddCallerActive(true), 500);
                                }}
                            >
                                Add this caller...
                            </p>
                        </div>
                    <div className="flex flex-col text-sm h-full mb-6">
                        <p className='mb-2'>Note</p>
                        <textarea className='appearance-none resize-none border-none outline-none rounded-md py-2 px-3 h-full bg-gray-800/5 text-gray-800 dark:bg-gray-100/5 dark:text-gray-100' spellCheck={false}/>
                    </div>
                </div>
                <div className={twMerge('absolute top-0 bottom-0 left-0 right-0 bg-black/90 z-10 w-full h-full flex justify-center opacity-0 pointer-events-none transition-all duration-[250ms]', addCallerActive && 'opacity-100 pointer-events-auto')}>
                    <div className={twMerge('absolute -bottom-full w-[97%] rounded-t-3xl flex flex-col items-center bg-gray-100 text-gray-800 dark:bg-zinc-950 dark:text-gray-100 transition-all duration-[600ms] opacity-0 pointer-events-none', addCallerActive && 'bottom-0 opacity-100 pointer-events-auto')}>
                        <div className="py-8 px-6 pb-14 flex flex-col items-center text-center">
                            <div className="relative w-full flex justify-center items-center">
                                <ActionButton className='absolute right-0 p-2 transition-all duration-500 active:bg-gray-800/10 dark:active:bg-gray-100/10 active:transition-none' onClick={() => setAddCallerActive(false)}>
                                    <IoClose className='text-lg'/>
                                </ActionButton>
                                <p className='font-semibold text-3xl'>Add Contact</p>
                            </div>
                            <img className='w-full h-full my-8' src={ContactImg}/>
                            <p className='text-sm'>Adding this caller in your contact is very easy for you to identify who they are.<br/>Click the button to start the setup process.</p>
                            <ActionButton className='bg-sky-700 mt-6 py-3 px-7 rounded-2xl transition-all duration-300 active:bg-sky-900 active:transition-none text-gray-100 font-semibold'>
                                Get Started
                            </ActionButton>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    interface NavBarProps {
        sections: {
            active?: boolean,
            includeValue?: boolean
            icon: IconType
            value?: string
            action: React.MouseEventHandler<HTMLButtonElement>
        }[]
    }

    const NavBar: React.FC<NavBarProps> = ({ sections }) => {
        return (
            <div className='absolute bottom-0 w-full p-2 pb-12 flex justify-between bg-sky-600 bg-opacity-10'>
                {sections.map(i => (
                    <ActionButton className={`w-full rounded-full transition-all duration-300 active:bg-sky-600/10 active:transition-none ${i.active ? 'text-sky-600' : 'text-gray-800 dark:text-gray-300'}`} onMouseDown={i.action}>
                        <div className={`w-[75%] py-3 flex flex-col justify-center items-center ${i.active && 'border-b-2 border-solid border-sky-600'}`}>
                            <i.icon className='text-lg mb-1'/>
                            {i.includeValue && <p className='text-xs'>{i.value}</p>}
                        </div>
                    </ActionButton>
                ))}
            </div>
        )
    }
    
    const interactions = [
        {
            icon: <BiSolidMicrophoneOff/>,
            label: 'Mute'
        },
        {
            icon: <IoIosKeypad/>,
            label: 'Keypad'
        },
        {
            icon: <FaVolumeUp/>,
            label: 'Speaker'
        },
    ];

    useEffect(() => {
        if(phone.active){
            if(settings.darkMode){
                dispatch(switchStyle(false));
            } else {
                dispatch(switchStyle(true));
            }
        }

        if(phone.number !== null){
            if(!callEnded){
                const newHistory = [
                    ...historyValue,
                    {
                        name: phone.name,
                        number: phone.number,
                        color: phone.color,
                        image: phone.image
                    }
                ]
                
                history.value = newHistory
                console.log(historyValue);
                sound.play();
                console.log('ok')
            } else {
                setTimeout(() => {
                    dispatch(setName(''));
                    dispatch(setImage(null));
                    dispatch(setColor(null));
                    setNumber([]);
                    dispatch(setPhoneNumber(null));
                    setCallEnded(false);
                }, 1500);
                return;
            }

            const timeout = setTimeout(() => setCallEnded(true), 52610);

            return () => clearTimeout(timeout);
        }
    }, [history, callEnded, phone, settings]);

    function generate(key: string){
        switch(key){
            case '1':
                return (
                    <Hammer
                        onPress={() => setNumber([...number, key])}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <div className='flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none'>
                            <p>{key}</p>
                            <p className='text-[9px] leading-4 tracking-widest opacity-0'>-</p>
                        </div>
                    </Hammer>
                )
            case '2':
                return (
                    <Hammer
                        onPress={() => setNumber([...number, key])}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <div className='flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none'>
                            <p>{key}</p>
                            <p className='text-[9px] leading-4 tracking-widest'>ABC</p>
                        </div>
                    </Hammer>
                )
            case '3':
                return (
                    <Hammer
                        onPress={() => setNumber([...number, key])}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <div className='flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none'>
                            <p>{key}</p>
                            <p className='text-[9px] leading-4 tracking-widest'>DEF</p>
                        </div>
                    </Hammer>
                )
            case '4':
                return (
                    <Hammer
                        onPress={() => setNumber([...number, key])}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <div className='flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none'>
                            <p>{key}</p>
                            <p className='text-[9px] leading-4 tracking-widest'>GHI</p>
                        </div>
                    </Hammer>
                )
            case '5':
                return (
                    <Hammer
                        onPress={() => setNumber([...number, key])}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <div className='flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none'>
                            <p>{key}</p>
                            <p className='text-[9px] leading-4 tracking-widest'>JKL</p>
                        </div>
                    </Hammer>
                )
            case '6':
                return (
                    <Hammer
                        onPress={() => setNumber([...number, key])}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <div className='flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none'>
                            <p>{key}</p>
                            <p className='text-[9px] leading-4 tracking-widest'>MNO</p>
                        </div>
                    </Hammer>
                )
            case '7':
                return (
                    <Hammer
                        onPress={() => setNumber([...number, key])}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <div className='flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none'>
                            <p>{key}</p>
                            <p className='text-[9px] leading-4 tracking-widest'>PQRS</p>
                        </div>
                    </Hammer>
                )
            case '8':
                return (
                    <Hammer
                        onPress={() => setNumber([...number, key])}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <div className='flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none'>
                            <p>{key}</p>
                            <p className='text-[9px] leading-4 tracking-widest'>TUV</p>
                        </div>
                    </Hammer>
                )
            case '9':
                return (
                    <Hammer
                        onPress={() => setNumber([...number, key])}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <div className='flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none'>
                            <p>{key}</p>
                            <p className='text-[9px] leading-4 tracking-widest'>WXYZ</p>
                        </div>
                    </Hammer>
                )
            case '*':
                return (
                    <Hammer
                        onPress={() => setNumber([...number, key])}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <div className='flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none'>
                            <p>{key}</p>
                        </div>
                    </Hammer>
                )
            case '0':
                return (
                    <Hammer
                    onPress={() => setNumber([...number, key])}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <div className='flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none'>
                            <p>{key}</p>
                            <p className='text-[9px] leading-4 tracking-widest'>+</p>
                        </div>
                    </Hammer>
                )
            case '#':
                return (
                    <Hammer
                        onPress={() => setNumber([...number, key])}
                        options={{
                            recognizers: {
                                press: {
                                    time: 0
                                }
                            }
                        }}
                    >
                        <div className='flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none'>
                            <p>{key}</p>
                        </div>
                    </Hammer>
                )
        }
    }

    return (
        <>
            <div className={twMerge('absolute bg-zinc-100 dark:bg-zinc-900 top-0 bottom-0 left-0 right-0 pt-8 m-auto w-[90%] h-[90%] transition-all duration-300 opacity-0 pointer-events-none', phone.active && 'w-full h-full opacity-100 pointer-events-auto')}>
                {section === 0 && (
                    <>
                        {favoriteValue.length === 0 ? (
                            <div className='w-full h-full flex justify-center items-center px-2'>
                                <div className='flex flex-col items-center text-gray-100/10'>
                                    <BsStarFill className='text-6xl mb-4'/>
                                    <p className='text-sm'>Favorite contacts will be displayed here.</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {favoriteValue.map(i => (
                                    <Contact name={i.name} color={i.color} image={i.image} number={i.number} key={Math.random()}/>
                                ))}
                            </>
                        )}
                    </>
                )}
                {section === 1 && (
                    <>
                        {historyValue.length === 0 ? (
                            <div className='w-full h-full flex justify-center items-center px-2'>
                                <div className='flex flex-col items-center text-gray-100/10'>
                                    <RiHistoryLine className='text-6xl mb-4'/>
                                    <p className='text-sm'>Recent calls will be displayed here.</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {historyValue.map(i => (
                                    <Contact name={i.name} color={i.color} image={i.image} number={i.number} key={Math.random()}/>
                                ))}
                            </>
                        )}
                    </>
                )}
                {section === 2 && (
                    <>
                        {contact.map(i => (
                            <Contact name={i.name} color={i.color} image={i.image} number={i.number}/>
                        ))}
                    </>
                )}
                {section === 3 && (
                    <div className='h-full flex flex-col-reverse pb-[135px] text-gray-800 dark:text-gray-100'>
                        <div className="flex flex-col">
                            <div className='flex justify-center items-center mb-5'>
                                {number.map(num => (
                                    <p className='text-2xl'>{num}</p>
                                ))}
                            </div>
                            <div className="flex flex-col px-8">
                                {keypad.map(i => (
                                    <div className="flex my-[2px]">
                                        {i.map(key => (
                                            <>{generate(key)}</>
                                        ))}
                                    </div>
                                ))}
                                <div className="relative flex items-center mt-5">
                                    <div className="w-full flex justify-center items-center">
                                        <ActionButton
                                            className='p-4 bg-green-400 text-gray-100 transition-all duration-300 active:bg-green-500 active:transition-none'
                                            onClick={() => setTimeout(() => dispatch(setPhoneNumber(number.join(''))), 100)}
                                        >
                                            <HiPhone className='text-xl'/>
                                        </ActionButton>
                                    </div>
                                    {number.length !== 0 && (
                                        <Hammer
                                            onPress={() => setNumber(number.slice(0, -1))}
                                            options={{
                                                recognizers: {
                                                    press: {
                                                        time: 0
                                                    }
                                                }
                                            }}
                                        >
                                            <div className='absolute right-0 flex justify-center items-center rounded-full z-10 p-3 transition-all duration-200 active:bg-gray-800/10 dark:active:bg-gray-100/10 active:transition-none'>
                                                <IoBackspaceOutline className='text-lg'/>
                                            </div>
                                        </Hammer>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <NavBar
                    sections={
                        [
                            {
                                active: section === 0,
                                icon: BsStarFill,
                                action: () => setSection(0)
                            },
                            {
                                active: section === 1,
                                icon: RiHistoryLine,
                                action: () => setSection(1)
                            },
                            {
                                active: section === 2,
                                icon: RiContactsLine,
                                action: () => setSection(2)
                            },
                            {
                                active: section === 3,
                                icon: IoIosKeypad,
                                action: () => {
                                    setSection(3);
                                }
                            },
                        ]
                    }
                />
            </div>
            <div className={twMerge('absolute top-0 bottom-0 left-0 right-0 z-10 m-auto w-[90%] h-[90%] flex flex-col transition-all duration-300 opacity-0 pointer-events-none', phone.number !== null && 'w-full h-full opacity-100 pointer-events-auto')}>
                {phone.number === emergencyNumber ? (
                    <div className='bg-center bg-no-repeat bg-cover w-full h-full' style={{ backgroundImage: `url(${EmergencyBg})` }}>
                        <div className='flex flex-col bg-gradient-to-b from-[#680000]/80 to-[#a50000] w-full h-full py-8 px-4 text-gray-100'>
                            <div className="flex justify-center items-center h-80">
                                <div className='text-center'>
                                    {phone.number !== null && (
                                        <>
                                            <p className='text-[42px] font-semibold mb-2'>{phone.name ? phone.name : phone.number}</p>
                                            {!callEnded && (
                                                <>
                                                    <p className='text-sm'>Calling Emergency Service...</p>
                                                </>
                                            )}
                                            {callEnded && <p className='text-sm'>Call Ended</p>}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="h-full flex flex-col">
                                <div className="flex flex-col justify-center h-full">
                                    <div className="grid grid-cols-3 py-8">
                                        {interactions.map(i => (
                                            <ActionButton className={`flex-col py-5 mx-4 my-8 text-2xl transition-all duration-200 active:bg-gray-100/10 active:transition-none ${callEnded && 'opacity-20 pointer-events-none'}`}>
                                                {i.icon}
                                                <p className='text-xs mt-3'>{i.label}</p>
                                            </ActionButton>
                                        ))}
                                    </div>
                                </div>
                                <div className="my-10 flex justify-center">
                                    <ActionButton
                                        className={`bg-red-500 transition-all duration-200 active:bg-red-600 active:transition-none p-4 text-xl ${callEnded && 'bg-gray-100/40 opacity-20 pointer-events-none'}`}
                                        onClick={() => {
                                            setCallEnded(true);
                                            sound.pause();
                                        }}
                                    >
                                        <HiPhone className='rotate-[135deg] text-xl'/>
                                    </ActionButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='bg-center bg-no-repeat bg-cover w-full h-full' style={{ backgroundImage: `url(${phone.image ? phone.image : DefaultBg})` }}>
                        <div className='flex flex-col bg-black/80 backdrop-blur-md w-full h-full py-8 px-4 text-gray-100'>
                            <div className="flex justify-center items-center h-80">
                                <div className='text-center'>
                                    {phone.number !== null && (
                                        <>
                                            <p className='text-[42px] font-semibold mb-2'>{phone.name ? phone.name : phone.number}</p>
                                            {!callEnded && (
                                                <>
                                                    <p className='text-sm'>Calling...</p>
                                                </>
                                            )}
                                            {callEnded && <p className='text-sm'>Call Ended</p>}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="h-full flex flex-col">
                                <div className="flex flex-col justify-center h-full">
                                    <div className="grid grid-cols-3 py-8">
                                        {interactions.map(i => (
                                            <ActionButton className={`flex-col py-5 mx-4 my-8 text-2xl transition-all duration-200 active:bg-gray-100/10 active:transition-none ${callEnded && 'opacity-20 pointer-events-none'}`}>
                                                {i.icon}
                                                <p className='text-xs mt-3'>{i.label}</p>
                                            </ActionButton>
                                        ))}
                                    </div>
                                </div>
                                <div className="my-10 flex justify-center">
                                    <ActionButton
                                        className={`bg-red-500 transition-all duration-200 active:bg-red-600 active:transition-none p-4 text-xl ${callEnded && 'bg-gray-100/40 opacity-20 pointer-events-none'}`}
                                        onClick={() => {
                                            setCallEnded(true);
                                            sound.pause();
                                        }}
                                    >
                                        <HiPhone className='rotate-[135deg] text-xl'/>
                                    </ActionButton>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
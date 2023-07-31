import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { twMerge } from "tailwind-merge";
import { setPhoneNumber } from '../../store/reducers/apps/phone';
import EmergencyBg from '../../images/emergency-bg.jpeg';
import DefaultBg from '../../images/default.jpg';
import { BiSolidMicrophoneOff } from 'react-icons/bi';
import { IoIosKeypad } from 'react-icons/io';
import { FaVolumeUp } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import ActionButton from "../../components/ActionButton";
import Sound from '../../sounds/call.mp3'

export default function Phone(){
    const dispatch = useAppDispatch();
    const phone = useAppSelector(state => state.phone);
    const [callEnded, setCallEnded] = useState(false);
    const sound = new Audio(Sound);

    const interactions = [
        {
            icon: <BiSolidMicrophoneOff/>,
            label: 'Mute',
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
        if(phone.number !== null){
            if(!callEnded){
                sound.play();
            }

            setTimeout(() => setCallEnded(true), 52610);
        }

        if(callEnded){
            setTimeout(() => {
                dispatch(setPhoneNumber(null));
                setCallEnded(false);
            }, 1500);
        }
    }, [callEnded, phone.number]);

    return (
        <>
            <div className={twMerge('absolute top-0 bottom-0 left-0 right-0 m-auto w-[90%] h-[90%] flex flex-col transition-all duration-300 opacity-0 pointer-events-none', phone.number !== null && 'w-full h-full opacity-100 pointer-events-auto')}>
                {phone.number === 911 || phone.number === 112 ? (
                    <div className='bg-center bg-no-repeat bg-cover w-full h-full' style={{ backgroundImage: `url(${EmergencyBg})` }}>
                        <div className='flex flex-col bg-gradient-to-b from-[#680000]/80 to-[#a50000] w-full h-full py-8 px-4 text-gray-100'>
                            <div className="flex justify-center items-center h-80">
                                <div className='text-center'>
                                    <p className='text-[42px] font-semibold mb-2'>{phone.number && phone.number}</p>
                                    {phone.number !== null && (
                                        <>
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
                                            <ActionButton className={`flex-col py-5 mx-4 my-8 text-2xl transition-all duration-200 active:bg-gray-100/10 active:transition-none ${callEnded && 'opacity-30 pointer-events-none'}`}>
                                                {i.icon}
                                                <p className='text-xs mt-3'>{i.label}</p>
                                            </ActionButton>
                                        ))}
                                    </div>
                                </div>
                                <div className="my-10 flex justify-center">
                                    <ActionButton
                                        className={`bg-red-500 transition-all duration-200 active:bg-red-600 active:transition-none p-3 text-xl ${callEnded && 'bg-gray-100/40 opacity-30 pointer-events-none'}`}
                                        onClick={() => {
                                            setCallEnded(true);
                                            sound.pause();
                                        }}
                                    >
                                        <IoCloseOutline/>
                                    </ActionButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='bg-center bg-no-repeat bg-cover w-full h-full' style={{ backgroundImage: `url(${DefaultBg})` }}>
                        <div className='flex flex-col bg-black/80 backdrop-blur-md w-full h-full py-8 px-4 text-gray-100'>
                            <div className="flex justify-center items-center h-80">
                                <div className='text-center'>
                                    <p className='text-[42px] font-semibold mb-2'>{phone.number && phone.number}</p>
                                    {phone.number !== null && (
                                        <>
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
                                            <ActionButton className={`flex-col py-5 mx-4 my-8 text-2xl transition-all duration-200 active:bg-gray-100/10 active:transition-none ${callEnded && 'opacity-30 pointer-events-none'}`}>
                                                {i.icon}
                                                <p className='text-xs mt-3'>{i.label}</p>
                                            </ActionButton>
                                        ))}
                                    </div>
                                </div>
                                <div className="my-10 flex justify-center">
                                    <ActionButton
                                        className={`bg-red-500 transition-all duration-200 active:bg-red-600 active:transition-none p-3 text-xl ${callEnded && 'bg-gray-100/40 opacity-30 pointer-events-none'}`}
                                        onClick={() => {
                                            setCallEnded(true);
                                            sound.pause();
                                        }}
                                    >
                                        <IoCloseOutline/>
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
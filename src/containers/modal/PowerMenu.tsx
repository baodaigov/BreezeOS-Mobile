import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import { displayPowerMenu, toggleEmergencyMode } from '../../store/reducers/modal';
import ModalBg from '../../components/ModalBg';
import ActionButton from '../../components/ActionButton';
import { FiPower } from 'react-icons/fi';
import { GrRotateLeft } from 'react-icons/gr';
import { BiLockAlt } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { TbSos } from 'react-icons/tb';
import { setBlank, setDefault, setLocked, displayScreenSplash } from '../../store/reducers/global';
import { twMerge } from 'tailwind-merge';
import { setHeaderActive } from '../../store/reducers/header';
import { setFooterActive } from '../../store/reducers/footer';
import { setPhoneNumber } from '../../store/reducers/apps/phone';

export default function PowerMenu(){
    const dispatch = useAppDispatch();
    const modal = useAppSelector(state => state.modal.powermenu);
    const [modalType, setModalType] = useState<string>('');

    useEffect(() => {
        if(modal.active){
            setModalType('default');
        } else {
            setModalType('');
        }
    }, [modal]);

    function debounceAction(action: () => void, duration: number){
        dispatch(displayPowerMenu(false));
        setTimeout(action, duration);
    }

    function switchModal(type: string){
        setModalType('');
        setTimeout(() => {
            setModalType(type);
        }, 120);
    }

    function powerOff(){
        dispatch(setHeaderActive(false));
        dispatch(setFooterActive(false));
        setTimeout(() => {
            dispatch(displayScreenSplash(true));
        }, 1000);
        setTimeout(() => {
            dispatch(setBlank(true));
            dispatch(setDefault());
        }, 11000);
    }

    function restart(){
        powerOff();
        setTimeout(() => {
            dispatch(setBlank(false));
            dispatch(displayScreenSplash(true));
        }, 17000);
        setTimeout(() => {
            dispatch(displayScreenSplash(false));
            dispatch(setHeaderActive(true));
            dispatch(setFooterActive(true));
        }, 43000);
    }

    return (
        <ModalBg active={modal.active}>
            <div className={twMerge('absolute flex flex-col text-sm transition-all duration-200 opacity-0 pointer-events-none', modalType === 'default' && 'opacity-100 pointer-events-auto')}>
                <p className='mb-10'>Choose an option:</p>
                <div className='flex flex-col justify-center'>
                    {!modal.emergencyMode && (
                        <div className='flex flex-col justify-center items-center mb-7'>
                            <ActionButton className='mb-4 bg-gray-100/10 p-4 transition-all active:bg-gray-100/20' onClick={() => debounceAction(() => dispatch(setLocked(true)), 300)}>
                                <BiLockAlt className='text-base'/>
                            </ActionButton>
                            <p className='text-xs'>Lock</p>
                        </div>
                    )}
                    <div className='flex flex-col justify-center items-center mb-7'>
                        <ActionButton className='mb-4 bg-gray-100/10 p-4 transition-all active:bg-gray-100/20' onClick={() => switchModal('poweroff')}>
                            <FiPower className='text-base'/>
                        </ActionButton>
                        <p className='text-xs'>Power Off</p>
                    </div>
                    <div className='flex flex-col justify-center items-center mb-7'>
                        <ActionButton className='mb-4 bg-gray-100/10 p-4 transition-all active:bg-gray-100/20' onClick={() => switchModal('restart')}>
                            <GrRotateLeft className='text-base'/>
                        </ActionButton>
                        <p className='text-xs'>Restart</p>
                    </div>
                    {modal.emergencyMode && (
                        <div className='flex flex-col justify-center items-center mb-7'>
                            <ActionButton
                                className='mb-4 text-red-400 bg-red-400/10 p-3 transition-all active:bg-red-400/20'
                                onClick={() => {
                                    dispatch(displayPowerMenu(false));
                                    debounceAction(() => {
                                        dispatch(toggleEmergencyMode(false));
                                        dispatch(setPhoneNumber(911));
                                    }, 500);
                                }}>
                                <TbSos className='text-2xl'/>
                            </ActionButton>
                            <p className='text-xs'>Emergency SOS</p>
                        </div>
                    )}
                    <div className="flex justify-center items-center mt-14">
                        <ActionButton
                            className='bg-gray-100/10 p-4 transition-all active:bg-gray-100/20'
                            onClick={() => {
                                dispatch(displayPowerMenu(false));
                                dispatch(toggleEmergencyMode(false));
                            }}
                        >
                            <IoCloseOutline className='text-lg'/>
                        </ActionButton>
                    </div>
                </div>
            </div>
            <div className={twMerge('absolute px-12 flex flex-col items-center transition-all duration-200 opacity-0 pointer-events-none', modalType === 'poweroff' && 'opacity-100 pointer-events-auto')}>
                <ActionButton className='mb-8 bg-gray-100/10 p-5 transition-all active:bg-gray-100/20' onClick={() => debounceAction(powerOff, 500)}>
                    <FiPower className='text-xl'/>
                </ActionButton>
                <p className='mb-6 text-3xl font-bold'>Power off?</p>
                <p className='text-xs'>Click the button above to power off this system.</p>
                <ActionButton className='bg-gray-100/10 active:bg-gray-100/20 py-4 px-6 mt-20' onClick={() => switchModal('default')}>
                    <IoCloseOutline className='text-lg mr-1'/>
                    <p className='text-xs'>Cancel</p>
                </ActionButton>
            </div>
            <div className={twMerge('absolute px-12 flex flex-col items-center transition-all duration-200 opacity-0 pointer-events-none', modalType === 'restart' && 'opacity-100 pointer-events-auto')}>
                <ActionButton className='mb-8 bg-gray-100/10 p-5 transition-all active:bg-gray-100/20' onClick={() => debounceAction(restart, 500)}>
                    <GrRotateLeft className='text-xl'/>
                </ActionButton>
                <p className='mb-6 text-3xl font-bold'>Restart?</p>
                <p className='text-xs'>Click the button above to restart this system.</p>
                <ActionButton
                    className='bg-gray-100/10 active:bg-gray-100/20 py-4 px-6 mt-20'
                    onClick={() => switchModal('default')}
                >
                    <IoCloseOutline className='text-xl mr-1'/>
                    <p className='text-xs'>Cancel</p>
                </ActionButton>
            </div>
        </ModalBg>
    )
}
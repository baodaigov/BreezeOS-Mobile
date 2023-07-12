import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import modal, { displayPowerMenu } from '../../reducers/modal';
import ModalBg from '../../components/ModalBg';
import ActionButton from '../../components/ActionButton';
import { FiPower } from 'react-icons/fi';
import { GrRotateLeft } from 'react-icons/gr';
import { BiLockAlt } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { setBlank, setDefault, setLocked, displayScreenSplash } from '../../reducers/global';
import { twMerge } from 'tailwind-merge';
import { setHeaderActive } from '../../reducers/header';
import { setFooterActive } from '../../reducers/footer';

export default function PowerMenu(){
    const dispatch = useDispatch();
    const powerMenu = useSelector(state => state.modal.powermenu);
    const [modalType, setModalType] = useState('default');

    function debounceAction(action, duration){
        dispatch(displayPowerMenu(false));
        setTimeout(action, duration);
    }

    function switchModal(type){
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
            dispatch(setDefault(true));
        }, 11000);
    }

    function restart(){
        powerOff();
        setTimeout(() => {
            dispatch(setBlank(false));
        }, 17000);
        setTimeout(() => {
            dispatch(displayScreenSplash(false));
            dispatch(setHeaderActive(true));
            dispatch(setFooterActive(true));
        }, 28000);
    }

    return (
        <ModalBg active={powerMenu.active && true}>
            <div className={twMerge('absolute flex flex-col font-light transition-all duration-200 opacity-0 pointer-events-none', modalType === 'default' && 'opacity-100 pointer-events-auto')}>
                <p className='mb-10'>Choose an option:</p>
                <div className='flex flex-col justify-center'>
                    <div className='flex flex-col justify-center items-center mb-7'>
                        <ActionButton className='mb-3 bg-gray-100/5 p-4 transition-all active:bg-gray-100/10' onClick={() => debounceAction(() => dispatch(setLocked(true)), 300)}>
                            <BiLockAlt className='text-lg'/>
                        </ActionButton>
                        <p className='text-sm'>Lock</p>
                    </div>
                    <div className='flex flex-col justify-center items-center mb-7'>
                        <ActionButton className='mb-3 bg-gray-100/5 p-4 transition-all active:bg-gray-100/10' onClick={() => switchModal('poweroff')}>
                            <FiPower className='text-lg'/>
                        </ActionButton>
                        <p className='text-sm'>Power Off</p>
                    </div>
                    <div className='flex flex-col justify-center items-center mb-7'>
                        <ActionButton className='mb-3 bg-gray-100/5 p-4 transition-all active:bg-gray-100/10' onClick={() => switchModal('restart')}>
                            <GrRotateLeft className='text-lg'/>
                        </ActionButton>
                        <p className='text-sm'>Restart</p>
                    </div>
                    <div className="flex justify-center items-center mt-14">
                        <ActionButton className='bg-gray-100/5 p-4 transition-all active:bg-gray-100/10' onClick={() => dispatch(displayPowerMenu(false))}>
                            <IoCloseOutline className='text-xl'/>
                        </ActionButton>
                    </div>
                </div>
            </div>
            <div className={twMerge('absolute px-12 flex flex-col items-center font-light transition-all duration-200 opacity-0 pointer-events-none', modalType === 'poweroff' && 'opacity-100 pointer-events-auto')}>
                <ActionButton className='mb-8 bg-gray-100/5 p-5 transition-all active:bg-gray-100/10' onClick={() => debounceAction(powerOff, 500)}>
                    <FiPower className='text-2xl'/>
                </ActionButton>
                <p className='mb-6 text-4xl font-bold'>Power off?</p>
                <p className='text-xs'>Click the button above to power off this system.</p>
                <ActionButton className='bg-gray-100/5 active:bg-gray-100/10 py-4 px-6 mt-20' onClick={() => switchModal('default')}>
                    <IoCloseOutline className='text-xl mr-2'/>
                    <p className='text-sm'>Cancel</p>
                </ActionButton>
            </div>
            <div className={twMerge('absolute px-12 flex flex-col items-center font-light transition-all duration-200 opacity-0 pointer-events-none', modalType === 'restart' && 'opacity-100 pointer-events-auto')}>
                <ActionButton className='mb-8 bg-gray-100/5 p-5 transition-all active:bg-gray-100/10' onClick={() => debounceAction(restart, 500)}>
                    <GrRotateLeft className='text-2xl'/>
                </ActionButton>
                <p className='mb-6 text-4xl font-bold'>Restart?</p>
                <p className='text-xs'>Click the button above to restart this system.</p>
                <ActionButton className='bg-gray-100/5 active:bg-gray-100/10 py-4 px-6 mt-20' onClick={() => switchModal('default')}>
                    <IoCloseOutline className='text-xl mr-2'/>
                    <p className='text-sm'>Cancel</p>
                </ActionButton>
            </div>
        </ModalBg>
    )
}
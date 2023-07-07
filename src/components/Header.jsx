import { useSelector, useDispatch } from 'react-redux';
import { setVolume } from '../reducers/settings';
import { setPanelActive } from '../reducers/panel';
import BatteryLevel from './BatteryLevel';
import BatteryIcon from './BatteryIcon';
import Status from './Status';
import Time from './Time';
import RangeSlider from './RangeSlider';
import { twMerge } from 'tailwind-merge';
import { FaVolumeUp } from 'react-icons/fa';
import { VscChevronUp } from 'react-icons/vsc';
import { FiPower } from 'react-icons/fi';
import { HiOutlineSun } from 'react-icons/hi';
import Hammer from '@win11react/react-hammerjs';
import VolumeAdjustSound from '../sounds/Oxygen-Sys-Special.mp3';

export default function Header({ className }){
    const dispatch = useDispatch();
    const headerStyle = useSelector(state => state.header.style);
    const panelActive = useSelector(state => state.panel.active);
    const settings = useSelector(state => state.settings);

    function powerOff(){
        dispatch(setPanelActive(false));
    }

    return (
        <Hammer onSwipeDown={() => dispatch(setPanelActive(true))} direction='DIRECTION_DOWN'>
            <div className={twMerge(`flex flex-col absolute top-0 w-full h-8 text-xs text-center font-normal duration-[250ms] ${headerStyle}`, panelActive && 'z-10 bg-gray-950 text-gray-100 h-screen transition-[height] duration-200')}>
                <div className='flex justify-between items-center py-1 px-3'>
                    <div className='flex items-center'>
                        <Time className='mr-2'/>
                    </div>
                    <Status onClick={() => dispatch(setPanelActive(true))}/>
                </div>
                <Hammer onSwipeUp={() => dispatch(setPanelActive(false))} direction='DIRECTION_UP'>
                    <div className={`py-4 px-6 flex flex-col justify-between h-full text-gray-50 opacity-0 pointer-events-none transition-all duration-[250ms] ${panelActive && 'opacity-100 pointer-events-auto'}`}>
                        <div className='flex flex-col'>
                            <div className='flex justify-between items-center w-full mb-10'>
                                <div className='flex items-center'>
                                    <BatteryIcon className='mr-2 text-base'/>
                                    <BatteryLevel/>
                                </div>
                                <div className='flex justify-center items-center rounded-full p-2 text-sm hover:bg-gray-100 hover:bg-opacity-10' onClick={powerOff}>
                                    <FiPower/>
                                </div>
                            </div>
                            <div className='flex flex-col mb-3'>
                                <div className='flex items-center mb-8'>
                                    <FaVolumeUp className='mr-4 text-lg'/>
                                    <RangeSlider value={settings.volume} min='0' max='100' onClick={() => new Audio(VolumeAdjustSound).play()} onInput={e => dispatch(setVolume(e.target.value))}/>
                                </div>
                                <div className='flex items-center'>
                                    <HiOutlineSun className='mr-4 text-lg'/>
                                    <RangeSlider/>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center w-full text-2xl mb-2'>
                            <VscChevronUp/>
                        </div>
                    </div>
                </Hammer>
            </div>
        </Hammer>
    )
}
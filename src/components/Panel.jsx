import { useSelector, useDispatch } from 'react-redux';
import { setLocked } from '../reducers/global';
import { setPanelActive } from '../reducers/panel';
import { setVolume, setNightShift, setBoldText, setDarkMode, setWifi, setAirplaneMode, setBluetooth, setBrightness } from '../reducers/settings';
import RangeSlider from './RangeSlider';
import { twMerge } from 'tailwind-merge';
import { FaVolumeUp } from 'react-icons/fa';
import { FaCircleHalfStroke } from 'react-icons/fa6';
import { VscChevronUp } from 'react-icons/vsc';
import { FiPower, FiSun, FiWifi, FiBluetooth } from 'react-icons/fi';
import { GoChevronRight } from 'react-icons/go';
import { HiOutlineSun } from 'react-icons/hi';
import { IoAirplane } from 'react-icons/io5';
import { TbLetterB } from 'react-icons/tb';
import { BiLockAlt } from 'react-icons/bi';
import TimeObjObj from './TimeObj';
import Hammer from '@win11react/react-hammerjs';
import VolumeAdjustSound from '../sounds/Oxygen-Sys-Special.mp3';
import './PanelItem.scss';
import BatteryIcon from './BatteryIcon';
import BatteryLevel from './BatteryLevel';
import ActionButton from './ActionButton';
import { displayPowerMenu } from '../reducers/modal';

export default function Panel(){
    const dispatch = useDispatch();
    const panelActive = useSelector(state => state.panel.active);
    const settings = useSelector(state => state.settings);

    function debounceAction(action, duration){
        dispatch(setPanelActive(false));
        setTimeout(() => dispatch(action), duration);
    }

    const PanelItem = ({ children, active, className, onClick }) => {
        return (
            <div className={twMerge(`overflow-hidden p-5 mr-3 mb-4 even:mr-0 rounded-full flex items-center w-48 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-900 font-bold text-sm dark:hover:bg-gray-800 dark:text-gray-100`, active && 'bg-[#83aaff] text-gray-900 hover:bg-[#a4c1ff] dark:bg-[#83aaff] dark:text-gray-900 dark:hover:bg-[#a4c1ff]', className)} onClick={onClick}>
                {children}
            </div>
        )
    }

    return (
        <div className={twMerge('text-xs bg-white/95 backdrop-blur-sm absolute bottom-[100vh] z-20 py-4 px-6 pb-0 flex flex-col justify-between h-full text-gray-800 dark:bg-gray-950/90 dark:text-gray-50 transition-all duration-200', panelActive && 'bottom-0')}>
            <div className='flex flex-col'>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center'>
                        <BatteryIcon className='mr-1 text-base'/>
                        <BatteryLevel/>
                        <div className='h-4 w-[0.5px] bg-gray-100 mx-2'></div>
                        <TimeObjObj/>
                    </div>
                    <div className='flex items-center'>
                        <ActionButton className='p-2 mr-1 active:bg-gray-900/10 dark:active:bg-gray-100/10' onClick={() => debounceAction(setLocked(true), 300)}>
                            <BiLockAlt className='text-base'/>
                        </ActionButton>
                        <ActionButton className='p-2 active:bg-gray-900/10 dark:active:bg-gray-100/10' onClick={() => debounceAction(displayPowerMenu(true), 300)}>
                            <FiPower className='text-base'/>
                        </ActionButton>
                    </div>
                </div>
                <div className='flex flex-col py-8 border-solid border-b border-b-gray-200 dark:border-b-gray-900'>
                    <div className='flex items-center mb-8'>
                        <FaVolumeUp className='mr-4 text-lg'/>
                        <RangeSlider value={settings.volume} min={0} max={100} onClick={() => new Audio(VolumeAdjustSound).play()} onInput={e => dispatch(setVolume(e.target.value))}/>
                    </div>
                    <div className='flex items-center'>
                        <HiOutlineSun className='mr-4 text-lg'/>
                        <RangeSlider value={settings.brightness} min={15} max={100} onInput={e => dispatch(setBrightness(e.target.value))}/>
                    </div>
                </div>
                <div className='flex flex-wrap justify-between items-center py-8'>
                    <PanelItem active={settings.nightShift && true} onClick={() => dispatch(setNightShift(!settings.nightShift))}>
                        <FiSun className='text-base mr-2'/>
                        <p>Night Shift</p>
                    </PanelItem>
                    <PanelItem active={settings.wifi && true} className={`p-0 [&:hover_#panelitemnext]:bg-[#bbd0ff] ${!settings.wifi && '[&:hover_#panelitemnext]:bg-zinc-400 dark:[&:hover_#panelitemnext]:bg-gray-700'}`}>
                        <div className='flex items-center p-5 w-40' onClick={() => dispatch(setWifi(!settings.wifi))}>
                            <FiWifi className='text-base mr-2'/>
                            <div className={`relative transition duration-200 ${settings.wifi && '-translate-y-2'}`}>
                                <p className={settings.wifi && 'font-normal text-xs'}>Wi-Fi</p>
                                <p className={`absolute text-base leading-none font-bold opacity-0 ${settings.wifi && 'opacity-100'}`}>BreezeOS</p>
                            </div>
                        </div>
                        <div className={twMerge('bg-[#a4c1ff] py-5 px-3 flex justify-center items-center text-xl', !settings.wifi && 'bg-gray-300 dark:bg-gray-800')} id='panelitemnext'>
                            <GoChevronRight/>
                        </div>
                    </PanelItem>
                    <PanelItem active={settings.airplaneMode && true} onClick={() => dispatch(setAirplaneMode(!settings.airplaneMode))}>
                        <IoAirplane className='text-base mr-2'/>
                        <p>Airplane Mode</p>
                    </PanelItem>
                    <PanelItem active={settings.darkMode && true} onClick={() => dispatch(setDarkMode(!settings.darkMode))}>
                        <FaCircleHalfStroke className='text-base mr-2'/>
                        <p>Dark Mode</p>
                    </PanelItem>
                    <PanelItem active={settings.bluetooth && true} className={`p-0 [&:hover_#panelitemnext]:bg-[#bbd0ff] ${!settings.bluetooth && '[&:hover_#panelitemnext]:bg-zinc-400 dark:[&:hover_#panelitemnext]:bg-gray-700'}`}>
                        <div className='flex items-center p-5 w-40' onClick={() => dispatch(setBluetooth(!settings.bluetooth))}>
                            <FiBluetooth className='text-base mr-2'/>
                            <p>Bluetooth</p>
                        </div>
                        <div className={twMerge('bg-[#a4c1ff] py-5 px-3 flex justify-center items-center text-xl', !settings.bluetooth && 'bg-gray-300 dark:bg-gray-800')} id='panelitemnext'>
                            <GoChevronRight/>
                        </div>
                    </PanelItem>
                    <PanelItem active={settings.boldText && true} onClick={() => dispatch(setBoldText(!settings.boldText))}>
                        <TbLetterB className='text-base mr-2'/>
                        <p>Bold Text</p>
                    </PanelItem>
                </div>
            </div>
            <Hammer onSwipeUp={() => dispatch(setPanelActive(false))} direction='DIRECTION_UP'>
                <div className='flex justify-center w-full text-2xl mb-3'>
                    <ActionButton className='p-1 active:bg-gray-900/10 dark:active:bg-gray-100/10' onClick={() => dispatch(setPanelActive(false))}>
                        <VscChevronUp/>
                    </ActionButton>
                </div>
            </Hammer>
        </div>
    )
}
import { useSelector, useDispatch } from 'react-redux';
import { setLocked } from '../reducers/global';
import { setPanelActive } from '../reducers/panel';
import { setVolume, setNightShiftActive, setBoldText, setDarkMode, setWifi, setAirplaneMode, setBluetooth, setBrightness, toggleBatterySaver } from '../reducers/settings';
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
import { PiLeafBold } from 'react-icons/pi';
import TimeObjObj from './TimeObj';
import Hammer from '@win11react/react-hammerjs';
import VolumeAdjustSound from '../sounds/Oxygen-Sys-Special.mp3';
import BatteryIcon from './BatteryIcon';
import BatteryLevel from './BatteryLevel';
import ActionButton from './ActionButton';
import { displayPowerMenu } from '../reducers/modal';

export default function Panel(){
    const dispatch = useDispatch();
    const panelActive = useSelector(state => state.panel.active);
    const settings = useSelector(state => state.settings);
    const battery = useSelector(state => state.settings.battery);

    function debounceAction(action, duration){
        dispatch(setPanelActive(false));
        setTimeout(() => dispatch(action), duration);
    }

    const PanelItem = ({ icon, label, active, onClick }) => {
        return (
            <div className='flex flex-col items-center text-center mx-2 mb-10'>
                <div className={twMerge('rounded-full p-4 mb-3 flex justify-center items-center text-base transition-all bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800', active && 'bg-[#83aaff] text-gray-800 hover:bg-[#aac5ff] dark:bg-[#83aaff] dark:hover:bg-[#aac5ff] dark:text-gray-800')} onClick={onClick}>
                    {icon}
                </div>
                <p>{label}</p>
            </div>
        )
    }

    const panelItems = [
        {
            icon: <FiSun/>,
            label: 'Night Shift',
            active: settings.nightShift.active,
            onClick: () => dispatch(setNightShiftActive(!settings.nightShift.active)),
        },
        {
            icon: <FiWifi/>,
            label: settings.wifi ? 'BreezeOS' : 'Wi-Fi',
            active: settings.wifi,
            onClick: () => dispatch(setWifi(!settings.wifi)),
        },
        {
            icon: <IoAirplane/>,
            label: 'Airplane Mode',
            active: settings.airplaneMode,
            onClick: () => dispatch(setAirplaneMode(!settings.airplaneMode)),
        },
        {
            icon: <FaCircleHalfStroke/>,
            label: 'Dark Mode',
            active: settings.darkMode,
            onClick: () => dispatch(setDarkMode(!settings.darkMode)),
        },
        {
            icon: <FiBluetooth/>,
            label: 'Bluetooth',
            active: settings.bluetooth,
            onClick: () => dispatch(setBluetooth(!settings.bluetooth)),
        },
        {
            icon: <TbLetterB/>,
            label: 'Bold Text',
            active: settings.boldText,
            onClick: () => dispatch(setBoldText(!settings.boldText)),
        },
        {
            icon: <PiLeafBold/>,
            label: 'Battery Saver',
            active: battery.batterySaver,
            onClick: () => dispatch(toggleBatterySaver(!battery.batterySaver)),
        },
    ];

    return <>
        <div className={twMerge('text-xs bg-white/95 backdrop-blur-sm absolute bottom-full z-20 py-4 px-6 pb-0 flex flex-col justify-between w-full h-full text-gray-800 dark:bg-gray-950/90 dark:text-gray-50 opacity-0 pointer-events-none transition-all duration-200', panelActive && 'bottom-0 opacity-100 pointer-events-auto')}>
            <div className='flex flex-col'>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center'>
                        <BatteryIcon className='mr-1 text-sm'/>
                        <BatteryLevel/>
                        <div className='h-4 w-[0.5px] bg-gray-900 dark:bg-gray-100 mx-2'></div>
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
                <div className='grid grid-cols-3 py-8'>
                    {panelItems.map(i => (
                        <PanelItem key={Math.random()} {...i}/>
                    ))}
                </div>
            </div>
            <Hammer onSwipeUp={() => dispatch(setPanelActive(false))} direction='DIRECTION_UP'>
                <div className='relative bottom-0 flex justify-center w-full text-2xl px-6 mb-3'>
                    <ActionButton className='p-1 active:bg-gray-900/10 dark:active:bg-gray-100/10' onClick={() => dispatch(setPanelActive(false))}>
                        <VscChevronUp/>
                    </ActionButton>
                </div>
            </Hammer>
        </div>
    </>
}
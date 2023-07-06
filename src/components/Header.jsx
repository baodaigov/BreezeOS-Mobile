import { useSelector, useDispatch } from 'react-redux';
import { setStyle } from '../reducers/header';
import { setPanelActive } from '../reducers/panel';
import Status from './Status'
import Time from './Time'
import { twMerge } from 'tailwind-merge';

export default function Header({ className }){
    const headerStyle = useSelector(state => state.header.style);
    const panelActive = useSelector(state => state.panel.active);
    const dispatch = useDispatch();

    return (
        <div className={twMerge(`flex flex-col absolute top-0 w-full h-8 text-xs text-center font-normal ${headerStyle}`, panelActive && 'h-screen bg-gray-950 text-gray-50 transition-[height] duration-200')}>
            <div className='flex justify-between items-center py-2 px-3' onClick={() => dispatch(setPanelActive(!panelActive))}>
                <Time/>
                <Status/>
            </div>
        </div>
    )
}
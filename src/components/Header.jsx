import { useSelector, useDispatch } from 'react-redux';
import { setPanelActive } from '../reducers/panel';
import Status from './Status';
import Time from './Time';
import Hammer from '@win11react/react-hammerjs';

export default function Header({ className }){
    const dispatch = useDispatch();
    const headerStyle = useSelector(state => state.header.style);

    return (
        <Hammer onSwipeDown={() => dispatch(setPanelActive(true))} direction='DIRECTION_DOWN'>
            <div className={`flex flex-col absolute top-0 w-full h-8 text-xs text-center font-normal ${headerStyle}`}>
                <div className='flex justify-between items-center py-1 px-3'>
                    <div className='flex items-center'>
                        <Time className='mr-2'/>
                    </div>
                    <Status onClick={() => dispatch(setPanelActive(true))}/>
                </div>
            </div>
        </Hammer>
    )
}
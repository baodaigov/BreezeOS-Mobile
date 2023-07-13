import { useSelector, useDispatch } from 'react-redux';
import { setPanelActive } from '../reducers/panel';
import Status from './Status';
import TimeObj from './TimeObj';
import Hammer from '@win11react/react-hammerjs';
import ActionButton from './ActionButton';
import { FiCircle } from 'react-icons/fi';

export default function Header({ className }){
    const dispatch = useDispatch();
    const header = useSelector(state => state.header);

    return (
        <>
            {header.active && (
                <Hammer onSwipeDown={() => dispatch(setPanelActive(true))} direction='DIRECTION_DOWN'>
                    <div className={`flex flex-col absolute top-0 w-full h-8 text-xs text-center ${header.style}`}>
                        <div className='flex justify-between items-center py-1 px-3'>
                            <div className='flex items-center'>
                                {header.displayMenu && (
                                    <ActionButton className='p-[6px] mr-1 active:bg-gray-100/10'>
                                        <FiCircle/>
                                    </ActionButton>
                                )}
                                <TimeObj className='mr-2'/>
                            </div>
                            <Status onClick={() => dispatch(setPanelActive(true))}/>
                        </div>
                    </div>
                </Hammer>
            )}
        </>
    )
}
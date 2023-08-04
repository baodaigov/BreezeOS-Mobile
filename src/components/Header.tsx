import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPanelActive } from '../store/reducers/panel';
import Panel from './Panel';
import Status from './Status';
import TimeObj from './TimeObj';
import Hammer from 'react-hammerjs';
import ActionButton from './ActionButton';
import { FiCircle } from 'react-icons/fi';

export default function Header(){
    const dispatch = useAppDispatch();
    const header = useAppSelector(state => state.header);

    return (
        <>
            {header.active && (
                <>
                    <Panel/>
                    <Hammer onSwipeDown={() => dispatch(setPanelActive(true))} direction='DIRECTION_DOWN'>
                        <div className={`z-20 absolute top-0 flex flex-col w-full text-xs text-center ${header.style}`}>
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
                </>
            )}
        </>
    )
}
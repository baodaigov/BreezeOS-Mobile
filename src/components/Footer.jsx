import { useSelector, useDispatch } from 'react-redux';
import { FiCircle } from 'react-icons/fi';
import ActionButton from './ActionButton';
import { setMenuActive } from '../reducers/menu';
import Menu from "./Menu";

export default function Footer(){
    const dispatch = useDispatch();
    const footer = useSelector(state => state.footer);
    const menuActive = useSelector(state => state.menu.active);

    return (
        <>
            <Menu/>
            {footer.active && (
                <div className='z-10 absolute bottom-0 flex flex-col w-full text-gray-100'>
                    <div className='flex justify-center bg-gradient-to-b from-transparent to-black/30 px-5 text-base'>
                        <div className='mb-2'>
                            <ActionButton className='p-2 active:bg-gray-100/10' onClick={() => dispatch(setMenuActive(!menuActive))}>
                                <FiCircle/>
                            </ActionButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
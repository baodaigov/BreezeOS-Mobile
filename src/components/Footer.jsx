import { useSelector, useDispatch } from 'react-redux';
import { FiCircle, FiMenu } from 'react-icons/fi';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { setHome } from '../reducers/home';
import ActionButton from './ActionButton';

export default function Footer(){
    const dispatch = useDispatch();
    const isHome = useSelector(state => state.home.isHome);
    const footer = useSelector(state => state.home.footer);

    return (
        <div className='absolute bottom-0 w-full flex justify-center bg-gradient-to-b from-transparent to-[#03071269] px-5 text-gray-100 text-lg'>
            <div className='mb-3'>
                <ActionButton>
                    <FiCircle/>
                </ActionButton>
            </div>
        </div>
    )
}
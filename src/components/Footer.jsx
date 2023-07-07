import { useSelector, useDispatch } from 'react-redux';
import { FiCircle, FiMenu } from 'react-icons/fi';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { setHome } from '../reducers/home';

export default function Footer(){
    const dispatch = useDispatch();
    const isHome = useSelector(state => state.home.isHome);
    const footer = useSelector(state => state.home.footer);

    return (
        <div className='absolute bottom-0 w-full flex justify-center bg-gradient-to-b from-transparent to-[#03071269] px-5 text-gray-100 text-lg'>
            <div className='mb-2 p-1 rounded-full flex justify-center items-center transition-all duration-200 active:bg-gray-100 active:bg-opacity-10 active:transition-none' onClick={() => isHome ? null : dispatch(setHome(true))}>
                <FiCircle/>
            </div>
        </div>
    )
}
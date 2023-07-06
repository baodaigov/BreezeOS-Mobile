import { FiCircle, FiMenu } from 'react-icons/fi';
import { HiOutlineChevronLeft } from 'react-icons/hi'

export default function Footer(){
    return (
        <div className='absolute bottom-0 w-full flex justify-around bg-gradient-to-b from-transparent to-[#03071269] px-5 text-gray-100 text-lg'>
            <div className='mb-2 p-1 rounded-full flex justify-center items-center transition-all duration-200 active:bg-gray-100 active:bg-opacity-20'>
                <FiMenu/>
            </div>
            <div className='mb-2 p-1 rounded-full flex justify-center items-center transition-all duration-200 active:bg-gray-100 active:bg-opacity-20'>
                <FiCircle/>
            </div>
            <div className='mb-2 p-1 rounded-full flex justify-center items-center transition-all duration-200 active:bg-gray-100 active:bg-opacity-20'>
                <HiOutlineChevronLeft/>
            </div>
        </div>
    )
}
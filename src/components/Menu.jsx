import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMenuActive } from '../reducers/menu';
import { setKeyboardActive } from '../reducers/keyboard';
import { twMerge } from "tailwind-merge";

export default function Menu(){
    const dispatch = useDispatch();
    const menu = useSelector(state => state.menu);
    const keyboard = useSelector(state => state.keyboard);
    const apps = useSelector(state => state.global.apps);
    const wallpaper = useSelector(state => state.global.wallpaper);
    const [searchQuery, setSearchQuery] = useState('');

    const openApp = (action) => {
        dispatch(setMenuActive(false));
        return () => action;
    }

    const App = ({ icon, name }) => {
        return (
            <div className='flex flex-col text-center items-center mb-12 [&:active_#imgapp]:brightness-75' onClick={() => openApp(dispatch(setKeyboardActive(!keyboard.active)))}>
                <img width={48} height={48} src={icon} id='imgapp'/>
                <p className='font-light text-xs mt-2'>{name}</p>
            </div>
        )
    }

    const filterData = apps.filter(app => {
        if (searchQuery === '') {
            return app;
        } else {
            return app.name.toLowerCase().includes(searchQuery);
        }
    });

    return (
        <div className={twMerge('z-10 absolute bg-center bg-no-repeat bg-cover h-screen w-full opacity-0 pointer-events-none transition-all ease-in', menu.active && 'opacity-100 pointer-events-auto')} style={{ backgroundImage: `url(${wallpaper})`}}>
            <div className='h-screen bg-black/60 text-gray-100 backdrop-blur-lg pb-16 flex flex-col'>
                <div className='flex justify-center w-full px-6 py-8 font-light relative bottom-0'>
                    <input className='appearance-none border-none outline-none py-3 px-5 bg-white/5 flex items-center rounded-full text-xs w-56 text-gray-100 transition-all duration-300 placeholder:text-gray-100/20 focus:w-80' placeholder='Search...' value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
                </div>
                <div className='p-5 flex flex-col'>
                    <div className='grid grid-cols-4 justify-between'>
                        {filterData.map(e => (
                            <App icon={e.icon} name={e.name} key={Math.random()}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
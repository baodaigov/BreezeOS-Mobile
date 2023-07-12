import { useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

export default function Menu(){
    const menu = useSelector(state => state.menu);
    const apps = useSelector(state => state.global.apps);
    const wallpaper = useSelector(state => state.global.wallpaper);
    const [searchQuery, setSearchQuery] = useState('');

    const App = ({ icon, name }) => {
        return (
            <div className='mx-3 mb-8 p-2 flex flex-col items-center'>
                <img width={52} height={52} src={icon}/>
                <p className='font-light text-sm mt-4'>{name}</p>
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
            <div className='h-screen bg-black/60 text-gray-100 backdrop-blur-lg px-5 py-12 pb-16 flex flex-col justify-between'>
                <div className='flex flex-wrap justify-center items-center'>
                    {filterData.map(e => (
                        <App icon={e.icon} name={e.name} key={Math.random()}/>
                    ))}
                </div>
                <div className='flex justify-center w-full px-6 mt-4 font-light'>
                    <input className='appearance-none border-none outline-none py-3 px-5 bg-white/5 flex items-center rounded-full text-xs w-56 text-gray-100 transition-all duration-300 placeholder:text-gray-100/20 focus:w-80' placeholder='Search...' value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
                </div>
            </div>
        </div>
    )
}
import { useSelector } from "react-redux";
import Wallpaper from "./components/Wallpaper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Panel from "./components/Panel";

export default function App() {
    const darkMode = useSelector(state => state.settings.darkMode);

    return (
        <div className={`${darkMode ? 'dark' : ''} h-screen w-full max-w-md select-none cursor-default`}>
            <div className='relative h-full'>
                <Wallpaper />
                <div className='absolute top-0 overflow-hidden h-full w-full flex flex-col'>
                    <Header/>
                    <Panel/>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}
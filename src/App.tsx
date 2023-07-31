import { useSelector } from "react-redux";
import Wallpaper from "./components/Wallpaper";
import Header from "./components/Header";
import ModalContainer from "./components/ModalContainer";
import Footer from "./components/Footer";
import LockScreen from "./components/LockScreen";
import BrightnessOverlay from './components/BrightnessOverlay';
import SplashScreen from './components/SplashScreen';
import NightShiftOverlay from "./components/NightShiftOverlay";
import AppsContainer from './components/AppsContainer';

export default function App() {
    const settings: any = useSelector<any>(state => state.settings);
    const global: any = useSelector<any>(state => state.global);

    return (
        <>
            {!global.isBlank && (
                <div className={`${settings.darkMode ? 'dark' : ''} overflow-hidden h-screen w-full max-w-md select-none cursor-default ${settings.boldText ? 'font-semibold' : 'font-light'}`}>
                    <div className='relative h-screen'>
                        <SplashScreen/>
                        <NightShiftOverlay/>
                        <BrightnessOverlay/>
                        <LockScreen/>
                        <div className='absolute top-0 h-screen w-full flex flex-col'>
                            <Wallpaper/>
                            {!global.recentTasks.active && <Header/>}
                            {!global.recentTasks.active && <ModalContainer/>}
                            <AppsContainer/>
                            <Footer/>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
import { useSelector } from "react-redux";
import Wallpaper from "./components/Wallpaper";
import Header from "./components/Header";
import ModalContainer from "./components/ModalContainer";
import Footer from "./components/Footer";
import LockScreen from "./components/LockScreen";
import BrightnessOverlay from './components/BrightnessOverlay';
import SplashScreen from './components/SplashScreen';
import NightShiftOverlay from "./components/NightShiftOverlay";

export default function App() {
    const settings = useSelector(state => state.settings);
    const blankScr = useSelector(state => state.global.isBlank);

    return (
        <>
            {!blankScr && (
                <div className={`${settings.darkMode ? 'dark' : ''} h-screen w-full max-w-md select-none cursor-default ${settings.boldText ? 'font-semibold' : 'font-light'}`}>
                    <div className='relative h-screen'>
                        <SplashScreen/>
                        <NightShiftOverlay/>
                        <BrightnessOverlay/>
                        <LockScreen/>
                        <Wallpaper/>
                        <div className='absolute top-0 overflow-hidden h-screen w-full flex flex-col'>
                            <Header/>
                            <ModalContainer/>
                            <Footer/>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
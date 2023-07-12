import { useSelector } from "react-redux";
import Wallpaper from "./components/Wallpaper";
import Header from "./components/Header";
import ModalContainer from "./components/ModalContainer";
import Footer from "./components/Footer";
import LockScreen from "./components/LockScreen";
import BrightnessOverlay from './components/BrightnessOverlay';
import SplashScreen from './components/SplashScreen';

export default function App() {
    const darkMode = useSelector(state => state.settings.darkMode);
    const blankScr = useSelector(state => state.global.isBlank);

    return (
        <>
            {!blankScr && (
                <div className={`${darkMode ? 'dark' : ''} h-screen w-full max-w-md select-none cursor-default`}>
                    <div className='relative h-screen'>
                        <SplashScreen/>
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
import Wallpaper from "./components/Wallpaper";
import Header from "./components/Header";
import ModalContainer from "./components/ModalContainer";
import Footer from "./components/Footer";
import LockScreen from "./components/LockScreen";
import BrightnessOverlay from "./components/BrightnessOverlay";
import SplashScreen from "./components/SplashScreen";
import NightShiftOverlay from "./components/NightShiftOverlay";
import AppsContainer from "./components/AppsContainer";
import { useAppSelector } from "./store/hooks";

export default function App() {
  const settings = useAppSelector((state) => state.settings);
  const global = useAppSelector((state) => state.global);

  return (
    <>
      {!global.isBlank && (
        <div
          className={`${
            settings.darkMode ? "dark" : ""
          } h-screen w-full max-w-md cursor-default select-none overflow-hidden ${
            settings.boldText ? "font-semibold" : "font-light"
          }`}
        >
          <div className="relative h-screen">
            <SplashScreen />
            <NightShiftOverlay />
            <BrightnessOverlay />
            <LockScreen />
            <div className="absolute top-0 flex h-screen w-full flex-col">
              <Wallpaper />
              {!global.recentTasks.active && <Header />}
              {!global.recentTasks.active && <ModalContainer />}
              <AppsContainer />
              <Footer />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import PowerMenu from '../containers/modal/PowerMenu.tsx';
import UnsuitablePlatform from '../containers/modal/UnsuitablePlatform';
import LowBattery from '../containers/modal/LowBattery.tsx';
import BatteryNotFound from '../containers/modal/BatteryNotFound';

export default function ModalContainer(){
    return (
        <>
            <PowerMenu/>
            <UnsuitablePlatform/>
            <LowBattery/>
            <BatteryNotFound/>
        </>
    )
}
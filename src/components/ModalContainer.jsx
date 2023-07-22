import PowerMenu from '../containers/modal/PowerMenu';
import UnsuitablePlatform from '../containers/modal/UnsuitablePlatform';
import LowBattery from '../containers/modal/LowBattery';

export default function ModalContainer(){
    return (
        <>
            <PowerMenu/>
            <UnsuitablePlatform/>
            <LowBattery/>
        </>
    )
}
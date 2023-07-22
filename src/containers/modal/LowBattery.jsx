import { useSelector, useDispatch } from 'react-redux';
import ModalBg from '../../components/ModalBg';
import Modal from '../../components/Modal';
import { displayLowBatteryMenu } from '../../reducers/modal';
import { toggleBatterySaver } from '../../reducers/settings';
import { useEffect } from 'react';

export default function LowBattery(){
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal.lowbattery);
    const battery = useSelector(state => state.settings.battery);

    useEffect(() => {
        if(battery.level <= 10){
            dispatch(displayLowBatteryMenu(true));
        } else {
            dispatch(displayLowBatteryMenu(false));
        }
    }, [battery]);

    return (
        <ModalBg active={modal.active}>
            <Modal
                title={`Battery low: ${battery.level}%`}
                description='You may need to connect your phone to a power source to continue using.'
                buttons={
                    [
                        {
                            value: 'Toggle battery saver',
                            disabled: battery.batterySaver ? true : false,
                            action: () => {
                                dispatch(toggleBatterySaver(true));
                                dispatch(displayLowBatteryMenu(false))
                            }
                        },
                        {
                            value: 'OK',
                            action: () => dispatch(displayLowBatteryMenu(false))
                        }
                    ]
                }
            />
        </ModalBg>
    )
}
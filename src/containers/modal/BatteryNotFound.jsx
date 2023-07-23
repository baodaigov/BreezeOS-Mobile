import { useSelector, useDispatch } from 'react-redux';
import ModalBg from '../../components/ModalBg';
import Modal from '../../components/Modal';
import { displayBatteryNotFoundMenu } from '../../reducers/modal';

export default function BatteryNotFound(){
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal.batterynotfound);

    return (
        <ModalBg active={modal.active}>
            <Modal
                title='Battery not found'
                description="Make sure that the platform you're using allows BreezeOS to collect battery status."
                buttons={
                    [
                        {
                            value: 'OK',
                            action: () => dispatch(displayBatteryNotFoundMenu(false))
                        }
                    ]
                }
            />
        </ModalBg>
    )
}
import { useSelector, useDispatch } from 'react-redux';
import ModalBg from '../../components/ModalBg';
import Modal from '../../components/Modal';
import { displayPlatformMenu } from '../../reducers/modal';

export default function PowerMenu(){
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal.platform);

    return (
        <ModalBg active={modal.active}>
            <Modal
                title='Unsuitable platform'
                description='For full experiences, we recommend you to switch to a different platform.'
                buttons={
                    [
                        {
                            value: 'OK',
                            action: () => dispatch(displayPlatformMenu(false))
                        }
                    ]
                }
            />
        </ModalBg>
    )
}
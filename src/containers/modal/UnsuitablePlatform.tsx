import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ModalBg from '../../components/ModalBg';
import Modal from '../../components/Modal';
import { displayPlatformMenu } from '../../store/reducers/modal';

export default function UnsuitablePlatform(){
    const dispatch = useAppDispatch();
    const modal = useAppSelector(state => state.modal.platform);

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    useEffect(() => {
        if(isSafari){
            dispatch(displayPlatformMenu(true));
        } else {
            dispatch(displayPlatformMenu(false));
        }
    }, []);

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
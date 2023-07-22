import { useSelector, useDispatch } from 'react-redux';
import ModalBg from '../../components/ModalBg';
import Modal from '../../components/Modal';
import { displayPlatformMenu } from '../../reducers/modal';
import { useEffect } from 'react';

export default function UnsuitablePlatform(){
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal.platform);

    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

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
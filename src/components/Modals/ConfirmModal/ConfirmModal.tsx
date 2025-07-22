import { createPortal } from 'react-dom';
import './ConfirmModal.scss';

type Props = {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({message, onConfirm, onCancel}:Props) {
    const confirmModalRoot = document.getElementById('confirm-modal-root');

    if (!confirmModalRoot) return null;

    return createPortal(
        <div className='confirm-modal'>
            <div className='confirm-modal__container'>
                <p className='confirm-modal__message'>{message}</p>
                <div className='confirm-modal__buttons'>
                    <button className='confirm-modal__buttons--cancel' onClick={onCancel}>Cancel</button>
                    <button className='confirm-modal__buttons--confirm' onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>, 
        confirmModalRoot
    );
}
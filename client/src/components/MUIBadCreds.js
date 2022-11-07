import { useContext } from 'react'
import * as React from 'react';
import Modal from '@mui/material/Modal';
import AuthContext from '../auth';
import { Alert } from '@mui/material';

export default function MUIBadCredsModal() {
    const { auth } = useContext(AuthContext);

    return (
        <Modal
            open={auth.isBadCredsModalOpen()}
        >
            <Alert severity="warning"
                onClose={() => {
                    auth.hideBadCredsModal();
                }}>
                    Please fill in all the fields.
            </Alert>
        </Modal>
    );
}
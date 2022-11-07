import { useContext } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthContext from '../auth';
import { Alert } from '@mui/material';

export default function MUIBadLoginModal() {
    const { auth } = useContext(AuthContext);

    return (
        <Modal
            open={auth.isBadLoginModalOpen()}
        >
            <Alert severity="warning"
                onClose={() => {
                    auth.hideBadLoginModal();
                }}>
                Incorrect login credentials. Please try again.
            </Alert>
        </Modal>
    );
}
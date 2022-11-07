import { useContext } from 'react'
import * as React from 'react';
import Modal from '@mui/material/Modal';
import AuthContext from '../auth';
import { Alert } from '@mui/material';

export default function MUIBadSignupModal() {
    const { auth } = useContext(AuthContext);

    return (
        <Modal
            open={auth.isBadSignupModalOpen()}
        >
            <Alert severity="warning"
                onClose={() => {
                    auth.hideBadSignupModal();
                }}>
                Incorrect sign-up credentials. Please make sure your password is at least 8 characters and your email isn't already registered.
            </Alert>
        </Modal>
    );
}
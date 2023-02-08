import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './giftPopupmodel.scss';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { GIFTCARD } from '../../Routes/RouteConstent';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function GiftCardModel(props: any) {
    let { open, setOpen, text, type } = props;
    let Navigate = useNavigate()
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        Navigate("/")
    }
    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onBackdropClick={() => { Navigate("/") }}

            >

                <Box sx={style} className="membership-congrats">
                    <IconButton sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8
                    }}  >

                        <CloseIcon onClick={handleClose} />

                    </IconButton>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {text}
                    </Typography>
                    {/* <button className='primary-blue-btn' onClick={()=>Navigate(GIFTCARD)}>Back to Home</button> */}
                    <button className='primary-blue-btn' onClick={handleClose}>Back to Home</button>

                </Box>
            </Modal>
        </div>
    );
}

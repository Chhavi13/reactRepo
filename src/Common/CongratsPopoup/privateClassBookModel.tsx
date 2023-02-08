
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './congratsModel.scss';
import { useNavigate } from 'react-router-dom';
import { Backdrop } from '@mui/material';

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
interface Iprops {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    text?:String
}
export default function PrivateClassModel(props: Iprops) {
    let { open, setOpen, text} = props;
    let Navigate = useNavigate()
    const handleOpen = () => setOpen(true);
    const handleClose = (data: any, type: any) => {
        if (type === "backdropClick" || "escapeKeyDown") return;
        setOpen(false)
    }

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="membership-congrats">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Congratulations!
                    </Typography>
                    <h3> {text}</h3>
                    {/* <Typography className="charged" id="modal-modal-description" sx={{ mt: 2 }}>
                        You will be charged only after the 7-day free trial ends.
                    </Typography> */}
                    {/* <button className='primary-blue-btn'>Gift an Event to your friend</button> */}
                    <button className='btn gotohome' onClick={() => Navigate("/")}>Go to home page</button>
                </Box>
            </Modal>
        </div>
    );
}


import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './congratsModel.scss';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { COURSEVIEW, GIFTCARD } from '../../Routes/RouteConstent';
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

export default function CongratsModel(props: any) {
    let { open, setOpen, text, type, memberShip,membership_id } = props;
    
    let Navigate = useNavigate()
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        // setOpen(false);
        Navigate("/")
        if(membership_id){
         Navigate(COURSEVIEW + membership_id)
        }
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
                        {/* {type === "course" ? text : text} */}
                        {(type === "member" || memberShip?.type === "Paid") ? "Congratulations!" : ""}

                        {/* {type === "member" ? "Thanks for buying our membership":text} */}
                    </Typography>
                    <Typography>
                        {(type === "member" || memberShip?.type === "Paid") ? "You are now part of the club!" : text}
                    </Typography>
                    {type === "course" ? <>Lorem ipsum dolor sit amet
                        <button className='primary-blue-btn' onClick={() => Navigate(GIFTCARD)}>Gift a course to your friend</button>&nbsp;&nbsp;
                        <button className='btn gotohome' onClick={() =>   Navigate("/")}>Go to home page</button>
                       
                        </>
                        : <><p> </p>
                            <Typography className="charged" id="modal-modal-description" sx={{ mt: 2 }}>
                                {/* {type === "membership" || "service" || "All" ?"Lorem ipsum dolor sit amet":"You will be charged only after the 7-day free trial ends."} */}
                                {type === "member" ? "" : memberShip?.type === "Paid" ? "" : "Lorem ipsum dolor sit amet"}
                            </Typography>
                            {
                                (type === "member" || memberShip?.type === "Paid") && <><button className='primary-blue-btn' onClick={() => Navigate('/')}>Show Me Around</button></>

                                // <button className='primary-blue-btn' onClick={() => Navigate(GIFTCARD)}>Gift your friend</button>
                            }

                            {
                                memberShip?.type === "Paid" &&
                                <button className='btn gotohome' onClick={() => Navigate("/")}>Go to home page</button>
                            }
                        </>}


                </Box>
            </Modal>
        </div>
    );
}

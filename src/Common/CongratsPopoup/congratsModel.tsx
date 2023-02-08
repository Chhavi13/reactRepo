
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './congratsModel.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { start } from 'repl';
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
    justifyContent: "flex-start",


};
interface Iprops {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    text?: String,

}
export default function CongratsModel(props: Iprops) {
    let { open, setOpen, text = "Thanks for buying our membership" } = props;
    
    const { state }: any = useLocation();

    let Navigate = useNavigate()
    const [serviceName, setServiceName] = React.useState<any>("")

    const handleClose: any = (data: any, type: any) => {
        if (type === "backdropClick" || "escapeKeyDown") {
            return;
        } else {
            setOpen(false)
        }

    }
    const modalClose: any = async () => {
        await setOpen((e) => !e)
        setTimeout(() => {
            document.getElementsByTagName("body")[0]['style']['overflow'] = 'auto'
        }, 1)
        Navigate("/")
        // setOpen(false)
    }
    // const handleCls = async () => {
    //     await setOpen((e) => !e)
    //     setTimeout(() => {
    //         document.getElementsByTagName("body")[0]['style']['overflow'] = 'auto'
    //     }, 1)
    //     // debugger
    //     // console.log(body)
    // }

    const giftButton = () => {

        if (state?.param == "service_4") {
            return setServiceName("Gift a Support group to your friend")

        } else if (state?.param === "service_9" || state?.param === "service_10" || state?.param === "service_11" || state?.param === "service_12") {
            return setServiceName("Gift a Virtual Class to your friend")
        }
        else if (state?.param == "service_1" || state?.param === "service_2" || state?.param === "service_3" || state?.param === "service_5" || state?.param === "service_6" || state?.param === "service_7" || state?.param === "service_8" || state?.param === "service_13" || state?.param === "service_14") {

            return setServiceName("Gift a Consult to your friend")
        }
        else if (state?.param === "CPR and first aid private class") {

            return setServiceName("Gift a private Class to your friend")
        }
        else if (state?.param === "Initial lactation consult private class") {

            return setServiceName("Gift a private Class to your friend")
        }

        else if (state?.tab === "1") {
            return setServiceName("Gift to your friend")
        }
    }
    React.useEffect(() => {
        giftButton()
    }, [])

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} className="membership-congrats">
                    <IconButton sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8
                    }}>
                        <CloseIcon onClick={modalClose} />

                    </IconButton>
                    {/* <button onClick={handleCls}>Close</button> */}
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thank you!!
                    </Typography>
                    {/* <h3> {text}</h3> */}
                    <p>“We look forward to speaking with you and learning more about your needs” </p>

                    {/* <Typography className="charged" id="modal-modal-description" sx={{ mt: 2 }}>
                        You will be charged only after the 7-day free trial ends.
                    </Typography> */}

                    {state?.param == "service_1" ? <button className='primary-blue-btn' onClick={() => Navigate("/")} >Explore home page</button> : <button className='primary-blue-btn' onClick={() => Navigate(GIFTCARD)} >{serviceName}</button>}
                    {state?.param == "service_1" ? "" : <button className='btn gotohome' onClick={() => Navigate("/")}>Go to home page</button>}
                </Box>
            </Modal>
        </div>
    );
}

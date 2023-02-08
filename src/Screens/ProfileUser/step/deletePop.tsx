import { CircularProgress } from '@mui/material';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteEventAPI, deleteServiceAPI } from '../../../Service/edit_profile';

const Delete_Popup = (props: any) => {
    let { open, setOpen, data, getUpcomingEventAPI, text, getUpcomingServiceAPI, type } = props;
    const [loading, setLoading] = React.useState(false)
    let handleClose = () => {
        setOpen(false)
    }
    const handleDeleteProp = async () => {
        try {
            let res:any;
            setLoading(true)
            if(type ==='Event'){
                res= await deleteEventAPI(data)
            }
            if(type === 'Service'){
                res = await deleteServiceAPI(data)
            }            
            if (res?.data?.success) {                
                type==='Event'?getUpcomingEventAPI():getUpcomingServiceAPI()                
                setOpen(false)
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }

    }
    return (
        <>
            <Modal
                show={open} onHide={handleClose}
                size="sm"
                id="delete-msg-modal"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onClick={handleClose} className='border-0'>
                    {/* <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <h4>{text}</h4>
                </Modal.Body>
                <Modal.Footer className='border-0 d-flex justify-content-center'>
                    <Button className='primary-outline-btn h50' disabled={loading} onClick={handleDeleteProp}>{loading ? <CircularProgress /> : 'Confirm'}</Button>
                    <Button className='primary-outline-btn h50' onClick={handleClose}>Cancel</Button>

                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Delete_Popup
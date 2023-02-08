import { CircularProgress } from '@mui/material';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Rescedule_Popup = (props: any) => {
    let { open, setOpen, data, getUpcomingEventAPI, text, getUpcomingServiceAPI, type,handleBookPop,loading } = props;
    let handleClose = () => {
        setOpen(false)
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
                    <Button className='primary-outline-btn h50' disabled={loading} onClick={(e)=>handleBookPop(e,data)}>{loading ? <CircularProgress /> : 'Confirm'}</Button>
                    <Button className='primary-outline-btn h50' onClick={handleClose}>Cancel</Button>

                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Rescedule_Popup
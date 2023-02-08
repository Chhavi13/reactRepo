import React, { useRef } from 'react'
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import jsPDF from 'jspdf';
import TableContainer from './table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ReceiptView({ open, setOpen, value }: any) {
    const handleClose = () => {
        setOpen(false);
    };
    const pdfRef = useRef(null)
    const handleDownload = () => {
        const content: any = pdfRef.current
        const doc = new jsPDF('p', 'mm', [950, 950]);
        doc.html(content, {
            callback: function (doc) {
                doc.save('receiptView.pdf');
            }
        });
    }
    return (
        <div>
            {/* <Modal
                show={open} 
                onHide={handleClose}
                size="lg"
                id="delete-msg-modal"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onClick={handleClose} className='border-0'>
                </Modal.Header>
                <Modal.Body>
                    <TableContainer />
                </Modal.Body>
                <Modal.Footer className='border-0 d-flex justify-content-center'>
                    <Button className='primary-outline-btn h50' onClick={handleClose}>ok</Button>
                </Modal.Footer>
            </Modal> */}

            <Modal
                size="lg"
                show={open}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"                
            >
                <Modal.Header closeButton >
                    {/* <Modal.Title id="example-modal-sizes-title-lg">
                        Large Modal
                    </Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <TableContainer />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ReceiptView

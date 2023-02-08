import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Tab2.scss";
import { deleteUserMsgApi } from '../../Service/ask_a_nurse';

const Delete_Popup_Ask_A_Nurse = (props: any) => {
    let { open, setOpen, data, setData, passData } = props;
    let handleClose = () => {
        setOpen(false)
    }
    // debugger
    console.log(passData)
    let { value, i } = passData


    const DeleteUserMsg = async (value: any, i: number) => {
        try {

            data = data.filter((item: any) => {
                return item.id !== value.id
            })
            setData(data)


            let sendData = {
                user_id: value.user.id,
                ask_nurse_question_id: value.id
            }
            let res: any = await deleteUserMsgApi(sendData)
            console.log("res from delete api", res)
            if (!res?.data?.success) {
                let addValue = [...data]
                addValue.splice(i, 0, value)
                setData(addValue)
            }
        } catch (error) {
            let addValue = [...data]
            addValue.splice(i, 0, value)
            setData(addValue)
            console.log(error)
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
                    <h4>You are about to delete a message</h4>
                    <p>
                        This will delete your message from message board, Are you sure?
                    </p>
                </Modal.Body>
                <Modal.Footer className='border-0 d-flex justify-content-center'>

                    <Button className='primary-outline-btn h50' onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => DeleteUserMsg(value, i)} className='primary-blue-small-btn btn'>Confirm</Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Delete_Popup_Ask_A_Nurse
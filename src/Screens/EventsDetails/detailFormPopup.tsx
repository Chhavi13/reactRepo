import React, { useEffect, useState } from 'react'
import { Button, Modal, Container, Row, Image } from 'react-bootstrap'
import { eventBookingStore } from '../../Service/equityApi';
import { CircularProgress } from '@mui/material';
import "./detailFormPopup.scss";
import CongratsModel from '../../Common/CongratsPopoup/congratsModel';


const DetailPopup = ({ show, handleClose, value, toast, trigPopup, setData, setOpen }: any) => {
    const [inputData, setInputData] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false);

    let user: any = localStorage.getItem("Nurture_user_data");
    let data = JSON.parse(user);
    const handleChange = (e: any) => {
        let name = e.target.name;
        let value = e.target.value;
        if (!user) {
            setInputData({
                ...inputData,
                [name]: value
            })
        }
        if (name === 'phone') {
            setInputData({
                ...inputData,
                [name]: value
            })
        }
    }
    React.useEffect(() => {
        if (user) {
            setInputData({
                ...inputData,
                first_name: data?.first_name,
                last_name: data?.last_name,
                email: data?.email
            })
        }
    }, [localStorage])
    // console.log(inputData)

    const handleSave = async (e: any) => {
        e.preventDefault()
        try {
            
            if (!inputData.first_name || !inputData.last_name || !inputData.email || !inputData.phone || inputData.phone.length < 10) {
                if (!inputData.phone) {
                    toast.error("Contact number is required")
                }
                if (inputData.phone?.length < 10) {
                    toast.error("Contact number must be 10 digit")
                }
            } else {
                setIsLoading(true)
                let userData = {
                    ...inputData,
                    user_id: data?.id,
                    event_id: value?.id,
                    event_name: value?.title,
                    appointment_id: value?.appointment_id,
                    appointment_date_time: value?.event_date_time
                }
                let res: any = await eventBookingStore(userData);
                let success = res.data.success;
                let message = res.data.message
                let msg = ""
                for (let i = 0; i < message.length; i++) {
                    msg += message[i];
                }
                if (!success) {
                    toast.error(msg)
                }
                if (success) {

                    // setData((state:any)=>{
                    //     ...state,
                    //     "is_booked":true

                    // })
                    setData((prev: any) => {
                        return {
                            ...prev,
                            is_book: true
                        }
                    })
                    await handleClose()
                    trigPopup()
                } else {
                    setIsLoading(false)
                    handleClose()
                }
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            handleClose()
        }
    }
    const test = () => {
        // trigPopup()
        setOpen(true)
        handleClose()
    }
    return (
        <Modal show={show} onHide={handleClose} className="confirm-info">
            {/* <Modal.Dialog> */}

            <Modal.Header closeButton={handleClose} 
            // onClick={handleClose}
             >
                <Modal.Title className='mx-auto'> <h3 className='text-center mx-auto'>Confirm your Information </h3></Modal.Title>
            </Modal.Header>

            <Modal.Body className='text-left confirm-info-body'>
                {/* <h3>Confirm your Information</h3> */}
                <div className='confirm-info text-left'>
                    <form>
                        <div className="mb-3 text-left">
                            <label className="form-First-nm" htmlFor="first-name">First Name <span className='required mandatory text-danger mx-2'>*</span></label>
                            <input name="first_name" value={inputData?.first_name} placeholder="First Name" type="text" id="first-nm" className="form-control" onChange={handleChange} disabled={data?.first_name ? true : false} />
                        </div>
                        <div className="mb-3 mt-3 text-left">
                            <label className="form-Last-nm" htmlFor="last-name">Last Name <span className='required mandatory text-danger mx-2'>*</span></label>
                            <input name="last_name" value={inputData?.last_name} placeholder="Last Name" type="text" id="last-nm" className="form-control" onChange={handleChange} disabled={data?.last_name ? true : false} />
                        </div>
                        <div className="mb-3 mt-3 text-left">
                            <label className="form-Email" htmlFor="Email-id">Email Id <span className='required mandatory text-danger mx-2'>*</span></label>
                            <input name="email" value={inputData?.email} placeholder="Email" type="text" id="email-id" className="form-control" onChange={handleChange} disabled={data?.email ? true : false} />
                        </div>
                        <div className="mb-3 mt-3 text-left">
                            <label className="form-phone" htmlFor="phone">Contact No. <span className='required mandatory text-danger mx-2'>*</span></label>
                            <input name="phone" placeholder="Contact No." type="text" id="contact-num" className="form-control" onChange={handleChange} />
                        </div>
                    </form>
                    {/* <button onClick={test}>Fire another popup</button> */}
                </div>
            </Modal.Body>

            <Modal.Footer className='text-center'>
                {/* <Button variant="secondary">Close</Button> */}
                <Button className="primary-blue-small-btn mx-auto w-100" onClick={handleSave}>{isLoading ? <CircularProgress /> : " Save changes"}</Button>
            </Modal.Footer>
            {/* </Modal.Dialog> */}
        </Modal>
    )
}

export default DetailPopup
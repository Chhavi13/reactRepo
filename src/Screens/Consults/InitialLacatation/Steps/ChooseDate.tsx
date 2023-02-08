import React, { useState } from 'react';
import { Typography, Avatar } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



const ChooseDate = () => {
    const [value, setValue] = React.useState<Date | null>(
        new Date(),
    );
    const [dateVisible, setDateVisible] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };


    return (
        <div>
            <section className='step-container step1'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-4'>Choose an Appointmentt</h3>
                </div>
                <div className="Client" >
                    <h6>
                        30-minute Prospective Client Informational Call
                    </h6>
                    <div>
                        <p>Please use the calendar below to book an appointment on a day and time that works best for you.</p>
                    </div>
                </div>


                <div className="consult-card-container">
                    <div className=' py-3 px-3 justify-content-between'>
                        <div className="row mt-4">
                            <div className="col-2">
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            </div>
                            <div className="col-6 mt-2">
                                <Typography  > Kate Hanafin</Typography>
                            </div>
                            <div className="col-4">
                                <button className='primary-blue-small-btn'>Book</button>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="consult-card-container" onClick={() => setDateVisible(!dateVisible)}>
                    <div className='d-flex py-4 px-3 justify-content-between align-items-center'>
                        <div className='consult-info d-flex  align-items-center '>
                            <div className='consultant-name'>
                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            </div>
                            <div className='consultant-name'>
                                <Typography  > Kate Hanafin</Typography>
                            </div>
                        </div>
                        <div className='btn-container float-left'>
                            <button className='btn primary-blue-small-btn-40'>Book</button>

                        </div>
                    </div>
                    {dateVisible &&
                        <div>
                            <div className='calender-container px-3'>
                                <p>Select Date</p>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    inline
                                />
                            </div>
                            <div className='timeslot-container px-3 pb-3'>
                                <p>Select Time</p>
                                <button className='btn time-btn'> 7:45pm</button>
                                <button className='btn time-btn'> 7:45pm</button>
                                <button className='btn time-btn'> 7:45pm</button>
                                <button className='btn time-btn'> 7:45pm</button>
                                <button className='btn time-btn'> 7:45pm</button>
                                <button className='btn time-btn'> 7:45pm</button>
                            </div>
                        </div>}
                </div>
                <div className='section-navigation my-5 d-flex justify-content-end'>
                    <button className='primary-blue-small-btn next me-0 ms-auto'>Next</button>
                </div>
            </section>


        </div>
    )
}

export default ChooseDate
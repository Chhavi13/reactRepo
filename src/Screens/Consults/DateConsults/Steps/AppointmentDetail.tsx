import { CircularProgress } from '@mui/material';
import moment from 'moment';
import React from 'react';

const AppoinmentDetail = ({ host, data, handleSubmit, handlePrev, loading, setStep, objName }: any) => {

    const disPlayTime = (date: any) => {
        const Cdate = new Date(date);
        let converted_date = Cdate.toLocaleString('en-US', {
            timeZone: 'America/New_York',
        })
        return moment(converted_date).format("LT")
    }

    return (
        <>
            <section className='step-container step3'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-5'>Your Appointment</h3>
                    {/* <p className='my-5'>Please choose a class time from the scheduler below that works best for your schedule.</p> */}
                </div>

                <div className="consult-card-container selected-consult-container py-3 py-md-4 px-3 px-md-4">
                    <div className='d-flex justify-content-between flex-column flex-md-row'>
                        <div className='d-flex flex-column w-100'>
                        <div className='consult-date-time d-flex justify-content-between'>
                            <div className=''>
                                <h3 className='selected-consult-title m-0'>{host?.service_name}</h3>
                            </div>
                            <div className='consult-cost'>
                                <h2 className='text-start'>Free</h2>
                            </div>
                        </div>
                            <div className='consult-date my-2 strong'>{moment(data?.appointment_date_time).format("dddd DD MMM YYYY")}</div>
                            <div className='consult-tm-dtls mb-2'>
                                <span className='consult-time'><span className='strong'> {disPlayTime(data?.appointment_date_time)} EST</span>  </span>
                                <span className='host-name'>| by {objName?.calendar}</span><br />
                                <span>Duration: {objName?.duration} Minutes</span>
                            </div>
                            <div className='change-date' onClick={() => setStep(0)}>Change Date</div>
                        </div>
                    </div>
                   
                    <div className='subtotal d-flex pb-1 pt-3 mt-3 border-top border-1'>
                        <span className='ms-0 me-auto'><h2 className='m-0 p-0'>Subtotal</h2></span>
                        <span className='price me-0 ms-auto'><h2 className='m-0 p-0'>Free</h2></span>
                    </div>
                </div>

                <div className='section-navigation my-5 d-flex justify-content-between'>
                    <button className='primary-blue-small-btn' onClick={handlePrev}>Previous</button>
                    <button className='primary-blue-small-btn next' disabled={loading} onClick={handleSubmit}>{loading ? <CircularProgress /> : "Confirm"}</button>
                </div>
            </section>
        </>
    )
}

export default AppoinmentDetail
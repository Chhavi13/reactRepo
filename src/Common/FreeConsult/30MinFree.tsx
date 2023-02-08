import React from 'react'
import { Row } from 'react-bootstrap';

const Free30Min = () => {
    return (
        <>
            <Row>
                <div className='col-lg-12'>
                    <div className='recorder-session-ntf-block w-100 py-4 py-md-5 px-5 mb-5'>
                        <div className='d-flex justify-content-center align-items-center flex-column mx-auto px-5 sec-caption'>
                            <h2>30 Minute <span className='head-bold'>Free Consult</span></h2>
                            <p className='mb-0'>Complete your profile and get a free 30 minute consult with one of our nurses.
                            </p>
                            <button className="btn primary-blue-small-btn-40 mt-3 mt-md-4">Redeem Now</button>
                        </div>
                    </div>
                </div>
            </Row>
        </>
    )
}

export default Free30Min;
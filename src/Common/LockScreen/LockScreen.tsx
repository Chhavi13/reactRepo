import React from 'react';
import "./LockScreen.scss";

const LockScreen = () => {
    return (
        <div>
            <div className='col-lg-12 col-md-12'>
                <div className='become-member my-4'>
                    <div className='container'>
                        <div className='col-lg-12 col-md-12'>
                            <div className='become-member-container p-5'>
                                <div className='row'>
                                    <div className='col-lg-5'>
                                        <div className='become-meber-captions'>
                                            <h3>Become a Member
                                                <span className="strong">for total access</span>
                                            </h3>
                                            <div className='price-dtls'>
                                                <p>from <span className='pvalue strong'>$76.50</span> /mo</p>
                                            </div>
                                            <div>
                                                <p>This is your all-access pass to our courses, videos, live webinars, Ask A Nurse, and more. </p>
                                            </div>
                                            <div>
                                                <button className='secondary-teal-btn-small mt-4'>Read More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LockScreen
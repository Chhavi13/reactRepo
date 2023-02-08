import React from 'react';

const AppoinmentDetail = () => {

    return (
        <>
            <section className='step-container step3'>
                <div className='consult-section-heading text-center'>
                    <h3 className='my-5'>Your Appointment</h3>
                </div>
                <div className="consult-card-container selected-consult-container">
                    <div className='d-flex py-3 py-md-4 px-3 px-md-5 justify-content-between flex-column flex-md-row'>
                        <div className='d-flex flex-column'>
                            <div className='me-md-4 pe-md-5 me-2'>
                                <h3 className='selected-consult-title'>Initial Lactation Consult </h3>
                            </div>
                            <div className='consult-date my-2 strong'>11 May, 2022 - 7:00 to 9:00 pm</div>
                            <div className='change-date'>Change Date</div>
                        </div>
                        <div className='consult-cost'>
                            <h2 className='text-start'>$200</h2>
                        </div>
                    </div>
                    <div className='subtotal d-flex mx-3 mx-md-5 pb-3 pt-3'>
                    </div>


                    <div className='coupon-container'>
                        <div className="apply-couponcode mb-4 ">
                            <h6 className="apply-heading">Apply Coupon Code</h6>
                            <div className="position-relative">
                                <div className="d-flex justify-content-between ">
                                    <input type="text" className="form-control" value="fjdhf" /><button className="btn secondary-teal-btn ms-2">Apply</button></div><span className="error"></span>
                            </div>
                        </div>
                    </div>



                    <div className='subtotal d-flex mx-3 mx-md-5 pb-3 pt-3'>
                        <span className='ms-0 me-auto'><h2 className='m-0 p-0'>Subtotal</h2></span>
                        <span className='price me-0 ms-auto'><h2 className='m-0 p-0'>$355</h2></span>
                    </div>
                </div>
                <div className="bill-details">
                    <h6>Bill Detail</h6>
                    <ul className="first">
                        <li className='d-flex justify-content-between consult-total'><span className="headingspan">Consult Total</span><span className="pricespan">$355</span></li>
                        <li className="d-flex justify-content-between coupon-discount "><span>Coupon Discount</span><span>- $0</span></li>
                        <li className="d-flex justify-content-between"><span>Taxes &amp; Charges</span><span>+$10</span></li>
                    </ul>

                    <ul className="pay-list">
                        <li className="d-flex justify-content-between"><span className="payspan">To Pay</span><span className="pay-total">$355</span></li>
                    </ul>
                </div>
                <div className='section-navigation my-5 d-flex justify-content-between'>
                    <button className='primary-blue-small-btn'>Previous</button>
                    <button className='primary-blue-small-btn next'>Next</button>
                </div>
            </section>

        </>
    )
}

export default AppoinmentDetail
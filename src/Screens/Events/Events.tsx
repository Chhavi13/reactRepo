import React from 'react'
import Header from './Header'
import Tabs from './Tabs'

const Events = () => {

    return (
        <div className="container-fluid course_content_page mt-5 mb-4">
            <div className="course_page">
                <div className="row">
                    <div className="col-md-12">
                        <Header />
                        <Tabs />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events
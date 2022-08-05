import React from 'react'
import { Header } from '../../components/header/header'

const ReportPage = () => {
    return (
        <div>
            <div className="mobilemaincontainer">
                <div className="mobile_container">
                    <div className="sabrinamainscroll create_page">
                        <Header
                        title='Report Abuse'
                        next="Report"
                        back={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportPage

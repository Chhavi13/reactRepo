import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';


function StepperMenu(props: any) {
    let { activeStep, setActiveStep, setSubStep, setSubStep1, subStep, subStep1, subStep2, setSubStep2, mobileOpen, setMobileOpen } = props
    // const [activeStep, setActiveStep] = React.useState(0);
    let user: any = localStorage.getItem('Nurture_user_data')
    user = JSON.parse(user)

    const handleNext = (value: any) => {
        
        setActiveStep(value);
        let stableState: any = { state: value }
        localStorage.setItem('stabeleComponent', JSON.stringify(stableState))
        localStorage.removeItem('stabeleStep')
        setSubStep(0)
        setSubStep1(0)
        setSubStep2(0)
        // setMobileOpen(true)
    }
    // const handleCourses = (value: number) => {
    //     setSubStep(value)
    // }
    const handleEditFun = (value: number) => {
        setSubStep(value)
        let id: any = { step: value }
        localStorage.setItem('stabeleStep', JSON.stringify(id))
    }
    // const handleEvents = (value: number) => {
    //     setSubStep1(value)
    // }
    const handleBillingFun = (value: number) => {
        setSubStep1(value)
        let id: any = { step: value }
        localStorage.setItem('stabeleStep', JSON.stringify(id))
    }
    // const handleConsults = (value: number) => {
    //     setSubStep2(value)
    // }
    const handlePromoFun = (value: number) => {
        setSubStep2(value)
        let id: any = { step: value }
        localStorage.setItem('stabeleStep', JSON.stringify(id))
    }
    console.log(activeStep)
    let com: any = localStorage.getItem('stabeleComponent')
    com = JSON.parse(com)
    let step: any = localStorage.getItem('stabeleStep')
    step = JSON.parse(step)
    useEffect(() => {
        setActiveStep(com?.state)
    }, [activeStep])
    useEffect(() => {
        if (step) {
            setSubStep(step?.step)
            setSubStep1(step?.step)
            setSubStep2(step?.step)
        } else {
            setSubStep(0)
            setSubStep1(0)
            setSubStep2(0)
        }
    }, [subStep])
    return (
        <>
            {/* <div className='col-lg-2 col-md-3'>           

            <ul className={`list-unstyled ps-0 sidebar-nav ${!mobileOpen? 'mobile-nav-close':'mobile-nav-open'} `}>
                <li className="mb-1 w-100 tier1">
                    <button className={`btn btn-toggle align-items-center rounded ${activeStep !== "MyCourses" && 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true" onClick={() => handleNext('MyCourses')}>
                        Edit Profile
                    </button>
                    <div className={`collapse ${activeStep === "MyCourses" && 'show'} collapsible-nav`} id="home-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li onClick={() => handleCourses(0)}><Link to={''} className={`${subStep == '' && "active"}`}>All</Link></li>
                            <li onClick={() => handleCourses(1)}><Link to={''} className={`${subStep == 1 && "active"}`}>Started</Link></li>
                            <li onClick={() => handleCourses(2)}><Link to={''} className={`${subStep == 2 && "active"} link-dark rounded`}>Completed</Link></li>
                            <li onClick={() => handleCourses(3)}><Link to={''} className={`${subStep == 3 && "active"} link-dark rounded`}>Favorites</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1 w-100 tier1">
                    <button className={`btn btn-toggle align-items-center rounded ${activeStep !== "MyEvents" && 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false" onClick={() => handleNext('MyEvents')}>
                       Billing
                    </button>
                    <div className={`collapse ${activeStep === "MyEvents" && 'show'} collapsible-nav`} id="dashboard-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li onClick={() => handleEvents(0)}><Link to={''} className={`${subStep1 == '' && "active"} link-dark rounded`}>All</Link></li>
                            <li onClick={() => handleEvents(1)}><Link to={''} className={`${subStep1 == 1 && "active"} link-dark rounded`}>Upcoming</Link></li>
                            <li onClick={() => handleEvents(2)}><Link to={''} className={`${subStep1 == 2 && "active"} link-dark rounded`}>Past</Link></li>
                            <li onClick={() => handleEvents(3)}><Link to={''} className={`${subStep1 == 3 && "active"} link-dark rounded`}>Favorites</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1 w-100 tier1">
                    <button className={`btn btn-toggle align-items-center rounded ${activeStep !== "MyServices" && 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#service-collapse" aria-expanded="false" onClick={() => handleNext('MyServices')}>
                        Promotional
                    </button>
                    <div className={`collapse ${activeStep === "MyServices" && 'show'} collapsible-nav`} id="service-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li onClick={() => handleConsults(0)}><Link to={''} className={`${subStep2 == '' && "active"} link-dark rounded`}>All</Link></li>
                            <li onClick={() => handleConsults(1)}><Link to={''} className={`${subStep2 == 1 && "active"} link-dark rounded`}>Upcoming</Link></li>
                            <li onClick={() => handleConsults(2)}><Link to={''} className={`${subStep2 == 2 && "active"} link-dark rounded`}>Past</Link></li>
                            <li onClick={() => handleConsults(3)}><Link to={''} className={`${subStep2 == 3 && "active"} link-dark rounded`}>Gift Card</Link></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div> */}



            <div className='col-lg-3 col-md-3'>
                <ul className="list-unstyled ps-0 sidebar-nav edit-profile">
                    <li className="mb-1">
                        <button className={`btn btn-toggle align-items-center rounded ${activeStep !== "edit" && 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#edit-profile" aria-expanded="true" onClick={() => handleNext('edit')} >
                            Edit Profile
                        </button>
                        <div className={`collapse ${activeStep === "edit" && 'show'} collapsible-nav`} id="edit-profile">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li onClick={() => handleEditFun(0)}><Link to={''} className={`${subStep == 0 && "active"}`}>About you</Link></li>
                                {user?.is_membership ? <>
                                    <li onClick={() => handleEditFun(1)}><Link to={''} className={`${subStep == 1 && "active"}`}>About your Baby</Link></li>
                                    <li onClick={() => handleEditFun(2)}><Link to={''} className={`${subStep == 2 && "active"} link-dark rounded`}>About your Partner</Link></li>
                                </>
                                    : <></>
                                }
                                <li onClick={() => handleEditFun(3)}><Link to={''} className={`${subStep == 3 && "active"} link-dark rounded`}>Account Settings</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className={`btn btn-toggle align-items-center rounded ${activeStep !== "billing" && 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#billing-nav" aria-expanded="false" onClick={() => handleNext('billing')} >
                            Billing
                        </button>
                        <div className={`collapse ${activeStep === "billing" && 'show'} collapsible-nav`} id="billing-nav">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li onClick={() => handleBillingFun(0)}><Link to={''} className={`${subStep1 == 0 && "active"} link-dark rounded`}>Your Membership</Link></li>
                                <li onClick={() => handleBillingFun(1)}><Link to={''} className={`${subStep1 == 1 && "active"} link-dark rounded`}>Payment</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className={`btn btn-toggle align-items-center rounded ${activeStep !== "promotion" && 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#promotion-nav" aria-expanded="false" onClick={() => handleNext('promotion')} >
                            Promotional
                        </button>
                        <div className={`collapse ${activeStep === "promotion" && 'show'} collapsible-nav`} id="promotion-nav">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li onClick={() => handlePromoFun(0)}><Link to={''} className={`${subStep2 == 0 && "active"} link-dark rounded`}>Earn Consult</Link></li>
                                <li onClick={() => handlePromoFun(1)}><Link to={''} className={`${subStep2 == 1 && "active"} link-dark rounded`}>Invite Friend</Link></li>
                                <li onClick={() => handlePromoFun(2)}><Link to={''} className={`${subStep2 == 2 && "active"} link-dark rounded`}>My offer</Link></li>
                            </ul>
                        </div>
                    </li>


                </ul>
            </div>
        </>


    )
}

export default StepperMenu
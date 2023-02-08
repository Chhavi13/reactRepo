import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';


// function getStepContent(stepIndex: any) {
//     switch (stepIndex) {
//         case 0:
//             return (<Step1 />);
//         case 1:
//             return <div>Content of Step 2</div>;
//         case 2:
//             return 
//         case 3:
//             return
//         case 4:
//             return        
//         default:
//             return "No Content";
//     }
// }

function StepperMenu(props: any) {
    let { activeStep, setActiveStep, setSubStep, setSubStep1, subStep, subStep1, subStep2, setSubStep2, subStep3, setSubStep3, mobileOpen, setMobileOpen, data, setNotify, notify } = props


    // const [activeStep, setActiveStep] = React.useState(0);

    let user: any = localStorage.getItem("Nurture_user_data");
    user = JSON.parse(user)
    let unseenMsg: any = localStorage.getItem("NapsUnseenMsg")
    unseenMsg = JSON.parse(unseenMsg)
    useEffect(() => {
        setNotify(unseenMsg?.length)
    })

    const handleNext = (value: any) => {
        setActiveStep(value);
        let stableState: any = { state: value }
        localStorage.setItem('stabeleComponent', JSON.stringify(stableState))
        localStorage.removeItem('stabeleStep')
        if (user?.is_membership == 0) {
            setSubStep(4)
        }
        setSubStep1(1)
        setSubStep2(1)
        setSubStep3(1)
        setMobileOpen(true)
    }
    const handleCourses = (value: number) => {
        setSubStep(value)
        let id: any = { step: value }
        localStorage.setItem('stabeleStep', JSON.stringify(id))
    }
    const handleEvents = (value: number) => {
        setSubStep1(value)
        let id: any = { step: value }
        localStorage.setItem('stabeleStep', JSON.stringify(id))
    }
    const handleConsults = (value: number) => {
        setSubStep2(value)
        let id: any = { step: value }
        localStorage.setItem('stabeleStep', JSON.stringify(id))
    }
    const handleGiftCard = (value: number) => {
        setSubStep3(value)
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
            setSubStep3(step?.step)
        } else {
            if (user?.is_membership == 0) {
                setSubStep(4)
            } else {
                setSubStep(1)
            }
            setSubStep1(1)
            setSubStep2(1)
            setSubStep3(1)
        }
    }, [subStep])
    return (
        <div className='col-lg-3 col-md-3'>
            {/* <ul className='list-unstyled d-flex flex-column text-decoration-none parent-ul'>
                <li onClick={() => handleNext('Activity')}><Link to={''}>Activity</Link></li>
                <li onClick={() => handleNext('MyCourses')}><Link to={''}>My Courses</Link>
                    <ul className='list-unstyled d-flex flex-column text-decoration-none child'>
                        <li onClick={() => handleCourses(0)}><Link to={''} className='active'>All</Link></li>
                        <li onClick={() => handleCourses(1)}><Link to={''}>Started</Link></li>
                        <li onClick={() => handleCourses(2)}><Link to={''}>Completed</Link></li>
                        <li onClick={() => handleCourses(3)}><Link to={''}>Favorites</Link></li>
                    </ul>
                </li>
                <li onClick={() => handleNext('MyEvents')}><Link to={''}>My Events</Link></li>
                <li onClick={() => handleNext('MyServices')}><Link to={''}>My Services</Link></li>
                <li onClick={() => handleNext('Ask_a_Nurse')}><Link to={''}>Ask a Nurse <span className='notification'> 1 </span></Link></li>
            </ul> */}

            <ul className={`list-unstyled ps-0 sidebar-nav ${!mobileOpen ? 'mobile-nav-close' : 'mobile-nav-open'} `}>
                <li className="mb-1 w-100 tier1">
                    <button className={`btn btn-toggle align-items-center rounded ${activeStep !== "MyCourses" && 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false" onClick={() => handleNext('MyCourses')}>
                        My Course
                    </button>
                    <div className={`collapse ${activeStep === "MyCourses" && 'show'} collapsible-nav`} id="home-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            {/* <li onClick={() => handleCourses(0)}><Link to={''} className={`${subStep == '' && "active"}`}>All</Link></li> */}
                            {
                                user?.is_membership == 0 &&
                                <li onClick={() => handleCourses(4)}><Link to={''} className={`${subStep == 4 && "active"} link-dark rounded`}>purchased</Link></li>
                            }
                            {
                                user?.is_membership == 1 && <>
                                    <li onClick={() => handleCourses(1)}><Link to={''} className={`${subStep == 1 && "active"}`}>Started</Link></li>
                                    <li onClick={() => handleCourses(2)}><Link to={''} className={`${subStep == 2 && "active"} link-dark rounded`}>Completed</Link></li>
                                </>
                            }
                            <li onClick={() => handleCourses(3)}><Link to={''} className={`${subStep == 3 && "active"} link-dark rounded`}>Favorites</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1 w-100 ">
                    <button className={`btn btn-toggle align-items-center rounded ${activeStep !== "MyEvents" && 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false" onClick={() => handleNext('MyEvents')}>
                        My Events
                    </button>
                    <div className={`collapse ${activeStep === "MyEvents" && 'show'} collapsible-nav`} id="dashboard-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            {/* <li onClick={() => handleEvents(0)}><Link to={''} className={`${subStep1 == '' && "active"} link-dark rounded`}>All</Link></li> */}
                            <li onClick={() => handleEvents(1)}><Link to={''} className={`${subStep1 == 1 && "active"} link-dark rounded`}>Upcoming</Link></li>
                            <li onClick={() => handleEvents(2)}><Link to={''} className={`${subStep1 == 2 && "active"} link-dark rounded`}>Past</Link></li>
                            <li onClick={() => handleEvents(3)}><Link to={''} className={`${subStep1 == 3 && "active"} link-dark rounded`}>Favorites</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1 w-100">
                    <button className={`btn btn-toggle align-items-center rounded ${activeStep !== "MyServices" && 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#service-collapse" aria-expanded="false" onClick={() => handleNext('MyServices')}>
                        My Services
                    </button>
                    <div className={`collapse ${activeStep === "MyServices" && 'show'} collapsible-nav`} id="service-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            {/* <li onClick={() => handleConsults(0)}><Link to={''} className={`${subStep2 == '' && "active"} link-dark rounded`}>All</Link></li> */}
                            <li onClick={() => handleConsults(1)}><Link to={''} className={`${subStep2 == 1 && "active"} link-dark rounded`}>Upcoming</Link></li>
                            <li onClick={() => handleConsults(2)}><Link to={''} className={`${subStep2 == 2 && "active"} link-dark rounded`}>Past</Link></li>
                            {/* <li onClick={() => handleConsults(3)}><Link to={''} className={`${subStep2 == 3 && "active"} link-dark rounded`}>Gift Card</Link></li> */}
                        </ul>
                    </div>
                </li>
                <li className="mb-1 w-100 ">
                    <button className={`btn btn-toggle align-items-center rounded ${activeStep !== "gift" && 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#gift-card-collapse" aria-expanded="false" onClick={() => handleNext('gift')}>
                        Gift Card
                    </button>
                    <div className={`collapse ${activeStep === "gift" && 'show'} collapsible-nav`} id="gift-card-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li onClick={() => handleGiftCard(1)}><Link to={''} className={`${subStep3 == 1 && "active"} link-dark rounded`}>Received</Link></li>
                            <li onClick={() => handleGiftCard(2)}><Link to={''} className={`${subStep3 == 2 && "active"} link-dark rounded`}>Sent</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    {
                        user?.is_membership
                            ? <button className={`btn btn-toggle align-items-center rounded ${activeStep !== "Ask_a_Nurse" && 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false" onClick={() => handleNext('Ask_a_Nurse')}>
                                Ask a Nurse <span className='notification'>{notify > 0 ? notify : ""}</span>
                            </button>
                            : <></>
                    }
                </li>
            </ul>
        </div>

    )
}

export default StepperMenu
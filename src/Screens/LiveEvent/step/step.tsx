import React from 'react'
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
    let { setActiveStep } = props
    // const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = (value: any) => {
        setActiveStep(value);
    }
    return (
        <div className='col-lg-2 col-md-2'>
            <ul className='list-unstyled d-flex flex-column text-decoration-none parent-ul'>
                <li onClick={()=>handleNext('Activity')}><Link to={''}>Activity</Link></li>
                <li onClick={()=>handleNext('MyCourses')}><Link to={''}>My Courses</Link>
                    <ul className='list-unstyled d-flex flex-column text-decoration-none child'>
                        <li><Link to={''} className='active'>All</Link></li>
                        <li><Link to={''}>Started</Link></li>
                        <li><Link to={''}>Completed</Link></li>
                        <li><Link to={''}>Favorites</Link></li>
                    </ul>
                </li>
                <li onClick={()=>handleNext('MyEvents')}><Link to={''}>My Events</Link></li>
                <li onClick={()=>handleNext('MyServices')}><Link to={''}>My Services</Link></li>
                <li onClick={()=>handleNext('Ask_a_Nurse')}><Link to={''}>Ask a Nurse <span className='notification'> 1 </span></Link></li>
            </ul>
        </div>

    )
}

export default StepperMenu
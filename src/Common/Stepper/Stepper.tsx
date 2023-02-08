import { Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import React from 'react'
// import { Button } from 'react-bootstrap';

const allStep = () => {
    return ['Basics', 'Tell us about yourself', 'Select your membership', 'Tell us about your family', 'Tell us about your baby'];
}

const Steppers = ({ steps, getStepContent, handleNext, activeStep, setActiveStep }: any) => {

    const [skipped, setSkipped] = React.useState(new Set<number>());
    const [isClick, setIsClick] = React.useState<any>({
        0: true,
        1: false,
        2: false,
        3: false,
        4: false
    })



    // let steps = allStep();

    const isStepOptional = (step: number) => {
        return step === 3;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };
    let StepHandlerClick = (data: any) => {

        if (activeStep === data) return
        // if (isClick?.[data] === true) {
        //     setActiveStep(data);
        // }
    }

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleBack = () => {
        if (activeStep === 0) return;
        setActiveStep((prevActiveStep:any) => prevActiveStep - 1);
    };

    const handleSkip = () => {

        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep:any) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };


    return (
        <div>
            <section className={`steps-section position-relative`}>
                {/* <Popup isSignup={isSignup} isLogin={isLogin} /> */}
                <Box sx={{ width: '100%' }} className={`position-relative main-step1`}> {activeStep > 0 && <button className="membership-back " onClick={handleBack}>BACK</button>}
                    <Stepper activeStep={activeStep}>
                        {steps?.map((label: any, index: any) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography variant="caption" ></Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps} onClick={() => StepHandlerClick(index)} >
                                        {/* {label} */}
                                    </StepLabel>
                                </Step>
                            );

                        })}
                    </Stepper>
                    <div className="container">

                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    <Button onClick={handleBack}>Back</Button>
                                    <Button onClick={handleNext}>Next</Button>
                                    {getStepContent(activeStep)}
                                </Typography>

                            </React.Fragment>
                        )}
                    </div>
                </Box>
            </section>
        </div>
    )
}

export default Steppers;
import Swal from "sweetalert2";
import * as React from 'react';
import Step4 from './Step4';
import Step1 from './Step1';
import Step3 from './Step3';
import Step2 from './Step2'
import Step5 from './Step5'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as signup from "../../Service/signup"
import { useLocation } from "react-router-dom";
import * as company from "../../Service/companySignup"
import { useNavigate } from "react-router-dom";
import { QUICK_SCREENS } from "../../Routes/RouteConstent";
import { getMembershipPlan, onBoardingFamily } from "../../Service/membership";
import Popup from "./Popup";
import "./Membership.scss";


export default function Membership() {

  let Navigate = useNavigate();
  let userData: any = localStorage.getItem("Nurture_user_data")
  let user_id = JSON.parse(userData)?.id


  const [step1Value, setStep1Value] = React.useState<any>({})
  const [isMembership, setIsMembership] = React.useState<any>({})
  const [stepValue1, setStepValue1] = React.useState<any>({})
  const [stepValue2, setStepValue2] = React.useState<any>({})
  const [step5Value, setStep5Value] = React.useState<any>("no")
  const [step5ValueYes, setStep5ValueYes] = React.useState<any>({})
  const [step5ValueNo, setStep5ValueNo] = React.useState<any>({})
  const [step1Err, setStep1Err] = React.useState<any>({})
  const [step2Err, setStep2Err] = React.useState<any>({})
  const [stepErr2, setStepErr2] = React.useState<any>({})
  const [step5Err, setStep5Err] = React.useState<any>({})
  const [step5NoErr, setStep5NoErr] = React.useState<any>({})
  const [valueNoStep2, setValueNoStep2] = React.useState<any>({})
  const [selectId, setSelectedId] = React.useState<any>([])
  const [id, setId] = React.useState<any>("")
  const [loading, setLoading] = React.useState(false)
  const [bgImage, setBgImage] = React.useState<any>("main-step1")
  const [isClick, setIsClick] = React.useState<any>({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false
  })
  const [isSignup, setIsSignup] = React.useState(false)
  const [isLogin, setIsLogin] = React.useState(false)
  const [subsDetail, setSubsDetail] = React.useState({})
  const [realValue, setRealValue] = React.useState<any>({})
  let { state }: any = useLocation();
  const [feedingChoice,setFeedingChoice] = React.useState<any>([])

  const allStep = () => {
    return ['Basics', 'Tell us about yourself', 'Select your membership', 'Tell us about your family', 'Tell us about your baby'];
  }
  let user: any = localStorage.getItem("Nurture_user_data");
  user = JSON.parse(user)
  React.useEffect(() => {
    if (user?.is_membership) {
      Navigate(-1)
    }
  }, [])

  let steps = allStep();

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <Step1
            handleNext={stepHandler1}
            value={stepValue1}
            setValue={setStepValue1}
            error={step2Err}
            setError={setStep2Err}
            loading={loading}
            selectId={selectId}
            setSelectedId={setSelectedId}
          />
        );
      case 1:
        return (
          <Step2
            value={stepValue2}
            setValue={setStepValue2}
            error={stepErr2}
            setError={setStepErr2}
            handleNext={setpHandler2}
            loading={loading}
            handleSkip={handleSkip}
            setvalueYes={setStep5ValueYes}
            valueYes={step5ValueYes}
            setNoValue={setStep5ValueNo}
            setValueNo={setValueNoStep2}
            valueNo={valueNoStep2}
            noError={step5NoErr}
            setNoError={setStep5NoErr}
            realValue={realValue}
            setRealValue={setRealValue}
            feedingChoice={feedingChoice}
            setFeedingChoice={setFeedingChoice}
          />

        );
      case 2:
        return (
          <Step3
            handleNext={step3Handler}
            setSubsDetail={setSubsDetail}
            membershipPlan={membershipPlan}
            isMembership={isMembership}
          />
        )
      case 3:
        return (
          <Step4
            value={step1Value}
            data={subsDetail}
            setValue={setStep1Value}
            error={step1Err}
            setError={setStep1Err}
            handleNext={stepHandle4}
            loading={loading}
          />
        )
      case 4:
        return (
          <Step5
            value={step5Value}
            setValue={setStep5Value}
            handleNext={setp5Handler}
            setYesValue={setStep5ValueYes}
            yesValue={step5ValueYes}
            setNoValue={setStep5ValueNo}
            noValue={step5ValueNo}
            setError={setStep5Err}
            error={step5Err}
            noError={step5NoErr}
            setNoError={setStep5NoErr}
            loading={loading}
          />
        )
      default:
        return "Unknown step";
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [membershipPlan, setMembershipPlan] = React.useState([])

  const getMembershipid = async () => {
    let res: any = await getMembershipPlan()
    if (res.data.success) {
      setMembershipPlan(res.data.data)
    }
  }
  React.useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [])
  const handleBeforeUnload = (e: any) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };
  React.useEffect(() => {
    getMembershipid()
  }, [])

  const allField: any = document.getElementsByClassName('error-input');
  // All steps submit handler
  // step 1 api intigration 


  // step 1 submit handler 
  const stepHandler1 = async () => {
    try {

      if (Object.keys(stepValue1).length === 0) {
        setStep2Err({
          current_life_status: "Choose your status",
          zip_code: "Zip code is required",
          dob: "Date of birth is required",
          gender: "Please select gender",
          type_mom: "Choose what type of parent you are",
          industry_id: "Choose industry",
          company_id: "Choose Company",
          // phone: "Phone number is required"
        })
        window.scroll(0, 300)
        return;
      }

      if (!stepValue1.dob || !stepValue1.zip_code || !stepValue1.gender || !stepValue1.type_mom
        // || !stepValue1.phone
        || stepValue1.zip_code.length < 5
        || !stepValue1.current_life_status) {

        let errors: any = {};

        if (!stepValue1.dob) {
          errors.dob = "Date of birth is required"
        }
        if (!stepValue1.zip_code) {
          errors.zip_code = "Zip code is required"
        }
        if (stepValue1.zip_code.length < 5) {
          errors.zip_code = "Zip code should be 5 digit"
        }
        if (!stepValue1.gender) {
          errors.gender = "Please select gender"
        }
        // if (!stepValue1.phone) {
        //   errors.phone = "Phone number is required";
        // }
        if (!stepValue1.type_mom) {
          errors.type_mom = "Choose what type of parent you are"
        }
        if (!stepValue1.current_life_status) {
          errors.current_life_status = "Choose your status";
        }

        await setStep2Err(errors)
        allField[0]?.scrollIntoView({ behavior: "smooth", block: "center" })
        return;
      }
      setLoading(true)
      let formData = new FormData()
      stepValue1.photo && formData.append("photo", stepValue1.photo)
      formData.append("dob", stepValue1.dob)
      formData.append("gender", stepValue1.gender)
      formData.append("type_mom", stepValue1.type_mom)
      stepValue1.industry_id && formData.append("industry_id", stepValue1.industry_id)
      stepValue1.company_id && formData.append("company_id", stepValue1.company_id)
      formData.append("current_life_status", stepValue1.current_life_status)
      formData.append("user_id", user_id)
      stepValue1.company_code && formData.append("company_code", stepValue1.company_code)
      formData.append("zip_code", stepValue1.zip_code)
      formData.append("phone", stepValue1.phone)
      let res: any;
      if (state) {
        res = await company.aboutUs(formData)


      } else {
        res = await signup.aboutUs(formData)

      }

      if (res.data.success === false) {
        let text = "";
        let errors: any = res.data.message
        for (let i = 0; i < errors.length; i++) {
          text += `${i + 1}.  ${errors[i]} \n`
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: text

        })
      }
      if (res.data.success) {
        if (res.data.data.company_code_status == 1) {

          membershipPlan.map((data: any) => {

            if (res.data.data.membership.membership_id === data.id) {
              data.class = "yellow_member"
              data.isSubscription = true;
              return
            }
            data.class = "disable_member"
            return data;
          })
          setIsMembership(res.data.data)
        } else {
          membershipPlan.map((data: any) => {
            data.class = "yellow_member"
            return data;
          })

        }
        setIsClick({
          ...isClick,
          [2]: true
        })
        handleNext()
      }
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Something went wrong"

      })
    }
  }


  const setpHandler2 = async (value: any) => {
    try {
      setLoading(true)
      value.user_id = user_id;
      // setStepValue2(stepValue2)
      let res: any;
      if (state) {
        res = await company.aboutUsFamily(value)
      } else {
        res = await onBoardingFamily(value)
      }

      if (res.data.success === false) {
        let text = "";
        let errors: any = res.data.message

        for (let i = 0; i < errors.length; i++) {
          text += `${i + 1}.  ${errors[i]} \n`
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: text

        })

      }
      if (res.data.success) {
        // if (res.data.data.company_code_status === 1) {
        //   Navigate("/")
        //   return;
        // }
        if (res?.data?.data?.is_membership) {
          localStorage.setItem("Nurture_user_data", JSON.stringify(res?.data?.data));
        }
        handleNext();
        setIsClick({
          ...isClick,
          [2]: true
        })
      }
      setLoading(false)
    }
    catch (error: any) {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Something went wrong"
      })
    }
  }

  const step3Handler = () => {
    setIsClick({
      ...isClick,
      [3]: true
    })
    handleNext()
  }

  let stepHandle4 = (data: any) => {
    setStep5Value(data)
    setIsClick({
      ...isClick,
      [4]: true
    })
    handleNext()
  }

  const setp5Handler = async () => {

    try {

      if (step5Value === 'yes') {
        if (Object.keys(step5ValueYes).length === 0) {
          Swal.fire({
            icon: 'error',
            title: 'input',
            text: 'Please fill all input!'
          })
          return;
        }
        if (!step5ValueYes.due_date || !step5ValueYes.gender) {
          let errors: any = {};
          if (!step5ValueYes.due_date) {
            errors.due_date = "Please select due date"
          }
          if (!step5ValueYes.gender) {
            errors.gender = "Please select gender"
          }
          await setStep5Err(errors)
          allField[0]?.scrollIntoView({ behavior: "smooth", block: "center" })
          return;
        }
        setLoading(true)
        step5ValueYes.user_id = id;
        step5ValueYes.pregnant = "yes"
        setStep5ValueYes(step5ValueYes)

        let res: any;
        if (state) {
          res = await company.aboutBaby(step5ValueYes)
        } else {

          res = await signup.aboutBaby(step5ValueYes)
        }

        if (res.data.success === false) {
          let text = "";
          let errors: any = res.data.message

          for (let i = 0; i < errors.length; i++) {
            text += `${i + 1}.  ${errors[i]} \n`
          }
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: text

          })

        }
        if (res.data.success) {

          setIsClick({
            ...isClick,
            5: true
          })
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "successfully registered"

          })
        }
        setLoading(false)
      }
      if (step5Value === 'no') {

        if (Object.keys(step5ValueNo).length === 0) {
          Swal.fire({
            icon: 'error',
            title: 'input',
            text: 'Please fill all input!'
          })
          return;
        }

        if (!step5ValueNo.first_name || !step5ValueNo.c_section || !step5ValueNo.due_date ||
          !step5ValueNo.feeding_choice || !step5ValueNo.fertility_question || !step5ValueNo.premature) {
          let errors: any = {}
          if (!step5ValueNo.first_name) {
            errors.first_name = "First name is required"
          }
          if (!step5ValueNo.c_section) {
            errors.c_section = "Please tick the value"
          }
          if (!step5ValueNo.due_date) {
            errors.due_date = "Please select date"
          }
          if (!step5ValueNo.feeding_choice) {
            errors.feeding_choice = "Please tick the value"
          }
          if (!step5ValueNo.fertility_question) {
            errors.fertility_question = "Please tick the value"
          }
          if (!step5ValueNo.premature) {
            errors.premature = "Please tick the value"
          }
          setStep5NoErr(errors)
        } else {
          setLoading(true)
          step5ValueNo.user_id = id;
          step5ValueNo.pregnant = "no"
          setStep5ValueNo(step5ValueNo)
          let res: any;
          if (state) {
            res = await company.aboutBaby(step5ValueNo)
          } else {
            res = await signup.aboutBaby(step5ValueNo)
          }
          if (res.data.success === false) {
            let text = "";
            let errors: any = res.data.message

            for (let i = 0; i < errors.length; i++) {
              text += `${i + 1}.  ${errors[i]} \n`
            }
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: text

            })

          }
          if (res?.data?.success === true) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: "successfully registered"

            })
          }

        }
        setLoading(false)
      }
      Navigate(QUICK_SCREENS)
    } catch (error) {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Something went wrong"

      })
    }
  }



  const isStepOptional = (step: number) => {
    return step === 3;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    window.scrollTo(0, 200)
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep === 0) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {

    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  let StepHandlerClick = (data: any) => {

    if (activeStep === data) return
    if (isClick?.[data] === true) {
      setActiveStep(data);
    }
  }

  // for changing background line image

  React.useEffect(() => {
    console.log("active step is ", activeStep)
    switch (activeStep) {
      case 0:
        setBgImage("main-step1")
        break;
      case 1:
        setBgImage("main-step2")
        break;
      case 2:
        setBgImage("main-step3")
        break;
      case 3:
        setBgImage("main-step4")
        break;
      case 4:
        setBgImage("main-step5")
        break;
    }
  }, [activeStep])
  React.useEffect(() => {
    if (state) {
      setActiveStep(state?.step)
      setSubsDetail(state?.param)
    }
  }, [state])
  console.log("check bg image ", step2Err)
  return (
    <div>
      <section className={`steps-section position-relative`}>
        <Popup isSignup={isSignup} isLogin={isLogin} />
        <Box sx={{ width: '100%' }} className={`position-relative ${bgImage}`}>{activeStep > 0 && <button className="membership-back " onClick={handleBack}>BACK</button>}
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
  );
}
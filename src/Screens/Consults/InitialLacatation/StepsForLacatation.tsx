import React, { useEffect, useState } from 'react'
import Steppers from '../../../Common/Stepper/Stepper';
import AppoinmentDetail from './Steps/AppointmentDetail';
import UserInfo from './Steps/UserInfo';
import ChooseDate from './Steps/ChooseDate';
import Payment from './Steps/Payment';
import { getFormFieldApi } from '../../../Service/Cousult.service';

const StepsForLacatation = () => {

  const [formField, setFormField] = useState([])
  const [activeStep, setActiveStep] = useState(1)
  const [formValue, setFormValue] = useState({})

  let steps = [1, 2, 3, 4]
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <ChooseDate />
        );
      case 1:
        return (
          <UserInfo
            field={formField}
            value={formValue}
            setValue={setFormValue}

          />
        );
      case 2:
        return (
          <AppoinmentDetail />
        )
      case 3:
        return (
          <Payment />
        )
      default:
        return "Unknown step";
    }
  }

  const getFormField = async () => {
    try {
      let res: any = await getFormFieldApi({ service_id: 1 })

      if (res?.data?.success) {
        setFormField(res.data.data)
      }

    } catch (error) {
      console.log("error in getting forms", error)
    }
  }

  useEffect(() => {
    getFormField()
  }, [])

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  return (
    <div>
      <Steppers steps={steps} getStepContent={getStepContent}
        activeStep={activeStep} setActiveStep={setActiveStep}
        handleNext={handleNext}
      />

    </div>
  )
}

export default StepsForLacatation;
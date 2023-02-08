import React, { useEffect, useState } from 'react'
import Steppers from '../../../Common/Stepper/Stepper';
import AppoinmentDetail from './Steps/AppointmentDetail';
import UserInfo from './Steps/UserInfo';
import ChooseDate from './Steps/ChooseDate';
import Payment from './Steps/Payment';
import { useLocation } from 'react-router-dom';
import { bookConsultApi, getFormFieldApi, gethostNameApi } from '../../../Service/Cousult.service';
import { getDataFromLocalStorage } from '../../../Service/getLocalStorage';
import CongratsModel from '../../../Common/CongratsPopoup/congratsModel';


const StepsForNurse = () => {

  const [host, setHost] = useState<any>([])
  const [dateVisible, setDateVisible] = useState<Array<number>>([])
  const [date, setDate] = useState<any>({})
  const [activeStep, setActiveStep] = React.useState(0);
  const [serviceId, setServiceId] = useState<any>(1)
  const [formField, setFormField] = useState<any>([])
  const [hostName, setHostName] = useState([])
  const [userInfoVal, setUserInfoVal] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingWash, setLoadingWash] = useState<boolean>(false)
  const [modelOpen, setModelOpen] = useState<boolean>(false)
  const [term_condition, setPolicy] = useState<any>(false)
  const [formErr, setFormErr] = useState<boolean>(false)
  const [objName, setObjName] = useState<any>({})
  const { state }: any = useLocation()
  const [deliveryType,setDeliveryType] = useState<any>([])

  let steps = [1, 2, 3, 4]


  function getStepContent(step: number) {

    switch (step) {
      case 0:
        return (
          <ChooseDate
            data={host}
            value={date}
            host={host}
            setValue={setDate}
            handleNext={handleNext}
            dateVisible={dateVisible}
            loadingWash={loadingWash}
            setDateVisible={setDateVisible}
            setObjName={setObjName}
          />
        );
      case 1:
        return (
          <UserInfo
            handleNext={handleNext}
            error={formErr}
            setError={setFormErr}
            value={userInfoVal}
            setValue={setUserInfoVal}
            handlePrev={handlePrev}
            setPolicy={setPolicy}
            term_condition={term_condition}
            field={formField}
            state={state}
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
          />
        );
      case 2:
        return (
          <AppoinmentDetail
            data={date}
            host={host}
            setData={setDate}
            handleNext={handleNext}
            handleSubmit={confirmHandler}
            setStep={setActiveStep}
            handlePrev={handlePrev}
            objName={objName}
            loading={loading}

          />
        )
      case 3:
        return (
          <Payment
            handleNext={confirmHandler}
            setLoading={setLoading}
            loading={loading}
           
          />
        )
      default:
        return "Unknown step";
    }
  }

  const confirmHandler = async (token: any) => {
    try {
      setLoading(true)
      const localData = getDataFromLocalStorage()
      let param = {
        ...date,
        ...userInfoVal,
        email: localData.email,
        service_id: serviceId,
        first_name: localData.first_name,
        last_name: localData.last_name,
        user_id: localData.id,
        phone: 9123322,
        token: token,
      }
      let res: any = await bookConsultApi(param)
      let message = res?.data?.message
      let allMsg = "";
      for (let i = 0; i < message.length; i++) {
        allMsg += message[i]
      }
      if (res?.data?.success) {
        // debugger
         setModelOpen(true)
         setLoading(false)
        return

      }
      alert(allMsg)
       setLoading(false)

    } catch (error) {
      setLoading(false)
    }
  }
  const getFormField = async (id: any) => {
    try {
      let res: any = await getFormFieldApi({ service_id: id })

      if (res?.data?.success) {
        setFormField(res.data.data)
      }

    } catch (error) {
      console.log("error in getting forms", error)
    }
  }

  const getHostName = async () => {
    try {
      setLoadingWash(true)
      let res: any = await gethostNameApi({ service_prefix: state.param })
      if (res?.data?.success) {
        getFormField(res?.data?.service_id)
        setServiceId(res?.data?.service_id)
        setHost(res.data)
        setLoadingWash(false)
      }

    } catch (error: any) {
      setLoadingWash(false)
    }
  }

  useEffect(() => {
    getHostName()
  }, [])

  const handleNext = () => {
    setActiveStep(activeStep + 1)
    setDateVisible([])
  };

  const handlePrev = () => {
    setActiveStep(activeStep - 1)
  }
  useEffect(() => {
    window.scroll(0, 0)
  }, [activeStep])


  return (
    <div>
      <CongratsModel
        open={modelOpen}
        setOpen={setModelOpen}
        text="Thank you for booking a Consults with Nurture by Naps. "
      />
      <Steppers activeStep={activeStep} steps={steps}
        setActiveStep={setActiveStep}
        handleNext={handleNext}
        getStepContent={getStepContent} />
    </div>
  )
}

export default StepsForNurse;
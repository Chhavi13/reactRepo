import React, { useEffect, useState } from 'react'
import Steppers from '../../../Common/Stepper/Stepper';
import AppoinmentDetail from './Steps/AppoinmentDetail';
import ChooseDate from './Steps/ChooseDate';
import Payment from './Steps/Payment';
import { useLocation } from 'react-router-dom';
import { bookConsultApi, getFormFieldApi, gethostNameApi } from '../../../Service/Cousult.service';
import { getDataFromLocalStorage } from '../../../Service/getLocalStorage';
import CongratsModel from '../../../Common/CongratsPopoup/congratsModel';
import UserInfo2 from './Steps/UserInfo2';
// import ChooseDate from './Steps/ChooseDate';

const StepsForPrivateSleep = () => {

    const { state }: any = useLocation()
    let steps = [1, 2, 3, 4]
    const [hostName, setHostName] = useState<any>([])
    const [userInfoVal, setUserInfoVal] = useState<any>([])
    const [activeStep, setActiveStep] = React.useState(0);
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingWash, setLoadingWash] = useState<boolean>(false)
    const [dateVisible, setDateVisible] = useState<Array<number>>([])
    const [modelOpen, setModelOpen] = useState<boolean>(false)
    const [term_condition, setPolicy] = useState(false)
    const [formField, setFormField] = useState<any>([])
    const [date, setDate] = useState<any>({})
    const [serviceId, setServiceId] = useState<any>(1)
    const [objName, setObjName] = useState<any>({})

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return (
                    <ChooseDate
                        data={hostName}
                        value={date}
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
                    <UserInfo2
                        handleNext={handleNext}
                        value={userInfoVal}
                        setValue={setUserInfoVal}
                        handlePrev={handlePrev}
                        setPolicy={setPolicy}
                        term_condition={term_condition}
                        field={formField}
                        state={state}
                    />
                );
            case 2:
                return (
                    <AppoinmentDetail
                        host={hostName}
                        data={date}
                        setData={setDate}
                        handleSubmit={buyConsultHandler}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        loading={loading}
                        setStep={setActiveStep}
                        objName={objName}
                    />
                );
            case 3:
                return(
                    <Payment
                    handleNext={buyConsultHandler}
                    />
                )    
            default:
                return "Unknown step";
        }
    }
    const getHostName = async () => {

        try {
            setLoadingWash(true)
            let res: any = await gethostNameApi({ service_prefix: state?.param })
            if (res?.data?.success) {
                getFormField(res?.data?.service_id)
                setServiceId(res?.data?.service_id)
                setHostName(res.data)
                setLoadingWash(false)
            }

        } catch (error: any) {
            setLoadingWash(false)
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

    const buyConsultHandler = async (token: any) => {
        try {
          setLoading(true)
          const localData = getDataFromLocalStorage()
    
          let param = {
            ...date,
            ...userInfoVal,
            email: localData.email,
            service_id: serviceId,
            service_name: state?.param,
            first_name: localData.first_name,
            last_name: localData.last_name,
            user_id: localData.id,
            // calendar_id: state?.data?.acuity_calendar_id,
            phone: 9123322,
            term_condition:term_condition,
            appointment_type_id: hostName?.acuity_appointment_type_id
          }
          let res: any = await bookConsultApi(param)
          let message = res?.data?.message
          let allMsg = "";
          for (let i = 0; i < message.length; i++) {
            allMsg += message[i]
          }
          if (res?.data?.success) {
            setModelOpen(true)
            setLoading(false)
            return;
          }
          alert(allMsg)
    
          //ali
          setLoading(false)
    
        } catch (error) {
          setLoading(false)
        }
      }




    useEffect(() => {
        getHostName()
    }, [])

    useEffect(() => {
        window.scroll(0, 0)
    }, [activeStep])

    const handleNext = () => {
        setActiveStep(activeStep + 1)
        setDateVisible([])
    };

    const handlePrev = () => {
        setActiveStep(activeStep - 1)
    }
    console.log(objName)
    return (
        <div>
            <CongratsModel
                open={modelOpen}
                setOpen={setModelOpen}
                text="Thank you for booking a Consults with Nurture by Naps. "
            />
            <Steppers steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                getStepContent={getStepContent}
                handleNext={handleNext} />
        </div>
    )
}

export default StepsForPrivateSleep;
import React, { useEffect, useState } from 'react'
import Steppers from '../../../Common/Stepper/Stepper';
import AppoinmentDetail from './Steps/AppointmentDetail';
import UserInfo from './Steps/UserInfo';
import ChooseDate from './Steps/ChooseDate';
import { bookConsultApi, getGroupConsultApi } from '../../../Service/Cousult.service';
import { getDataFromLocalStorage } from '../../../Service/getLocalStorage';
import { useLocation } from 'react-router-dom';
import CongratsModel from '../../../Common/CongratsPopoup/congratsModel';
// import Payment from './Steps/Payment';


const StepsForDate = () => {

    const { state }: any = useLocation();
    

    const [activeStep, setActiveStep] = useState(0)
    const [data, setData] = useState<any>({});
    const [date, setDate] = useState({})
    const [value, setValue] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingWash, setLoadingWash] = useState<boolean>(false)
    const [userInfoVal, setUserInfoVal] = useState<any>([])
    const [term_condition, setPolicy] = useState(false)
    const [modelOpen, setModelOpen] = useState(false)
    const [objName,setObjName] = useState<any>({})
    

    let steps = [1, 2, 3]
    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return (
                    <ChooseDate
                        data={data}
                        setData={setData}
                        value={date}
                        setValue={setDate}
                        loadingWash={loadingWash}
                        handleNext={handleNext}
                        setObjName={setObjName}
                    />
                );
            case 1:
                return (
                    <UserInfo
                        handleNext={handleNext}
                        value={userInfoVal}
                        setValue={setUserInfoVal}
                        handlePrev={handlePrev}
                        setPolicy={setPolicy}
                        term_condition={term_condition}
                    />
                );
            case 2:
                return (
                    <AppoinmentDetail
                        host={data}
                        data={date}
                        handleSubmit={confirmHandler}
                        handlePrev={handlePrev}
                        loading={loading}
                        setStep={setActiveStep}
                        objName={objName}
                        
                    />
                )
            // case 3:
            //     return (
            //         <Payment />
            //     )
            default:
                return "Unknown step";
        }
    }


    const getData = async () => {
        try {
            setLoadingWash(true)
            let res: any = await getGroupConsultApi({ service_prefix: state.param })
            // debugger
            if (res?.data?.success) {
                setData(res?.data)
                setLoadingWash(false)
            }
        } catch (error: any) {
            setLoadingWash(false)
        }
    }

    const confirmHandler = async () => {
        try {
            setLoading(true)
            const localData = getDataFromLocalStorage()
            let param = {
                ...date,
                ...userInfoVal,
                email: localData.email,
                service_id: data?.service_id,
                // service_name: state?.data?.title,
                first_name: localData.first_name,
                last_name: localData.last_name,
                user_id: localData.id,
                // calendar_id: state?.data?.acuity_calendar_id,
                phone: 9123322,
                // appointment_type_id: state?.data?.acuity_appointment_type_id
            }
            let res: any = await bookConsultApi(param)
            // debugger

           
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
        getData()
    }, [])


    const handleNext = () => {
        setActiveStep(activeStep + 1)
    }
    const handlePrev = () => {
        setActiveStep(activeStep - 1)
    }
    return (
        <div>
            <CongratsModel
                open={modelOpen}
                setOpen={setModelOpen}
                text="Thank you for booking a Support groups with Nurture by Naps. "
             
               
            />
            <Steppers steps={steps} getStepContent={getStepContent}
                activeStep={activeStep} setActiveStep={setActiveStep}
                handleNext={handleNext}
            />

        </div>
    )
}

export default StepsForDate;
// import { setDate } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CongratsModel from '../../../Common/CongratsPopoup/congratsModel';
import Steppers from '../../../Common/Stepper/Stepper';
import { getMultipleClassApi, multipleClassBookingApi, multipleGroupClassBooking } from '../../../Service/Cousult.service';
import { getDataFromLocalStorage } from '../../../Service/getLocalStorage';
import AppoinmentDetail from './Steps/AppoinmentDetail';
import ChooseDate from './Steps/ChooseDate';
import Payment from './Steps/Payment';
import UserInfo from './Steps/userInfo';
import UserInfo2 from './Steps/userInfo2';
import './multipleClassStep.scss';

const MultipleClassStep = () => {

    let steps = [1, 2, 3, 4]

    const [modelOpen, setModelOpen] = useState<boolean>(false)
    const [activeStep, setActiveStep] = useState(0);
    const [policy, setPolicy] = useState<boolean>(false)
    const [term_condition, setTermPolicy] = useState<boolean>(false)
    const [userInfoVal, setUserInfoVal] = useState<any>([])
    const [host, setHost] = useState<any>([])
    const [date, setDate] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingWash, setLoadingWash] = useState<boolean>(false)
    const [dateVisible, setDateVisible] = useState<Array<number>>([])
    const [objName, setObjName] = useState({})
    const { state }: any = useLocation()

    function getStepContent(step: number) {

        switch (step) {
            case 0:
                return (
                    <ChooseDate
                        data={host}
                        value={date}
                        setValue={setDate}
                        loadingWash={loadingWash}
                        handleNext={handleNext}
                        setDateVisible={setDateVisible}
                        dateVisible={dateVisible}
                        setObjName={setObjName}

                    />
                );
            case 1:
                return (

                    state?.param === "service_8" ?
                        <UserInfo2
                            handleNext={handleNext}
                            value={userInfoVal}
                            setValue={setUserInfoVal}
                            handlePrev={handlePrev}
                            term_condition={term_condition}
                            setTermPolicy={setTermPolicy}
                        /> :
                        <UserInfo
                            handleNext={handleNext}
                            value={userInfoVal}
                            setValue={setUserInfoVal}
                            handlePrev={handlePrev}
                            setPolicy={setPolicy}
                            policy={policy}
                        />
                );
            case 2:
                return (
                    <AppoinmentDetail
                        data={date}
                        setData={setDate}
                        handleNext={handleNext}
                        handleSubmit={buyConsultHandler}
                        loading={loading}
                        setStep={setActiveStep}
                        handlePrev={handlePrev}
                        host={host}
                        setDateVisible={setDateVisible}
                        dateVisible={dateVisible}
                        objName={objName}
                    />
                )
            case 3:
                return (
                    <Payment
                        handleNext={buyConsultHandler}
                    />
                )
            default:
                return "Unknown step";
        }
    }


    const handleNext = () => {
        setActiveStep(activeStep + 1)
    };

    const handlePrev = () => {
        setActiveStep(activeStep - 1)
    }
    const getClassData = async () => {

        try {
            setLoadingWash(true)
            const prefix = {
                service_prefix: state?.param

            }
            const res: any = await getMultipleClassApi(state?.param, prefix)
            if (res?.data?.success) {
                setHost(res?.data)
                setLoadingWash(false)
            }

        } catch (error) {
            console.log("Error", error)
            setLoadingWash(false)
        }
    }
    useEffect(() => {
        getClassData()
    }, [])
    const buyConsultHandler = async (token: any) => {

        try {
            setLoading(true)
            const localData = getDataFromLocalStorage()


            let param = {
                ...date,
                ...userInfoVal,
                email: localData.email,
                service_id: host?.service_id,
                service_name: host?.service_name,
                first_name: localData.first_name,
                last_name: localData.last_name,
                user_id: localData.id,
                phone: 9123322,
                token: token,

            }
            let res: any = await multipleGroupClassBooking(param)
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
    console.log("all data", host)
    console.log("all date", date)
    return (
        <div>
            <CongratsModel
                open={modelOpen}
                setOpen={setModelOpen}
                text="Thank you for booking a Support groups with Nurture by Naps. "
            />
            <Steppers activeStep={activeStep} steps={steps}
                setActiveStep={setActiveStep}
                handleNext={handleNext}
                getStepContent={getStepContent} />
        </div>
    )
}

export default MultipleClassStep;
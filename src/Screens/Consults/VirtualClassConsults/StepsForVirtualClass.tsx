import React, { useEffect, useState } from 'react'
import Steppers from '../../../Common/Stepper/Stepper';
import AppoinmentDetail from './Steps/AppointmentDetail';
import UserInfo from './Steps/UserInfo';
import ChooseDate from './Steps/ChooseDate';
import Payment from './Steps/Payment';
import { getAddonClassApi, getMultipleClassApi, getVirtualClassDateApi, multipleClassBookingApi } from '../../../Service/Cousult.service';
import { getDataFromLocalStorage } from '../../../Service/getLocalStorage';
import { id } from 'date-fns/locale';
import CongratsModel from '../../../Common/CongratsPopoup/congratsModel';
import MultipleSlots from './Steps/MultipleSlots';
// import "../consult.scss";


const StepsForVirtualClass = ({ state }: any) => {
    console.log('service', state)
    const [activeStep, setActiveStep] = useState(0)
    const [hostData, setHostData] = useState<any>([])
    const [classData, setClassData] = useState<any>([])
    const [dateVisible, setDateVisible] = useState<Array<number>>([])
    const [date, setDate] = useState<any>({})
    const [serviceId, setServiceId] = useState<any>()
    const [formField, setFormField] = useState<any>([])
    const [classTime, setClassTime] = useState<any>([])
    const [userInfoVal, setUserInfoVal] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingWash, setLoadingWash] = useState<boolean>(false)
    const [modelOpen, setModelOpen] = useState<boolean>(false)
    const [term_condition, setPolicy] = useState<any>(false)
    let [price, setPrice] = useState<any>("")
    const [slots, setSlots] = useState<any>({})
    // const [id,setServiceId] = useState<any>()
    const [priceArry, setPriceArry] = useState<any>([])
    const [addOn, setAddOn] = React.useState<any>([])

    const [hostObj, setHostObj] = useState<any>({})

    const [objName, setObjName] = useState<any>({})
    const [serviceName, setServiceName] = useState<any>({})
    const [priceDisplay, setPriceDisplay] = useState<any>({
        price: price,
        actualPrice: price
    })

    const [selectClasses, setSelectClasses] = useState<any>([])
    const [selectSlots, setSelectSlots] = useState<any>([])
    let steps = [1, 2, 3, 4, 5]
    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return (
                    <ChooseDate
                        hostObj={hostObj}
                        objName={objName}
                        host={hostData}
                        data={classData}
                        handleNext={handleNext}
                        dateVisible={dateVisible}
                        loadingWash={loadingWash}
                        setDateVisible={setDateVisible}
                        value={date}
                        setValue={setDate}
                        price={price}
                        setPrice={setPrice}
                        setObjName={setObjName}
                        slots={slots}
                        setSlots={setSlots}

                        setAddOn={setAddOn}
                        setSelectClasses={setSelectClasses}
                        setSelectSlots={setSelectSlots}
                        setClassTime={setClassTime}
                        priceArry={priceArry}
                        setPriceArry={setPriceArry}
                        setPriceDisplay={setPriceDisplay}
                    />
                );
            case 1:
                return (
                    <MultipleSlots
                        objName={objName}
                        hostObj={hostObj}
                        data={classData}
                        handleNext={handleNext}
                        dateVisible={dateVisible}
                        setDateVisible={setDateVisible}
                        value={date}
                        setValue={setDate}
                        price={price}
                        slots={slots}
                        setSlots={setSlots}
                        priceArry={priceArry}
                        setPriceArry={setPriceArry}
                        addOn={addOn}
                        setAddOn={setAddOn}
                        priceDisplay={priceDisplay}
                        setPriceDisplay={setPriceDisplay}
                        classTime={classTime}
                        setClassTime={setClassTime}
                        selectClasses={selectClasses}
                        setSelectClasses={setSelectClasses}
                        selectSlots={selectSlots}
                        setSelectSlots={setSelectSlots}
                    />
                )
            case 2:
                return (
                    <UserInfo
                        handleNext={handleNext}
                        value={userInfoVal}
                        setValue={setUserInfoVal}
                        handlePrev={handlePrev}
                        setPolicy={setPolicy}
                        term_condition={term_condition}
                        field={formField}
                    />
                );
            case 3:
                return (
                    <AppoinmentDetail
                        price={price}
                        serviceName={serviceName}
                        hostObj={hostObj}
                        data={date}
                        setData={setDate}
                        handleSubmit={buyConsultHandler}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        loading={loading}
                        setStep={setActiveStep}
                        objName={objName}
                        addOn={addOn}
                        setAddOn={setAddOn}
                        setDateVisible={setDateVisible}
                        setSlots={setSlots}
                        setSelectClasses={setSelectClasses}
                        setSelectSlots={setSelectSlots}
                        setClassTime={setClassTime}
                        setPrice={setPrice}
                        priceDisplay={priceDisplay}
                        setPriceDisplay={setPriceDisplay}
                        setPriceArry={setPriceArry}
                    />
                )
            case 4:
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
    }
    const handlePrev = () => {
        setActiveStep(activeStep - 1)
    }
    const getClassData = async () => {
        try {
            let prefix = {
                service_prefix: state?.param
            }
            setLoadingWash(true)
            let res: any = await getVirtualClassDateApi(state?.param, prefix)
            if (res?.data?.success) {
                setHostData(res?.data?.data)
                setPrice(res?.data?.data[0]?.price)
                setServiceId(res.data.service_id)
                setHostObj(res?.data?.data[0])
                setServiceName(res?.data)
                setLoadingWash(false)
            }
        } catch (err) {
            console.log(err)
            setLoadingWash(false)
        }
    }


    const getAddonClass = async () => {
        try {
            let res: any = await getAddonClassApi({ service_prefix: state?.param })
            if (res?.data?.success) {
                setClassData(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAddonClass()
        getClassData()
    }, [])
    useEffect(() => {
        setPrice(date?.total_ammount)
    }, [])
    useEffect(()=>{
        setPriceDisplay({
            price: price,
            actualPrice: price
        })
    },[price])
    
    const buyConsultHandler = async (token: any) => {
        try {
            // debugger
            setLoading(true)
            const localData = getDataFromLocalStorage()

            // debugger
            let param = {
                ...date,
                ...userInfoVal,
                email: localData.email,
                service_id: serviceId,
                service_name: state?.param,
                first_name: localData.first_name,
                last_name: localData.last_name,
                user_id: localData.id,
                phone: 9123322,
                token: token,

            }

            // let param = {
            //     ...date,
            //     ...userInfoVal,
            //     phone:9123322,
            //     token:token              

            // }
            let res: any = await multipleClassBookingApi(param)
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
    console.log("all price view", priceDisplay)
    console.log('data', date)
    console.log(selectClasses)
    console.log(selectSlots)
    console.log(price)
    // console.log(date)
    return (
        <div>
            <CongratsModel
                open={modelOpen}
                setOpen={setModelOpen}
                text="Thank you for booking a Consults with Nurture by Naps. "
            />
            <Steppers steps={steps} getStepContent={getStepContent}
                activeStep={activeStep} setActiveStep={setActiveStep}
                handleNext={handleNext}
            />

        </div>
    )
}

export default StepsForVirtualClass
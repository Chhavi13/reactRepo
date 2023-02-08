import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CongratsModel from '../../../Common/CongratsPopoup/congratsModel';
import Steppers from '../../../Common/Stepper/Stepper';
import { getAddonForPreBabyApi, getPreBabyBootcampApi, multipleClassBookingApi } from '../../../Service/Cousult.service';
import { getDataFromLocalStorage } from '../../../Service/getLocalStorage';
import AppoinmentDetail from './Steps/AppoinmentDetail';
import ChooseDate from './Steps/ChooseDate';
import Payment from './Steps/Payment';
import SingleAddClass from './Steps/SingleAddClass';
import UserInfo from './Steps/UserInfo';
import "../consult.scss";

function StepForPrebabyConsults({ state }: any) {

  const [activeStep, setActiveStep] = React.useState(0)
  const [hostData, setHostData] = useState<any>([])
  const [addClass, setAddClass] = useState<any>([])
  const [userInfoVal, setUserInfoVal] = useState<any>([])
  const [dateVisible, setDateVisible] = useState<Array<number>>([])
  const [date, setDate] = useState<any>({})
  const [serviceId, setServiceId] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingWash, setLoadingWash] = useState<boolean>(false)
  const [modelOpen, setModelOpen] = useState<boolean>(false)
  const [term_condition, setPolicy] = useState<any>(false)
  const [slots, setSlots] = useState<any>([])
  let [price, setPrice] = useState<any>()
  const [priceArry, setPriceArry] = useState<any>([])

  const [objName, setObjName] = useState<any>({})
  const [addOn, setAddOn] = React.useState<any>({})
  const [selectClasses, setSelectClasses] = React.useState<any>([])
  const [selectSlots, setSelectSlots] = React.useState<any>([])
  const [classTime, setClassTime] = useState<any>([])
  let steps = [1, 2, 3, 4, 5]


  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <ChooseDate
            host={hostData}
            // setData={setData}
            value={date}
            setValue={setDate}
            loadingWash={loadingWash}
            dateVisible={dateVisible}
            setDateVisible={setDateVisible}
            handleNext={handleNext}
            setObjName={setObjName}
            slots={slots}
            setSlots={setSlots}

            price={price}
            setPrice={setPrice}
            setAddOn={setAddOn}
            setSelectClasses={setSelectClasses}
            setSelectSlots={setSelectSlots}
            setClassTime={setClassTime}
          />
        );
      case 1:
        return (
          <SingleAddClass
            data={addClass}
            objName={objName}
            handleNext={handleNext}
            dateVisible={dateVisible}
            loadingWash={loadingWash}
            setDateVisible={setDateVisible}
            value={date}
            setValue={setDate}
            price={price}
            setPrice={setPrice}
            slots={slots}
            setSlots={setSlots}
            priceArry={priceArry}
            setPriceArry={setPriceArry}
            setAddOn={setAddOn}
            addOn={addOn}
            selectClasses={selectClasses}
            setSelectClasses={setSelectClasses}
            selectSlots={selectSlots}
            setSelectSlots={setSelectSlots}
            classTime={classTime}
            setClassTime={setClassTime}
          />
        );
      case 2:
        return (
          <UserInfo
            state={state}
            handleNext={handleNext}
            value={userInfoVal}
            setValue={setUserInfoVal}
            handlePrev={handlePrev}
            setPolicy={setPolicy}
            term_condition={term_condition}
          />
        )
      case 3:
        return (
          <AppoinmentDetail
            host={hostData}
            objName={objName}
            data={date}
            setData={setDate}
            handleSubmit={buyConsultHandler}
            handlePrev={handlePrev}
            handleNext={handleNext}
            loading={loading}
            setStep={setActiveStep}
            dateVisible={dateVisible}
            setDateVisible={setDateVisible}
            price={price}
            setPrice={setPrice}
            slots={slots}
            setSlots={setSlots}
            setAddOn={setAddOn}
            setSelectClasses={setSelectClasses}
            setSelectSlots={setSelectSlots}
            setClassTime={setClassTime}
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


  const getHostApi = async () => {
    try {
      setLoadingWash(true)
      let prefix = {
        service_prefix: state?.param
      }
      let res: any = await getPreBabyBootcampApi(state?.param, prefix)
      if (res?.data?.success) {

        setHostData(res?.data?.data)
        setPrice(res?.data?.data[0]?.price)
        setServiceId(res.data.service_id)
        setLoadingWash(false)
      }
    } catch (err) {
      setLoadingWash(false)
      console.log(err)
    }
  }
  const getAddonApi = async () => {
    try {
      let res: any = await getAddonForPreBabyApi({ service_prefix: state?.param })
      setAddClass(res?.data?.data)
    } catch (err) {
      console.log(err)
    }
  }


  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handlePrev = () => {
    setActiveStep(activeStep - 1)
  }

  useEffect(() => {
    getHostApi()
    getAddonApi()
  }, [])
  useEffect(() => {
    setPrice(date?.total_ammount)
  }, [])

  const buyConsultHandler = async (token: any) => {
    try {
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
  // console.log("term_condition", term_condition)
  // console.log("hostData", hostData)
  // console.log("objName", objName)
  // console.log("value", userInfoVal)
  // console.log('addClass', addClass)
  // console.log("slots===================slots==============>", slots)
  return (
    <div>
      <CongratsModel open={modelOpen}
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

export default StepForPrebabyConsults

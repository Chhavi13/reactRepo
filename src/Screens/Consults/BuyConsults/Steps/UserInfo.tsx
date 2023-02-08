import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import ConsultForm from '../../../../Common/Consults/dynamicForm';

const UserInfo = ({ handleNext, value, setValue, handlePrev, policy, setPolicy, field }: any) => {
  const [errors, setErrors] = useState<any>({})
  const [term_condition, setTermPolicy] = useState<boolean>(false)

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
  //   let name = e.target.name;
  //   let inputValue = e.target.value
  //   setValue({
  //     ...value,
  //     [name]: inputValue
  //   })
  //   // if (value.length === 0) {
  //   //   setValue([{
  //   //     id: name,
  //   //     "value": inputValue
  //   //   }])
  //   // } else if (value.some((item: any) => item.id === name)) {
  //   //   let newValue = value.map((oValue: any) => {
  //   //     if (oValue.id === name) {
  //   //       oValue.value = inputValue
  //   //     }
  //   //     return oValue;
  //   //   })
  //   //   setValue(newValue)

  //   // } else {
  //   //   setValue([...value,
  //   //   {
  //   //     id: name,
  //   //     "value": inputValue
  //   //   }
  //   //   ])


  //   // }

  // }
  // const dateHandler = (date: Date | null) => {
  //   setErrors({
  //     ...errors,
  //     ["child_birthday"]: ""
  //   })
  //   setValue({
  //     ...value,
  //     ["child_birthday"]: date
  //   })
  // }


  // const handleSubmit = () => {

  //   if (!value?.child_birthday || !term_condition || !value?.about_yourself || !value?.first_baby || !value?.address) {
  //     let error: any = {}
  //     if (!value?.child_birthday) {
  //       error.child_birthday = "Please select date"
  //     }
  //     if (!value?.first_baby) {
  //       error.first_baby = "Please input the value"
  //     }
  //     if (!value?.address) {
  //       error.address = "Please input the value"
  //     }
  //     if (!value?.about_yourself) {
  //       error.about_yourself = "Please input the value"
  //     }
  //     if (!term_condition) {
  //       error.term_condition = "Please check the policy"
  //     }
  //     if (!value?.phone) {
  //       error.phone = "Phone number is required"
  //     }
  //     setErrors(error)
  //   } else {

  //     handleNext(value)
  //   }
  // }

  // const policyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // let checked = e.target.checked;
  //   setErrors({
  //     ...errors,
  //     ["policy"]: ""
  //   })
  //   setPolicy(e.target.checked)
  // }
  // console.log("all value", value)
  // console.log('plsfsdlsdldf',term_condition)

  return (
    <section className='step-container step2 user-info'>
      <ConsultForm
        handleNext={handleNext} value={value}
        setValue={setValue} handlePrev={handlePrev}
        // handleChange={handleChange}
        term_condition={term_condition}
        setTermPolicy={setTermPolicy}
        // setTermPolicy={setTermPolicy}
        // policy={policy}
        // state={state}
      />
    </section>
  )
}

export default UserInfo;
import React from 'react'
import ConsultForm from '../../../../Common/Consults/dynamicForm';

const UserInfo = ({ handleNext, value, setValue, handlePrev, policy, setPolicy }: any) => {
    const [term_condition, setTermPolicy] = React.useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        let name = e.target.name;
        let inputValue = e.target.value
        setValue({
            ...value,
            [name]: inputValue
        })

    }
    return (
        <div>
            <ConsultForm
                handleNext={handleNext} value={value}
                setValue={setValue} handlePrev={handlePrev}
                handleChange={handleChange}
                term_condition={term_condition}
                setTermPolicy={setTermPolicy}
            />
        </div>
    )
}

export default UserInfo;
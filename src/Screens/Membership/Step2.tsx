import "./Membership.scss";
import React, { useState } from 'react'
import "./Membership.scss";
import Congrats from "../../Assets/img/signup/Congratulations.svg"
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CircularProgress } from '@mui/material';
import { emailRegex } from "../../Utils/constant";
import Swal from "sweetalert2";
import Autocomplete from '@mui/material/Autocomplete';
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const Gender = [
    { label: 'Boy', value: "Boy", name: 'gender' },
    { label: 'Girl', value: "Girl", name: 'gender' },
    { label: 'It’s a Surprise', value: "It’s a Surprise", name: 'gender' },
    { label: 'it’s multiples', value: "it’s multiples", name: 'gender' },
]
const Gender1 = [
    { label: 'Boy', value: "Boy", name: 'first_gender' },
    { label: 'Girl', value: "Girl", name: 'first_gender' },
    { label: 'It’s a Surprise', value: "It’s a Surprise", name: 'first_gender' },
    { label: 'it’s multiples', value: "it’s multiples", name: 'first_gender' },
]
const Gender2 = [
    { label: 'Boy', value: "Boy", name: 'second_gender' },
    { label: 'Girl', value: "Girl", name: 'second_gender' },
    { label: 'It’s a Surprise', value: "It’s a Surprise", name: 'second_gender' },
    { label: 'it’s multiples', value: "it’s multiples", name: 'second_gender' },
]

const Step2 = ({ handleSkip, value, setValue, loading, isSkip,
    handleNext, valueYes, error, setvalueYes, setError, valueNo, setValueNo, realValue, setRealValue, feedingChoice, setFeedingChoice }: any) => {


    // const [valueYes, setvalueYes] = useState<any>({})
    // const [valueNo, setValueNo] = useState<any>({})
    // const [realValue, setRealValue] = useState<any>({})
    const [addChild, setAddChild] = useState<any>([])
    const [addOption, setAddOption] = useState<any>([])


    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let name = e.target.name;
        let inputValue = e.target.value;
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        setError({
            ...error,
            [name]: ""
        })

        if (name === "email") {

            if (inputValue.match(emailRegex)) {
                setError({
                    ...error,
                    [name]: ""
                })

            } else {
                setError({
                    ...error,
                    [name]: "Invalid email"
                })
            }
        }

        setRealValue({
            ...realValue,
            [name]: inputValue
        })
        setValue({
            ...value,
            [name]: inputValue
        })

    }
    console.log("valuessss from here", value)

    function yesHandleChange(event: Date | null | any, dValues?: any): void {

        var date = moment(event)
        var now = moment();


        if (event instanceof Date) {
            if (now < date) {
                setError({
                    ...error,
                    ["due_date"]: ""
                });
                setvalueYes({
                    ...valueYes,
                    ["due_date"]: moment(event).format("YYYY-MM-DD")
                });
                return;
            }

            else {
                setvalueYes({
                    ...valueYes,
                    ["due_date"]: moment(event).format("YYYY-MM-DD")
                });
                // setError({
                //     ...error,
                //     ["due_date"]: "Invalid date"
                // })
                return;
            }
        } else {
            // setError({
            //     ...error,
            //     ["due_date"]: "Invalid date"
            // })
            // return;            
        }

        if (event?.target?.id?.search("Gender") === 0) {
            setError({
                ...error,
                ["expected_baby_gender"]: ""
            })
            setvalueYes({
                ...valueYes,
                ["expected_baby_gender"]: dValues.label
            })
            return
        }
        // setError({
        //     ...error,
        //     ["due_date"]: "Invalid Date"
        // })
        // setError({
        //     ...error,
        //     [event?.target?.name]: "Invalid Date"
        // })
        setvalueYes({
            ...valueYes,
            [event?.target?.name]: event.target.value
        })


    }

    let changeHandler = (e: any) => {

        let name = e.target.name;
        let inputValue = e.target.value;
        setError({
            ...error,
            [name]: ""
        })

        setRealValue({
            ...realValue,
            [name]: inputValue
        })
        setValue({
            ...value,
            [name]: inputValue
        })

    }


    let noValueHandler = async (e: any, dValues?: any) => {
        // debugger
        var date = moment(e)
        var now = moment()
        if (e instanceof Date) {
            setError({
                ...error,
                ["dob"]: "Invalid date"
            })
            if (now > date) {
                setError({
                    ...error,
                    ["dob"]: ""
                })
                setValueNo({
                    ...valueNo,
                    [dValues]: moment(e).format("YYYY-MM-DD")
                })
                return;
            } else {
                setValueNo({
                    ...valueNo,
                    ["dob"]: ""
                })
                setError({
                    ...error,
                    ["dob"]: "Invalid date"
                })
                return;
            }
        }
        if (e?.target?.id?.search("Gender") === 0) {

            setError({
                ...error,
                ["gender"]: ""
            })
            setValueNo({
                ...valueNo,
                [dValues?.name]: dValues.label
            })
            return
        }

        let inputValue = e?.target?.value;
        let name = e?.target?.name;

        setError({
            ...error,
            [name]: ""
        })
        setValueNo({
            ...valueNo,
            [name]: inputValue
        })
        await setValue(value)
    }
    const feedingChoiceHandler = (e: any) => {
        let inputValue = e.target.value;
        let name = e.target.name
        let arr: any
        if (e.target.checked) {
            arr = [...feedingChoice, inputValue]
            setFeedingChoice(arr)
        } else {
            // // let index = arr.indexOf(inputValue)
            // // arr.splice(index, 1)
            arr = feedingChoice.filter((item: any) => item !== e.target.value)
            setFeedingChoice(arr)
        }
        setValueNo({
            ...valueNo,
            [name]: arr
        })
    }
    const handleAddChild = (val: number) => {
        if (!addChild.includes(val)) {
            setAddChild([val])
        } else if (addChild.length < 2) {
            setAddChild([...addChild, val + 1])
        }
    }
    const handleDelete = (id: number) => {
        let result = addChild.filter((item: number, index: number) => index !== id)
        setAddChild(result)
        if (id == 0) {
            setvalueYes({
                ...valueYes,
                ['another_child_gender_1']: ''
            })
        }
        if (id == 1) {
            setvalueYes({
                ...valueYes,
                ['another_child_gender_2']: ''
            })
        }
    }
    const handleAddNewChild = (id: number) => {
        // debugger
        // if (addOption.includes(id)) {
        //     setAddOption([])
        // } else {
        //     setAddOption([id])
        // }
        if (!addOption.includes(id)) {
            setAddOption([id])
        } else if (addOption.length < 2) {
            setAddOption([...addOption, id + 1])
        }
    }
    let handleCheck = async () => {


        if (!realValue.pregnant) {
            value = realValue;
            // await setValue(value)
        }

        if (realValue?.pregnant === "yes") {
            let obj = { ...realValue, ...valueYes }
            value = obj;
            // await setValue(value)

        }
        if (realValue?.pregnant === "no") {
            let obj1 = { ...realValue, ...valueNo }
            value = obj1;
            // await setValue(value)
        }

        await setValue(value)
        // if (Object.keys(value).length === 0) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'input',
        //         text: 'Please fill all input!'
        //     })
        //     return;
        // }

        let errors: any = {}
        if (!value.pregnant || value.pregnant === "no" && (!value.baby_first_name || !value.dob
            || !value.feeding_choice || !value.fertility_question || !value.baby_premature) ||
            value.pregnant === "yes" && (!value.due_date || !value.expected_baby_gender) || value.email && !emailRegex.test(value.email)) {

            if (value.email && !emailRegex.test(value.email)) {
                errors.email = "Email in not valid"
            }
            if (!value.pregnant) {
                errors.pregnant = "Please select value"
            }

            if (value.pregnant === "yes" && (!value.due_date || !value.gender)) {
                if (!value.due_date) {
                    errors.due_date = "Please select due date";
                }
                if (!value.expected_baby_gender) {
                    errors.expected_baby_gender = "Please select baby's gender";
                }
            }
            if (value.pregnant === "no" && (!value.baby_first_name || !value.dob
                || !value.feeding_choice || !value.fertility_question || !value.baby_premature)) {
                // if (!value.due_date) {
                //     errors.due_date = "Please select due date"
                // }
                if (!value.baby_first_name) {
                    errors.baby_first_name = "Please enter your baby's first name"
                }
                if (!value.dob) {
                    errors.dob = "Please enter birth date"
                }
                // if (!value.c_section) {
                //     errors.c_section = "Please select any option"
                // }
                if (!value.feeding_choice) {
                    errors.feeding_choice = "Please select any option"
                }
                if (!value.fertility_question) {
                    errors.fertility_question = "Please select any option"
                }
                if (!value.baby_premature) {
                    errors.baby_premature = "Please select any option"
                }

            }
            await setError(errors)
            let errorClass: any = document.getElementsByClassName("error-input")

            errorClass[0]?.scrollIntoView({ behavior: "smooth", block: "center" })
            return;
        } else {

            handleNext(value);
        }
    }
    console.log(feedingChoice)
    console.log(valueNo)
    console.log(valueYes)
    console.log(realValue)
    console.log(addChild)
    console.log(addOption)
    return (
        <div>
            <ToastContainer />
            <div className="step-innercontent step4">

                <div>
                    <h3>Tell us <span className="strong">about your family</span></h3>
                    <p className="mb-5 text-center">Tell us more about your family so  we can include your support person in our programming and better customize the content and events for your parenting stage!</p>
                    <form className="step-form">
                        <div className="form-group mb-3">
                            <label>Partner or Support Person’s First Name (optional)</label>
                            <input type="text" name="first_name" value={value?.first_name} onChange={handleChange} className={`${error?.first_name && "error-input"} form-control`} id="" placeholder="Name" />
                            <h5 className="error-msgtext">{error.first_name}</h5>
                        </div>

                        <div className="form-group mb-3">
                            <label>Partner or Support Person’s Last Name (optional)</label>
                            <input type="text" name="last_name" onChange={handleChange} value={value?.last_name} className={`${error?.last_name && "error-input"} form-control`} id="" placeholder="Last Name" />
                            <h5 className="error-msgtext">{error.last_name}</h5>
                        </div>
                        <div className="form-group mb-3">
                            <label>Partner or Support Person’s Email (optional)</label>
                            <input type="email" name="email"
                                onChange={handleChange} value={value?.email}
                                className={`${error?.email && "error-input"} form-control`} id="" placeholder="Email" />
                            <h5 className="error-msgtext">
                                {error.email}
                            </h5>
                        </div>
                    </form>
                </div>
                {/* Section 2 */}
                <div>
                    <div className="step-innercontent step5">
                        <div>
                            <h3>Tell us <span className="strong">about your baby</span></h3>
                            <p className="mb-5 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Vestibulum faucibus arcu non eros porttitor, in malesuada lorem ullamcorper.</p>
                            <form className="step-form">
                                <div className="radio-area pb-4 ">
                                    <h4>Are you currently expecting?</h4>
                                    <div className="custom-radio custom-control-inline">
                                        <input type="radio" id="customRadio1" name="pregnant" value="yes" checked={value.pregnant === "yes"}
                                            className="custom-control-input form-check-input"
                                            onChange={changeHandler}

                                        />
                                        <label className="custom-control-label step_two me-3" htmlFor="customRadio1">yes</label>
                                        <input
                                            type="radio"
                                            id="customRadio2"
                                            name="pregnant"
                                            checked={value.pregnant === "no"}
                                            onChange={changeHandler}
                                            value="no" className="custom-control-input form-check-input"

                                        />
                                        <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
                                    </div>
                                    {/* <div className="custom-controll custom-radio custom-control-inline">
                                        <input type="radio" id="customRadio2" name="pregnant"
                                            onChange={changeHandler}
                                            value="no" className="custom-control-input"
                                            checked={value.pregnant === "no"}
                                        />
                                        <label className="custom-control-label step_two" htmlFor="customRadio2">no</label>
                                    </div> */}
                                    <h5 className="error-msgtext">
                                        {error?.pregnant}
                                    </h5>
                                </div>
                                {value?.pregnant === 'yes' ? <div>
                                    <img src={Congrats} alt="" className="mb-4" />
                                    <div className="form-group birthday-box mb-3">
                                        <label>Expected due date</label>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Stack spacing={3}>
                                                <MobileDatePicker
                                                    disablePast
                                                    label=""
                                                    className="error-input"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={valueYes?.due_date || ""}
                                                    onChange={(date) => yesHandleChange(date)}
                                                    renderInput={(params) => <TextField placeholder="MM/dd/yyyy" {...params} />}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                        <h5 className="error-msgtext">
                                            {error?.due_date}
                                        </h5>
                                    </div>
                                    <div className="form-group mb-3 baby-gender">
                                        <label>Baby’s Gender</label>
                                        <Autocomplete
                                            disablePortal
                                            id="Gender"
                                            value={valueYes?.expected_baby_gender}
                                            className={`${error?.gender && "input-errorborder"}`}
                                            options={Gender}
                                            onChange={yesHandleChange}

                                            renderInput={(params) => <TextField {...params} name="gender" />}
                                        />
                                        <h4 className="error-msgtext">{error?.expected_baby_gender}</h4>

                                    </div>
                                    {
                                        valueYes?.expected_baby_gender === "it’s multiples" &&
                                        <div className="multiple-main-container">
                                            <div className="d-flex flex-row w-100">
                                                <div className="me-3">
                                                    <label className="row-label">Select First Child Gender</label>
                                                </div>

                                                <div className="d-flex">
                                                    <div className="custom-radio custom-control-inline">
                                                        <input type="radio" className="form-check-input me-0 ms-auto" name="first_child_gender" value="male" onChange={yesHandleChange} />
                                                        <label className="custom-control-label step_two me-3" >Boy</label>

                                                        <input type="radio" className="form-check-input me-0 ms-auto" name="first_child_gender" value="female" onChange={yesHandleChange} />
                                                        <label className="custom-control-label step_two me-3" >Girl</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-md-row flex-column w-100">
                                                <div className="me-3">
                                                    <label className="row-label">Select Second Child Gender</label>
                                                </div>

                                                <div className="d-flex">
                                                    <div className="custom-radio custom-control-inline">
                                                        <input type="radio" className="form-check-input me-0 ms-auto" name="second_child_gender" value="male" onChange={yesHandleChange} />
                                                        <label className="custom-control-label step_two me-3" >Boy</label>

                                                        <input type="radio" className="form-check-input me-0 ms-auto" name="second_child_gender" value="female" onChange={yesHandleChange} />
                                                        <label className="custom-control-label step_two me-3" >Girl</label>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                addChild?.includes(1) &&
                                                <div className="d-flex flex-md-row flex-column w-100">
                                                    <div className="me-3">
                                                        <label className="row-label">Select Another Child Gender</label>
                                                    </div>

                                                    <div className="d-flex">
                                                        <div className="custom-radio custom-control-inline">
                                                            <input type="radio" className="form-check-input me-0 ms-auto" name="another_child_gender_1" value="male" checked={valueYes?.another_child_gender_1 === 'male'} onChange={yesHandleChange} />
                                                            <label className="custom-control-label step_two me-3" >Boy</label>

                                                            <input type="radio" className="form-check-input me-0 ms-auto" name="another_child_gender_1" value="female" checked={valueYes?.another_child_gender_1 === 'female'} onChange={yesHandleChange} />
                                                            <label className="custom-control-label step_two me-3" >Girl</label>
                                                        </div>
                                                    </div>
                                                    <DeleteIcon onClick={() => handleDelete(0)} />
                                                </div>
                                            }
                                            {
                                                addChild?.includes(2) &&
                                                <div className="d-flex flex-md-row flex-column w-100">
                                                    <div className="me-3">
                                                        <label className="row-label">Select Another Child Gender</label>
                                                    </div>

                                                    <div className="d-flex">
                                                        <div className="custom-radio custom-control-inline">
                                                            <input type="radio" className="form-check-input me-0 ms-auto" name="another_child_gender_2" value="male" checked={valueYes?.another_child_gender_2 === 'male'} onChange={yesHandleChange} />
                                                            <label className="custom-control-label step_two me-3" >Boy</label>

                                                            <input type="radio" className="form-check-input me-0 ms-auto" name="another_child_gender_2" value="female" checked={valueYes?.another_child_gender_2 === 'female'} onChange={yesHandleChange} />
                                                            <label className="custom-control-label step_two me-3" >Girl</label>
                                                        </div>
                                                    </div>
                                                    <DeleteIcon onClick={() => handleDelete(1)} />
                                                </div>
                                            }
                                            {
                                                addChild.length < 2 &&
                                                <Link to={''} className="add-child-info secondary_hyperlink" onClick={() => handleAddChild(1)} >+ Add child</Link>
                                            }

                                        </div>
                                    }

                                </div>
                                    : value?.pregnant === 'no' &&
                                    <div>
                                        <div className="form-group mb-3">
                                            <label>Baby’s First Name</label>
                                            <input type="text" name="baby_first_name" value={valueNo?.baby_first_name}
                                                onChange={noValueHandler} className="form-control" id=""
                                                placeholder="First-name" />
                                            <h5 className="error-msgtext">
                                                {error?.baby_first_name}
                                            </h5>
                                        </div>

                                        <div className="form-group birthday-box mb-3">
                                            <label>Baby’s Birthdate</label>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <Stack spacing={3}>
                                                    <MobileDatePicker
                                                        disableFuture
                                                        label=""
                                                        inputFormat="MM/dd/yyyy"
                                                        value={valueNo?.dob || ""}
                                                        onChange={(date) => noValueHandler(date, 'dob')}
                                                        renderInput={(params) => <TextField placeholder="mm/dd/yyyy" {...params} />}
                                                    />
                                                </Stack>
                                            </LocalizationProvider>
                                            <h5 className="error-msgtext">
                                                {error?.dob}
                                            </h5>
                                        </div>

                                        <div className="form-group mb-3 baby-gender">
                                            <label>Baby’s Gender</label>
                                            <Autocomplete
                                                disablePortal
                                                id="Gender"
                                                value={valueNo?.gender || ""}
                                                className={`${error?.gender && "input-errorborder"}`}
                                                options={Gender}
                                                onChange={noValueHandler}

                                                renderInput={(params) => <TextField {...params} name="gender" />}
                                            />
                                            <h4 className="error-msgtext">{error?.gender}</h4>
                                        </div>

                                        <div className="radio-area mb-3">
                                            <h4>How are you feeding your baby? </h4>
                                            <div className="d-flex justify-content-start flex-wrap flex-sm-row flex-column">
                                                <div className="custom-checkbox">
                                                    <input type="checkbox" id="customRadio3" name="feeding_choice" onChange={feedingChoiceHandler} value="Breastfeeding" className="custom-control-input form-check-input" />
                                                    <label className="custom-control-label step_two" htmlFor="customRadio3">Breast-feeding</label>
                                                </div>

                                                <div className="custom-checkbox">
                                                    <input type="checkbox" id="customRadio4" name="feeding_choice" onChange={feedingChoiceHandler} value="Pumping" className="custom-control-input form-check-input" />
                                                    <label className="custom-control-label step_two" htmlFor="customRadio4">Pumping</label>
                                                </div>
                                                <div className="custom-checkbox">
                                                    <input type="checkbox" id="customRadio5" name="feeding_choice" onChange={feedingChoiceHandler} value="Formulafeeding" className="custom-control-input form-check-input" />
                                                    <label className="custom-control-label step_two" htmlFor="customRadio4">Formula Feeding</label>
                                                </div>
                                                <div className="custom-checkbox">
                                                    <input type="checkbox" id="customRadio5" name="feeding_choice" onChange={feedingChoiceHandler} value="Donorbreastmilk" className="custom-control-input form-check-input" />
                                                    <label className="custom-control-label step_two" htmlFor="customRadio4">Donor Breastmilk</label>
                                                </div>
                                                <div className="custom-checkbox">
                                                    <input type="checkbox" id="customRadio5" name="feeding_choice" onChange={feedingChoiceHandler} value="solid_foods" className="custom-control-input form-check-input" />
                                                    <label className="custom-control-label step_two" htmlFor="customRadio4">Solid Foods</label>
                                                </div>
                                            </div>


                                            {/* <div className="custom-control custom-radio custom-control-inline">
                                                <input type="checkbox" id="customRadio3" name="feeding_choice" onChange={feedingChoiceHandler} value="Breastfeeding" className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio3">Breast-feeding</label>

                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="checkbox" id="customRadio4" name="feeding_choice" onChange={feedingChoiceHandler} value="Pumping" checked={feedingChoice.some((item: string) => item === 'Pumping')} className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio4">Pumping</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="checkbox" id="customRadio5" name="feeding_choice" onChange={feedingChoiceHandler} value="Formulafeeding" checked={feedingChoice.some((item: string) => item === 'Formulafeeding')} className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio4">Formula Feeding</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="checkbox" id="customRadio5" name="feeding_choice" onChange={feedingChoiceHandler} value="Donorbreastmilk" checked={feedingChoice.some((item: string) => item === 'Donorbreastmilk')} className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio4">Donor Breastmilk</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="checkbox" id="customRadio5" name="feeding_choice" onChange={feedingChoiceHandler} value="solid_foods" checked={feedingChoice.some((item: string) => item === 'solid_foods')} className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio4">Solid Foods</label>
                                            </div> */}
                                            {/* <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio5" name="feeding_choice" onChange={noValueHandler} value="All" className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio5">Select All</label>
                                            </div> */}
                                            <h5 className="error-msgtext">
                                                {error?.feeding_choice}
                                            </h5>
                                        </div>

                                        <div className="radio-area mb-3">
                                            <h4>Was your baby born prematurely (prior to 37 weeks)?</h4>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio6" name="baby_premature" onChange={noValueHandler} checked={valueNo?.baby_premature === "yes"} value="yes" className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio6">yes</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio7" name="baby_premature" onChange={noValueHandler} value="no" checked={valueNo?.baby_premature === "no"} className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio7">no</label>
                                            </div>
                                            <h5 className="error-msgtext">
                                                {error?.baby_premature}
                                            </h5>
                                        </div>

                                        <div className="radio-area mb-3">
                                            <h4>How did you welcome your baby?</h4>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio3" name="c_section" checked={valueNo?.c_section === "Natural conception"} onChange={noValueHandler} value="Natural conception" className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio3">Natural conception</label>

                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio4" name="c_section" onChange={noValueHandler} checked={valueNo?.c_section === "Fertility assisted methods"} value="Fertility assisted methods" className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio4">Conception through IUI, IVF, or other fertility assisted methods</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio5" name="c_section" onChange={noValueHandler} checked={valueNo?.c_section === "Surrogacy"} value="Surrogacy" className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio5">Surrogacy</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio5" name="c_section" onChange={noValueHandler} checked={valueNo?.c_section === "Adoption"} value="Adoption" className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio5">Adoption</label>
                                            </div>

                                            <h5 className="error-msgtext">
                                                {error?.c_section}
                                            </h5>
                                        </div>

                                        <div className="radio-area mb-3">
                                            <h4>Did you struggle with fertility?</h4>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio6" name="fertility_question" onChange={noValueHandler} checked={valueNo?.fertility_question === "yes"} value="yes" className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio6">yes</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio7" name="fertility_question" onChange={noValueHandler} value="no" checked={valueNo?.fertility_question === "no"} className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio7">no</label>
                                            </div>
                                            <h5 className="error-msgtext">
                                                {error?.fertility_question}
                                            </h5>
                                        </div>

                                        {/* <div className="radio-area mb-3">
                                            <h4>Did you have a C-Section?</h4>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio8" name="c_section" onChange={noValueHandler} value="yes" checked={valueNo?.c_section === "yes"} className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two " htmlFor="customRadio8">yes</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio9" name="c_section" value="no" onChange={noValueHandler} checked={valueNo?.c_section === "no"} className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio9">no</label>
                                            </div>
                                            <h5 className="error-msgtext">
                                                {error?.c_section}
                                            </h5>
                                        </div>
                                        <div className="radio-area mb-3">
                                            <h4>Fertility questions</h4>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio10" name="fertility_question" checked={valueNo?.fertility_question === "Breastmilk"} onChange={noValueHandler} value="Breastmilk" className="custom-control-input form-check-input" />
                                                Baby’s Gender  <label className="custom-control-label step_two" htmlFor="customRadio10">Breastmilk</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio11" name="fertility_question" checked={valueNo?.fertility_question === "Formula"} onChange={noValueHandler} value="Formula" className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio11">Formula</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input type="radio" id="customRadio12" name="fertility_question" checked={valueNo?.fertility_question === "Both"} onChange={noValueHandler} value="Both" className="custom-control-input form-check-input" />
                                                <label className="custom-control-label step_two" htmlFor="customRadio12">Both</label>
                                            </div>
                                            <h5 className="error-msgtext">
                                                {error?.fertility_question}
                                            </h5>
                                        </div> */}
                                        {/* <div className="pt-0">
                                <a href="" className="twins-link">Twins?</a>
                            </div> */}
                                        {
                                            addOption?.includes(1) &&
                                            <>
                                                <div className="form-group mb-3">
                                                    <label>Baby’s First Name</label>
                                                    <input type="text" name="baby_first_name1" value={valueNo?.baby_first_name1}
                                                        onChange={noValueHandler} className="form-control" id=""
                                                        placeholder="First-name" />
                                                    <h5 className="error-msgtext">
                                                        {error?.baby_first_name}
                                                    </h5>
                                                </div>

                                                <div className="form-group birthday-box mb-3">
                                                    <label>Baby’s Birthdate</label>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <Stack spacing={3}>
                                                            <MobileDatePicker
                                                                disableFuture
                                                                label=""
                                                                inputFormat="MM/dd/yyyy"
                                                                value={valueNo?.dob_anothor_child1 || ""}
                                                                onChange={(date) => noValueHandler(date, 'dob_anothor_child1')}
                                                                renderInput={(params) => <TextField placeholder="mm/dd/yyyy" {...params} />}
                                                            />
                                                        </Stack>
                                                    </LocalizationProvider>
                                                    <h5 className="error-msgtext">
                                                        {error?.dob}
                                                    </h5>
                                                </div>

                                                <div className="form-group mb-3 baby-gender">
                                                    <label>Baby’s Gender</label>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="Gender"
                                                        value={valueNo?.first_gender}
                                                        className={`${error?.gender && "input-errorborder"}`}
                                                        options={Gender1}
                                                        onChange={noValueHandler}

                                                        renderInput={(params) => <TextField {...params} name="gender" />}
                                                    />
                                                    <h4 className="error-msgtext">{error?.gender}</h4>
                                                </div>
                                            </>
                                        }

                                        {
                                            addOption?.includes(2) &&
                                            <>
                                                <div className="form-group mb-3">
                                                    <label>Baby’s First Name</label>
                                                    <input type="text" name="baby_first_name2" value={valueNo?.baby_first_name2}
                                                        onChange={noValueHandler} className="form-control" id=""
                                                        placeholder="First-name" />
                                                    <h5 className="error-msgtext">
                                                        {error?.baby_first_name}
                                                    </h5>
                                                </div>

                                                <div className="form-group birthday-box mb-3">
                                                    <label>Baby’s Birthdate</label>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <Stack spacing={3}>
                                                            <MobileDatePicker
                                                                disableFuture
                                                                label=""
                                                                inputFormat="MM/dd/yyyy"
                                                                value={valueNo?.dob_anothor_child2 || ""}
                                                                onChange={(date) => noValueHandler(date, 'dob_anothor_child2')}
                                                                renderInput={(params) => <TextField placeholder="mm/dd/yyyy" {...params} />}
                                                            />
                                                        </Stack>
                                                    </LocalizationProvider>
                                                    <h5 className="error-msgtext">
                                                        {error?.dob}
                                                    </h5>
                                                </div>

                                                <div className="form-group mb-3 baby-gender">
                                                    <label>Baby’s Gender</label>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="Gender"
                                                        value={valueNo?.second_gender}
                                                        className={`${error?.gender && "input-errorborder"}`}
                                                        options={Gender2}
                                                        onChange={noValueHandler}

                                                        renderInput={(params) => <TextField {...params} name="gender" />}
                                                    />
                                                    <h4 className="error-msgtext">{error?.gender}</h4>
                                                </div>
                                            </>
                                        }

                                        {
                                            addOption?.length < 2 &&
                                            <Link to={''} className="add-child-info secondary_hyperlink" onClick={() => handleAddNewChild(1)}>+ Add child</Link>
                                        }

                                    </div>
                                }
                            </form>

                            <button className="btn next-buttonbtn primary-blue-btn mb-5 mt-3" disabled={loading} onClick={handleCheck}>{loading ? <CircularProgress /> : "Next Step"}</button>
                        </div>

                    </div>
                </div>
            </div>
            {isSkip === "I’m Single" && <div className="skip-buttondiv">
                <button className="btn skip-button" onClick={() => handleSkip()}>Skip</button>
            </div>}
        </div>
    )
}

export default Step2

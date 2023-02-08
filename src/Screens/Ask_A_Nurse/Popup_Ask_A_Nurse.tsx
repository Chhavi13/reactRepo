import React, { useRef, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import './Popup-Ask-A-Nurse.scss';
import { CircularProgress } from '@mui/material';
import UploadASK from "../../Assets/img/asknurse/UploadAsk.svg";
import ConvertFileTobase64 from '../../Utils/ConverBase64';
import { postQuestion } from '../../Service/ask_a_nurse';
import { ToastContainer, toast } from 'react-toastify';
import { getDataFromLocalStorage } from '../../Service/getLocalStorage';
let categoryList: any = []
let stateList: any = []
function Popup_Ask_A_Nurse(props: any) {
    let { open, setOpen, list, socket } = props;
    const [values, setValue] = useState<any>({})
    const [isLoading, setIsloading] = useState<boolean>(false)
    const [image, setImage] = useState<any>("")
    const [error, setError] = useState<any>({})
    let userID: any = localStorage.getItem("Nurture_user_data");
    userID = JSON.parse(userID)?.id;
    let handleClose = () => {
        setOpen(false)
    }
    let questionSubmit = async () => {
        try {

            if (!values || !values.question || !values.tags) {
                // toast.error("please input the value")
                let errors: any = {}
                if (!values.question) {
                    errors.question = "Please enter the question";
                }
                if (!values.tags) {
                    errors.tags = "Please select you stage";
                }
                setError(errors)
            } else {
                setIsloading(true)
                let formData = new FormData()
                if (values.category) {

                    let categoryString = values.category.join(",")
                    formData.append("category_id", categoryString)
                }
                formData.append("user_id", userID)
                formData.append("question", values.question)
                values.image && formData.append("image", values.image)
                formData.append("stage_id", values.tags)

                let res: any = await postQuestion(formData)
                let isSuccess = res?.data?.success
                let message = res.data.message
                let msg = "";
                for (let i = 0; i < message.length; i++) {
                    msg += message[i];
                }

                if (!isSuccess) {
                    toast.error(msg)
                }
                if (isSuccess) {
                    let ResData = res?.data?.data
                    props.data && props.data.unshift(res?.data?.data)
                    props.data && props.setData(props.data)
                    toast.success(msg)
                    setOpen(false)
                    setIsloading(false)
                    setImage("")

                    let socketData = {
                        question_id: ResData?.id,
                        user_name: ResData?.user?.name,
                        question: ResData?.question,
                        user_id: userID,
                        user_photo: getDataFromLocalStorage()?.photo,
                        created_at: new Date(),
                        image:res?.data?.data?.image

                    }                    
                    await socket.emit("askANurseQuestionSendRequest", socketData);
                }

                categoryList = []
                stateList = []
                setValue({})
            }
        } catch (err) {
            categoryList = []
            stateList = []
            console.log(err)
            setIsloading(false)
        }
    }
    let userImageref: any = useRef()

    let handleChange = async (e: any, dValues: any) => {
        let name = e?.target?.name;
        let value = e?.target?.value;

        if (dValues === "question") {
            setError({
                ...error,
                ["question"]: ""
            })
            setValue({
                ...values,
                [name]: value
            })
        } else if (dValues === "image") {
            let base64: any = await ConvertFileTobase64(e.target.files[0])
            setImage(e.target.files[0].name)
            setValue({
                ...values,
                [name]: e.target.files[0]
            })
        } else if (name === "category") {
            if (e.target.checked) {
                categoryList.push(dValues)
            } else {
                var index = categoryList.indexOf(dValues);
                if (index !== -1) {
                    categoryList.splice(index, 1);
                }
            }
            setValue({
                ...values,
                [name]: categoryList
            })
        } else {
            if (dValues === "tags") {
                if (e.target.checked) {
                    stateList.push(e.target.value)
                } else {
                    var index = stateList.indexOf(dValues);
                    if (index !== -1) {
                        stateList.splice(index, 1);
                    }
                }
                setError({
                    ...error,
                    ["tags"]:""
                })
                setValue({
                    ...values,
                    ["tags"]: stateList
                })
            }
        }
    }
    // React.useEffect(() => {
    //     categoryList = []
    //     stateList = []
    // }, [categoryList, stateList])

    return (
        <div>
            {/* <Button variant="primary" onClick={handleClose}>
                Launch demo modal
            </Button> */}
            <ToastContainer />
            <Modal show={open} onHide={handleClose} className='askN-question-modal'>
                <Modal.Header closeButton onClick={handleClose}>


                </Modal.Header>
                <Modal.Body>
                    <div className='justify-content-center text-center'><h3>What’s your question?</h3>
                        <p className='px-5 mx-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis, rutrum nec eu, diam aenean neque tortor. </p>

                    </div>

                    <div className='ask-question'>
                        <Form onSubmit={(e: any) => e.preventDefault()}>
                            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                                <Form.Label>What’s your question?</Form.Label>
                                <Form.Control as="textarea" rows={4} name="question" placeholder="Ask your question" onChange={(e) => handleChange(e, "question")} />
                                <span className="error-msgtext">{error?.question}</span>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Stages</Form.Label>
                                <div className="custom-radio custom-control-inline tag-container">
                                    <div className='d-flex justify-content-start flex-wrap flex-sm-row flex-column'>
                                        {
                                            list?.stage?.map((tag: any, i: any) =>
                                            (

                                                <div className='tag-option d-flex align-items-center'>
                                                    <input type="checkbox" id="customRadio1" name="tags" className=" form-check-input" value={tag?.id} onChange={(e) => handleChange(e, "tags")} />
                                                    <label className="form-check-label" >{tag?.name}</label>
                                                </div>

                                            )
                                            )
                                        }
                                    </div>
                                </div>
                                <span className="error-msgtext">{error.tags}</span>
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                <Form.Label>Category</Form.Label>
                                <div className="custom-radio custom-control-inline category-container">
                                    <div className='d-flex justify-content-start flex-wrap flex-column flex-md-row'>
                                        {/* <div className='category-option custom-checkbox'>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className='category-option custom-checkbox'>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className='category-option custom-checkbox'>
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div> */}
                                        {
                                            list?.category?.map((catgry: any, i: any) =>
                                            (
                                                <div className='category-option custom-checkbox'>
                                                    <input className="form-check-input" type="checkbox" name="category" id="flexCheckDefault" onChange={(e) => handleChange(e, catgry?.id)} />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        {catgry?.name}
                                                    </label>
                                                </div>

                                            )
                                            )
                                        }
                                    </div>
                                </div>
                                {/* <span className="error-msgtext">Please select category</span> */}
                            </Form.Group>
                            <Form.Group className="mb-3 upload-askN-main" controlId="formBasicEmail">
                                <Form.Label>Upload Photo  (Optional)</Form.Label>
                                <div className='upload-askN-q'>
                                    <Form.Control type="file" accept="image/png, image/jpeg" name="image" placeholder="Beaton@gmail.com" className="d-none" ref={userImageref} onChange={(e) => handleChange(e, "image")} />
                                    <img src={UploadASK} className="UploadASK-icon" alt="" onClick={() => userImageref.current.click()} />
                                    &nbsp; {image}
                                </div>
                            </Form.Group>

                            {/* <Button variant="primary" type="submit">
                            Submit
                        </Button> */}
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button disabled={isLoading} className='primary-blue-small-btn btn m-0' onClick={questionSubmit}>
                        {/* Submit */}
                        {isLoading ? <CircularProgress /> : "Submit"}
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Popup_Ask_A_Nurse
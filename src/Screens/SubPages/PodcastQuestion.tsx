import React, { useState } from 'react'
import { Container, Row, Col, Card, Button, Image, ListGroup, ProgressBar } from 'react-bootstrap';
import podcast_banner from '../../Assets/img/podcastBanner.png';
import "./PodcastQuestion.scss";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { podCastSubmission } from '../../Utils/validation';
import { CreateQuestion, Question } from '../../Interfaces/userInterfaces';
import moment from 'moment';
import { podCastSubmissionData } from '../../Service/blog';
import { CircularProgress } from '@mui/material';
import CompletePopup from './completePop';

let initialState: CreateQuestion = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  dob: "",
  subject: "",
  question: "",
  level: "medium"
}

interface IProps {

}

const PodcastQuestion: React.FC<IProps> = () => {
  const [questionData, setQuestionData] = useState<CreateQuestion>(initialState);
  const [error, setError] = useState<Question>({})
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = useState(false)
  let user: any = localStorage.getItem("Nurture_user_data")
  user = JSON.parse(user)
  const handleChange = (e: any) => {

    let { name, value } = e.target;
    let newData = { [name]: value };
    setQuestionData({
      ...questionData,
      [name]: value
    })
    const { errors } = podCastSubmission(newData)
    setError({
      ...error,
      ...errors
    })
  }

  const handleDateChange = async (val: Date | any) => {
    setQuestionData({
      ...questionData,
      ['dob']: moment(val).format('L')
    })
    setError({
      ...error,
      ["dob"]: ""
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      if (
        !questionData?.first_name || !questionData?.last_name || !questionData?.email || !questionData?.phone || !questionData?.subject ||
        !questionData.question || !questionData?.dob || questionData?.dob === "Invalid date") {

        let errors: any = {}

        if (!questionData?.first_name) {
          errors.first_name = "First name is Required"
        }

        if (!questionData?.last_name) {
          errors.last_name = "Last name is Required"
        }

        if (!questionData?.email) {
          errors.email = "Email is required"
        }

        if (!questionData?.phone) {
          errors.phone = "Phone Number is Required"
        }

        if (!questionData?.subject) {
          errors.subject = "subject is Required"
        }

        if (!questionData?.question) {
          errors.question = "question is Required"
        }
        if (!questionData?.dob) {
          errors.dob = "Please select date"
        }

        setError(errors)


      } else {
        setLoading(true)

        let param = {
          first_name: questionData?.first_name,
          last_name: questionData?.first_name,
          email: questionData?.email,
          phone: questionData?.phone,
          dob: questionData?.dob,
          subject: questionData?.subject,
          question: questionData?.question,
          user_id: user?.id
        }

        let res: any = await podCastSubmissionData(param)

        if (res?.data?.success) {
          setLoading(false)
          setOpen(true)
          setQuestionData(initialState)
        }
      }
    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }

  }
  return (
    <div>
      <CompletePopup open={open} setOpen={setOpen} text='Podcast Question has been submitted' />
      <Container fluid className='Podcast-container'>
        <Row>
          <div className='col-lg-12 col-md-12 my-3'>
            <div className='banner-container'>
              <img src={podcast_banner} className='img-fluid' />
            </div>
          </div>
        </Row>
        <Row no-gutter className='pale-bg py-4' >
          <div className='col-lg-12 col-md-12 podcast-discription-section'>
            <div className='container'>
              <Row className='justify-content-center'>
                <div className='col-lg-10 col-md-10'>
                  <h3 className="text-center podcast-section-title my-3">The Gift of <span className="strong red">Support</span></h3>
                  <div className='px-5 podcast_description'>
                    <p className='text-center'>Thank you for your interest in submitting a question to be answers on our podcast, Unswaddled: The Truth About Parenting.</p>
                    <p className='text-center'><strong>By submitting this form, you are agreeing that if your question is chosen to be answered on the podcast, that the format for getting your question answered with be through a live call. This live call with be recorded, including both the audio and video, and will be posted on all of our podcast platforms, as well as on our YouTube channel.</strong> </p>
                    <p className='text-center'>There is no guarantee that your question will be answered, but if you have been chosen, we will reach out to you directly via email or phone to set up a time for your call. </p>
                    <p className='text-center'> If you do not wish to have your question answered live on our podcast, you may be interested more in a 1:1 nursing consultation call. </p>
                  </div>
                </div>
              </Row>
            </div>

          </div>
        </Row>
        <Row className='podcast-form my-4'>
          <div className='col-lg-12 col-md-12'>
            <div className='container'>
              <Row className='justify-content-center'>
                <div className='col-lg-8 col-md-8'>
                  <form className='row'>
                    <div className='form-group col-lg-12 mb-3'>
                      <div className='row'>
                        <div className='form-group col-lg-6 col-md-6'>
                          <label>First Name <span className='required'>*</span></label>
                          <input type="text" name="first_name" className="form-control" value={questionData?.first_name} onChange={handleChange} id="" placeholder='Enter' />
                          <h4 className="error">{error?.first_name}</h4>
                        </div>
                        <div className='form-group col-lg-6 col-md-6'>
                          <label>Last Name <span className='required'>*</span></label>
                          <input type="text" name="last_name" className="form-control" value={questionData?.last_name} onChange={handleChange} id="" placeholder='Enter' />
                          <h4 className="error">{error?.last_name}</h4>
                        </div>
                      </div>
                    </div>

                    <div className='form-group col-lg-12 mb-3'>
                      <div className='row'>
                        <div className='form-group col-lg-6 col-md-6'>
                          <label>Email <span className='required'>*</span></label>
                          <input type="email" name="email" className="form-control" value={questionData?.email} id="" onChange={handleChange} placeholder='Enter' />
                          <h4 className="error">{error?.email}</h4>
                        </div>
                        <div className='form-group col-lg-6 col-md-6'>
                          <label>Phone number <span className='required'>*</span></label>
                          <input type="number" name="phone" className="form-control" id="" value={questionData?.phone} onChange={handleChange} placeholder='Enter' />
                          <h4 className="error">{error?.phone}</h4>
                        </div>
                      </div>
                    </div>

                    <div className='form-group col-lg-12 mb-3'>
                      <div className='row'>
                        <div className='form-group col-lg-6 col-md-6'>
                          <label>Due Date / Child's Birthday <span className='required'>*</span></label>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                              <MobileDatePicker
                                value={questionData?.dob || ""}
                                toolbarTitle="Choose date"
                                disableFuture
                                onChange={(val) => handleDateChange(val)}

                                renderInput={(params) => <TextField error={false} placeholder="MM-DD-YYYY"  {...params} />}
                              />
                            </Stack>
                          </LocalizationProvider>
                          <h4 className="error">{error?.dob}</h4>
                        </div>
                        <div className='form-group col-lg-6 col-md-6'>
                          <label>Subject<span className='required'>*</span></label>
                          <input type="text" name="subject" className="form-control" onChange={handleChange} id="" value={questionData?.subject} placeholder="Enter" />
                          <h4 className="error">{error?.subject}</h4>
                        </div>
                      </div>
                    </div>

                    <div className='form-group col-lg-12 mb-3'>
                      <div className='row'>
                        <div className='form-group col-lg-12 col-md-12'>
                          <label>What is your question? <span className='required'>*</span></label>
                          <textarea name='question' className="form-control" onChange={handleChange} value={questionData?.question} placeholder='Ask your question' />
                          <h4 className="error">{error?.question}</h4>
                        </div>
                      </div>
                    </div>

                    <div className='col-lg-12 col-md-12'>
                      <button className="btn secondary-teal-btn mb-5 w-100" disabled={loading} onClick={handleSubmit}>{loading ? <CircularProgress /> : "Submit"}</button>
                    </div>
                  </form>
                </div>
              </Row>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}

export default PodcastQuestion
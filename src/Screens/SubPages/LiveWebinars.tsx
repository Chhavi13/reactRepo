import React from 'react'
import { Container, Row, Col, Card, Button, Image, ListGroup, ProgressBar } from 'react-bootstrap';
import podcast_banner from '../../Assets/img/podcastBanner.png';
import sponsorship_banner from '../../Assets/img/sponsorship_banner.png';
import "./PodcastQuestion.scss";
import school_of_mom from "../../Assets/img/sponsors/School_of_mom.png";
import boston_pelvic from "../../Assets/img/sponsors/Boston_pelvic.png";
import malina_malkani from "../../Assets/img/sponsors/Melina_melkani.png";
import marriage_coach from "../../Assets/img/sponsors/marriage_coach.png";
import kinder from "../../Assets/img/sponsors/Kinder.png";
import magic_sleppsuit from "../../Assets/img/sponsors/Megic_sleep.png";
import medela from "../../Assets/img/sponsors/medela.png";
import boston_baby from "../../Assets/img/sponsors/Boston_baby.png";
import cbr from "../../Assets/img/sponsors/cbr.png";
import ripple from "../../Assets/img/sponsors/ripple.png";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const LiveWebinars = () => {
  function handleDateChange(){}
  return (
    <div>
      <Container fluid className='Podcast-container'>
        <Row>
          <div className='col-lg-12 col-md-12 my-3'>
            <div className='banner-container'>
              <img src={podcast_banner} className='img-fluid'/>
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
                          <input type="text" name="podcast_first_name" className="form-control" id="" value="" />
                          <h4 className="error-msgtext"></h4>
                        </div>
                        <div className='form-group col-lg-6 col-md-6'>
                          <label>Last Name <span className='required'>*</span></label>
                          <input type="text" name="podcast_last_name" className="form-control" id="" value="" />
                          <h4 className="error-msgtext"></h4>
                        </div>
                      </div>
                    </div>

                    <div className='form-group col-lg-12 mb-3'>
                      <div className='row'>
                        <div className='form-group col-lg-6 col-md-6'>
                          <label>Email <span className='required'>*</span></label>
                          <input type="email" name="podcast_email" className="form-control" id="" value="" />
                          <h4 className="error-msgtext"></h4>
                        </div>
                        <div className='form-group col-lg-6 col-md-6'>
                          <label>Phone number <span className='required'>*</span></label>
                          <input type="number" name="zip_code" className="form-control" id="" value="" />
                          <h4 className="error-msgtext"></h4>
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
                                      value={""}
                                      toolbarTitle="Choose date"
                                      disableFuture
                                      onChange={handleDateChange}
                                      renderInput={(params) => <TextField error={false} placeholder="MM-DD-YYYY"  {...params} />}
                                  />
                              </Stack>
                          </LocalizationProvider>
                          <h4 className="error-msgtext"></h4>
                        </div>
                        <div className='form-group col-lg-6 col-md-6'>
                          <label>Subject<span className='required'>*</span></label>
                          <input type="number" name="zip_code" className="form-control" id="" value="" />
                          <h4 className="error-msgtext"></h4>
                        </div>
                      </div>
                    </div>

                    <div className='form-group col-lg-12 mb-3'>
                      <div className='row'>
                        <div className='form-group col-lg-12 col-md-12'>
                          <label>First Name <span className='required'>*</span></label>
                          <textarea className="form-control"/>
                          <h4 className="error-msgtext"></h4>
                        </div>
                       
                      </div>
                    </div>

                    <div className='col-lg-12 col-md-12'>
                      <button className="btn secondary-teal-btn mb-5 w-100">Submit</button>
                    </div>
                  </form>
                </div>
              </Row>
            </div>
          </div>
        </Row>
      </Container>

      <Container fluid className='sponsorship-container'>
        <Row>
          <div className='col-lg-12 col-md-12 my-3'>
            <div className='banner-container'>
              <img src={sponsorship_banner} className='img-fluid'/>
            </div>
          </div>
        </Row>
        <Row no-gutter className='pale-bg py-4' >
          <div className='col-lg-12 col-md-12 sponsorship-discription-section'>
            <div className='container'>
              <Row className='justify-content-center'>
                <div className='col-lg-10 col-md-10'>
                  <h3 className="text-center sponsor-section-title my-3">Sponsorships & <span className="strong red">Collabs</span></h3>
                  <div className='px-5 sponsor_description'>
                    <p className='text-center'>NAPS™ is about more than classes, support groups and education. Our mission is to build a community centered around families. We want to make information easy and accessible to everyone through our virtual and in person offers. Browse our upcoming lineup of virtual classes, webinars, and in person events.</p>
                    
                  </div>
                </div>
              </Row>
            </div>

          </div>
        </Row>
        <Row className='podcast-form my-4 all-sponsor-container'>
          <div className='col-lg-12 col-md-12'>
            <div className='container'>
              <Row className='text-center'>

                <div className='d-flex flex-wrap w-100 all-sponsor'>
                  <div className='sponsor-logo-container'>
                    <img src={school_of_mom} className='img-fluid'/>
                  </div>
                  <div className='sponsor-logo-container'>
                    <img src={boston_pelvic} className='img-fluid'/>
                  </div>
                  <div className='sponsor-logo-container'>
                    <img src={malina_malkani} className='img-fluid'/>
                  </div>
                  <div className='sponsor-logo-container'>
                    <img src={marriage_coach} className='img-fluid'/>
                  </div>
                  <div className='sponsor-logo-container'>
                    <img src={kinder} className='img-fluid'/>
                  </div>
                  <div className='sponsor-logo-container'>
                    <img src={magic_sleppsuit} className='img-fluid'/>
                  </div>
                  <div className='sponsor-logo-container'>
                    <img src={medela} className='img-fluid'/>
                  </div>
                  <div className='sponsor-logo-container'>
                    <img src={boston_baby} className='img-fluid'/>
                  </div>
                  <div className='sponsor-logo-container'>
                    <img src={cbr} className='img-fluid'/>
                  </div>
                  <div className='sponsor-logo-container'>
                    <img src={ripple} className='img-fluid'/>
                  </div>
                </div>
              </Row>

              <Row>
                <div className='col-lg-12 col-md-12 text-center'>
                <button className="btn primary-blue-small-btn-40 mt-5">Contact</button>
                </div>
              </Row>
            </div>
          </div>
        </Row>
      </Container>


      <div>
        Podcast
      </div>

   
    </div>

    
  )
}

export default LiveWebinars
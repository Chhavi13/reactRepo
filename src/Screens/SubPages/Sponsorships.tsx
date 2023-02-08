import React from 'react'
import { Container, Row} from 'react-bootstrap';
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

const Sponsorships = () => {
  return (
    <div>
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
    </div>
  )
}

export default Sponsorships
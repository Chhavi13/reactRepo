import React from 'react'
import { ProgressBar, Row } from 'react-bootstrap'
import video_list_thumb from '../../.././Assets/img/profile/video-list-thumb.png'

function Step2() {
  return (
    
      
      <Row className='mt-3'>        
        <div className='col-lg-10 col-md-10'>
          <div className='profile-container-main p-4 p-md-2 mb-3'>
            <div className='d-flex align-items-md-center align-items-start profile-container-inner flex-column flex-md-row '>
              <div className='profile-section-thumbnail mb-3 mb-md-0'>
                <img src={video_list_thumb} className='img-responsive' />
              </div>
              <div className='profile-section-detail mx-0 mx-md-3'>
                <h3 className='section-title'>
                  Pregnant Mom’s Survival Group™
                </h3>
                <p>Dive into a robust course covering the first signs of labor to the birth of your baby and postpartum recovery. See live demonstrations of breathing, massage and relaxation techniques and an overview of pain medication.
                </p>
                <div className='progress-bar-container w-75'>
                  <ProgressBar now={40} />
                  <div className='pregress-bar-caption'>50% complete</div>
                </div>
                <div className='btn-conatainer mx-0 mx-md-3 mt-3 mt-md-0'>
                  <button className='primary-blue-small-btn-40 btn'>See again</button>
                </div>
              </div>
            </div>
          </div>

          <div className='profile-container-main p-4 p-md-2 mb-3'>
            <div className='d-flex align-items-md-center align-items-start profile-container-inner flex-column flex-md-row '>
              <div className='profile-section-thumbnail mb-3 mb-md-0'>
                <img src={video_list_thumb} className='img-responsive' />
              </div>
              <div className='profile-section-detail mx-0 mx-md-3'>
                <h3 className='section-title'>
                  Pregnant Mom’s Survival Group™
                </h3>
                <p>Dive into a robust course covering the first signs of labor to the birth of your baby and postpartum recovery. See live demonstrations of breathing, massage and relaxation techniques and an overview of pain medication.
                </p>
                <div className='progress-bar-container w-75'>
                  <ProgressBar now={40} />
                  <div className='pregress-bar-caption'>50% complete</div>
                </div>
                <div className='btn-conatainer mx-0 mx-md-3 mt-3 mt-md-0'>
                  <button className='primary-blue-small-btn-40 btn'>See again</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
  )
}

export default Step2
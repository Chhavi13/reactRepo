import React from 'react'

const Step1 = () => {


  return (
    <div className='col-lg-12 col-md-12'>

      <div className='col-lg-10 col-md-10'>
        <div className='activity-container'>
          <div className='activity-info-main py-3 px-4'>
            <div className='activity-type'>
              <p>You commented on <span className='activity-topic strong'>topic title</span> <span className='activity-time'>- 5 hours ago</span></p>
              <p className='comment em'>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”</p>
              <p className='navigateTo strong mb-0'>Go to comment</p>
            </div>
          </div>
          <div className='activity-info-main py-3 px-4'>
            <div className='activity-type'>
              <p>You started <span className='activity-topic strong'>Labor & Delivery Prep</span> <span className='activity-time'>- 2 days ago</span></p>
              {/* <p className='comment em'>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”</p> */}
              <p className='navigateTo strong mb-0'>Continue</p>
            </div>
          </div>
          <div className='activity-info-main py-3 px-4'>
            <div className='activity-type'>
              <p>You started <span className='activity-topic strong'>Labor & Delivery Prep</span> <span className='activity-time'>- 2 days ago</span></p>
              {/* <p className='comment em'>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”</p> */}
              <p className='navigateTo strong mb-0'>Continue</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Step1
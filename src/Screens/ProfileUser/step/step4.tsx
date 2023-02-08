import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ASKANURSE, NURSECHAT } from '../../../Routes/RouteConstent'

function Step4({ data, notify, setNotify }: any) {
  console.log('step4', data)
  let userID: any = localStorage.getItem("Nurture_user_data");
  userID = JSON.parse(userID)?.id;
  let unseenMsg: any = localStorage.getItem("NapsUnseenMsg")
  unseenMsg = JSON.parse(unseenMsg)


  const Navigate = useNavigate()
  const handleGoToChat = (res: any) => {
    // Navigate(NURSECHAT, { state: { data: res } })
    if (unseenMsg && unseenMsg.some((id: any) => id == res.id)) {
      let getIndexNum = unseenMsg.indexOf(res.id)
      unseenMsg.splice(getIndexNum, 1)
      localStorage.setItem("NapsUnseenMsg", JSON.stringify(unseenMsg))
    }

    if (res?.answer) {
      Navigate(NURSECHAT, { state: { data: res } })
    }

  }
  return (
    <div>
      <div className='activity-container'>
        {
          data?.map((res: any, i: Number) => (
            <div className='activity-info-main py-3 px-4'>
              <div className='activity-type'>
                <p>{res?.instructor && ` ${res?.instructor?.name} answered your question `}<span className='activity-topic strong'>"{`${res?.question}`}"</span> <span className='activity-time'>- {moment(res?.created_at).fromNow()}</span></p>
                <p className='comment em'>
                  {res?.answer}
                  {/* “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...” */}
                </p>
                <p className='navigateTo strong mb-0' onClick={() => handleGoToChat(res)} >Go to chat</p>
              </div>
            </div>
          ))
        }

        {/* <div className='activity-info-main py-3 px-4'>
            <div className='activity-type'>
              <p>Theresa R. answered your question <span className='activity-topic strong'>“lorem ipsum dolor sit amet?”</span> <span className='activity-time'>- 5 hours ago</span></p>
              <p className='comment em'>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...”</p>
              <p className='navigateTo strong mb-0'>Go to chat</p>
            </div>
          </div>

          <div className='activity-info-main py-3 px-4'>
            <div className='activity-type'>
              <p>Theresa R. answered your question <span className='activity-topic strong'>“lorem ipsum dolor sit amet?”</span> <span className='activity-time'>- 5 hours ago</span></p>
              <p className='comment em'>“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...”</p>
              <p className='navigateTo strong mb-0'>Go to chat</p>
            </div>
          </div> */}
      </div>

      {
        !data?.length &&
        <div className='emptys-container d-flex flex-column align-items-center justify-content-center my-5'>
          <div className='icon-container ask-nurse-icon'>

          </div>
          <h3>Ask a <strong>Nurse</strong></h3>
          <p>You didn’t ask any question yet.</p>
          <button className="btn primary-blue-small-btn-40 mt-3" onClick={()=>{Navigate(ASKANURSE)}} >Ask a Nurse</button>
        </div>
      }
    </div>
  )
}

export default Step4
import Box from '@mui/material/Box';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import gift_icon from '../../../Assets/img/profile/gift-icon.svg';
import React, { useState } from 'react'
import { inviteFriendUpdateAPI } from '../../../Service/update_profile';
import { emailRegex } from '../../../Utils/Regex';
import { toast } from 'react-toastify';
import Step4 from './step4';

function Step3({ promoNo, earnConst, inputVal, setInputVal, offer, value, getProfileBaby }: any, props: any) {
  console.log(offer)

  const [error, setError] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [textChange, setTextChange] = useState<any>([])

  let userID: any = localStorage.getItem("Nurture_user_data");
  userID = JSON.parse(userID)?.id;
  const handleChange = (e: any) => {
    let { name, value } = e.target;
    setInputVal({
      ...inputVal,
      [name]: value
    })
    setError({
      ...error,
      [name]: ""
    })
  }
  const handlerInviteFriend = async (e: any) => {
    e.preventDefault();
    try {
      let errors: any = {}
      if (!inputVal?.name || inputVal?.name?.length < 3 || !inputVal?.email || !emailRegex.test(inputVal?.email)) {
        if (!inputVal?.name) {
          errors.name = 'Name is required'
        }
        if (inputVal?.name?.length < 3) {
          errors.name = 'Minimum 3 char required'
        }
        if (!inputVal?.email) {
          errors.email = 'Email is required'
        }
        if (!emailRegex.test(inputVal?.email)) {
          errors.email = 'Please enter valid Email'
        }
        setError(errors)
      } else {
        setLoading(true)
        let data: any = {
          user_id: userID,
          name: inputVal?.name,
          email: inputVal?.email
        }
        let res: any = await inviteFriendUpdateAPI(data)
        // debugger
        let message = res?.data?.message
        let msg = "";
        for (let i = 0; i < message.length; i++) {
          msg += message[i]
        }
        if (res?.data?.success) {
          toast.success(msg)
          setLoading(false)
          getProfileBaby()
        }
      }

    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const handleCopyCode = (e: any, id: any) => {
    setTextChange([...textChange, id])
    var copyText: any = document.getElementById(id)
    navigator.clipboard.writeText(copyText.innerText);
    setTimeout(() => {
      setTextChange([])
    }, 2500)
  }
  console.log(textChange)
  return (
    <>
      {
        promoNo == 0 &&
        <div className='col-lg-12 col-md-12 payment-main'>
          <h5 className='section-title'> Earn Consult</h5>
          <div className='earn-consult-container py-3 px-4 d-flex flex-column'>
            <div className='progress-bar-container pb-4 d-flex align-items-center'>
              <div className='d-flex align-items-center'>
                <div className='progress-bar me-3'>
                  {/* <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress variant="determinate" {...props} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >{`${Math.round(props.value)}%`}</Typography>
                  </Box>
                </Box> */}
                  {/* <CircularProgressWithLabel value={progress} /> */}
                  <Step4 value={value} />
                </div>
                <div className='profile-competion-msg'>
                  <p className='p-0 m-0'>Complete your profile and get a <span>free 30 minute consult </span> with one of our nurses.</p>
                </div>
              </div>
            </div>
            <div className='profile-completion-container'>
              <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                aria-label="contacts"
                className='profile-steps'
              >
                {
                  earnConst?.map((res: any, i: number) => (
                    <ListItem disablePadding className={`${res?.is_check && 'completed'}`} >
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckIcon />
                        </ListItemIcon>
                        <ListItemText inset primary={res?.name} />
                      </ListItemButton>
                    </ListItem>
                  ))
                }
              </List>
            </div>
          </div>
        </div>
      }

      {
        promoNo == 1 &&
        <div className='col-lg-12 col-md-12 invite-friend-main'>
          <h5 className='section-title'> Invite Friend </h5>
          <div className='invite-friend-container profile-container py-5 py-md-5 px-4 d-flex flex-column justify-content-center'>
            <div className='invite-friend-inner'>
              <form>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input type="text" name="name" onChange={handleChange} className=" form-control" id="" placeholder="Type Name" />
                  <p className="error">{error?.name}</p>
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input type="email" name="email" onChange={handleChange} className=" form-control" id="" placeholder="Type Email" />
                  <p className="error">{error?.email}</p>
                </div>
                <div className='d-flex justify-content-between mt-5'>
                  <button type="button" className="primary-blue-small-btn btn w-50 me-2" disabled={loading} onClick={handlerInviteFriend} >{loading ? <CircularProgress /> : 'Send'}</button>
                  <button type="button" className="primary-outline-btn h50 btn w-50 ms-2">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }

      {
        promoNo == 2 &&
        <div className='col-lg-12 col-md-12 payment-main'>
          <h5 className='section-title'> My offer </h5>
          <div className='offer-container-main d-flex flex-wrap'>
            {
              offer?.map((res: any, i: any) => (
                <div className='offer-container w-50 pe-0 pe-md-3 mb-4'>
                  <div className='offer1 container-inner'>
                    <div className=''>
                      <div className=''><img src={gift_icon} /></div>
                      {
                        res?.type === 'percentage' &&
                        <div className='discounted-offer'>
                          <div className='discounted-offer-inner'>
                            <span className='value'>{res?.amount}% off </span>Any consult
                          </div>
                        </div>
                      }
                      {
                        res?.type === 'amount' &&
                        <div className='discounted-offer'>
                          <div className='discounted-offer-inner'>
                            <span className='value'>{res?.amount} Flat </span>Any consult
                          </div>
                        </div>
                      }
                    </div>
                    <div className='offer-info my-3'>
                      <h3 className='offer-title'>{res?.name} </h3>
                      <p>Just  copy code to get {res?.type === 'percentage' && `${res?.amount}%`} off any consult when you schedule your appointment</p>
                    </div>
                    <div className='coupon-container d-flex justify-content-between align-items-center' onClick={(e) => handleCopyCode(e, res?.id)}>
                      <div className='coupon-value' id={res?.id}>{res?.code}</div>
                      <div><a href='#'>{textChange.includes(res?.id) ? 'Copied' : 'Copy'}</a></div>
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </div>
      }
    </>
  )
}

export default Step3

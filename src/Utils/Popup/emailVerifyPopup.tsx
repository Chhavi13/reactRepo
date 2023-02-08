import React, { useState } from 'react'
import { verifyOtp } from '../../Service/userAuth';
// import "../../Screens/emailVerfication/emailVerify.scss"
import "./emailverifypopup.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import 'react-toastify/dist/ReactToastify.css';
import { Alert } from 'react-bootstrap';
import { VERIFYEMAILPOPUP } from '../../Routes/RouteConstent';

const EmailVerifyPopup = (props: any) => {

  let { isVerifyEmail, setIsVerifyEmail, data } = props;

  // let { state }: any = useLocation()
  let state = data;
  let Navigate = useNavigate()
  const [code, setCode] = useState<any>("")
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sMsg, setSMsg] = useState<string>("")
  //onChange 

  const handleClickOpen = () => {
    setIsVerifyEmail(true);
  };

  const handleClose = (e: any, type: any) => {
    if (type === "backdropClick") {
      return;
    }
    setIsVerifyEmail(false);
  };


  let submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!code) {
        setError("field may not be blank")
      } else {

        let obj = {
          user_id: state?.user_id,
          email: state?.email,
          otp: code
        }
        setIsLoading(true)
        let res = await verifyOtp(obj)
        const isSucess = res.data.success;
        let msgArray = res.data.message;
        let msg = ""
        for (let i = 0; i < msgArray.length; i++) {
          msg += msgArray[i]
        }
        if (!isSucess) {
          toast.error(msg)
        }
        if (isSucess) {
          setSMsg(msg)
          // Navigate(VERIFYEMAILPOPUP)
          setIsVerifyEmail(false)
        }
        setIsLoading(false)

      }
    } catch (error) {
      setIsLoading(false)
    }
  }


  return (
    <div>
      {/* <Header /> */}
      <ToastContainer />
      <Dialog
        open={isVerifyEmail}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="email-verificationpopup modal-500"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="container-fluid">
              <div className="row">
                <div className="login-inner">
                  <div className='d-flex flex-column'>
                  <h1 className="email-head">Email Verification</h1>
                  {!sMsg && <p className='text-center sent-msg'>We have sent a verification code to your Email {state?.email ? state?.email : "email"}</p>}
                  <div>
                    {sMsg && <Alert className="alert-body" variant="success" >
                      <Alert.Heading className="alert-msg">
                        {sMsg}
                      </Alert.Heading>
                    </Alert>}
                  </div>
                  <form onSubmit={submitLogin}>
                    <div className="form-group">
                      <label>Enter Verification Code</label>
                      <input type="text" value={code} name="email"
                        className={`${error && "error-input"} form-control mt-1`}
                        id="exampleInputEmail1"
                        placeholder="1234567"
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <p className="error">{error}</p>
                    </div>

                    <div className="text-center forget-password">
                      {/* <a className="">Forgot Password</a> */}
                    </div>
                    <button type='submit' disabled={isLoading} className="btn primary-blue-btn">{isLoading ? <CircularProgress /> : "Submit"}</button>
                  </form>
                  <div className='text-center resend-code my-2'>
                  <button className='btn'>Resend Verification Code</button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EmailVerifyPopup


import React, { ChangeEvent,useState } from 'react';
import { Spinner, Tabs, Tab } from 'react-bootstrap';

import { validateLoginForm, validateSignupForm } from '../../utils/validators';
import * as alertService from '../../services/AlertService';
import "./signin.scss";
import { useDispatch } from "react-redux"
import { checkUserNameUnique, loginAction } from '../../redux/action/authActions/authActions';
import { setItemLocalStorage } from '../../services/StorageService';
import axiosInstance from '../../services/axios';

class LoginVM {
  password: any;
  username: any;
}
class SignupVM {
  email: any;
  username: any;
  password: any;
  confirm_password: any;
}

export const SignIn = ({ isBuyNow = true, userLoggedInSuccessFullyHandler }: any) => {
  const dispatch = useDispatch()
  const [isSubmittingLogin, setIsSubmittingLogin] = useState<boolean>(false);
  const [isSubmittingSignup, setIsSubmittingSignup] = useState<boolean>(false);
  const [uNameFound, setuNameFound] = useState<boolean>(false);

  let [loginForm, setLoginForm] = useState<LoginVM>(new LoginVM());
  let [signupForm, setSignupForm] = useState<SignupVM>(new SignupVM());
  const [checkUsername, setCheckUserName] = useState<any>("")

  let [loginErrorMessages, setLoginErrorMessages] = useState<LoginVM>(new LoginVM());
  let [signupErrorMessages, setSignupErrorMessages] = useState<SignupVM>(new SignupVM());
  let [key, setKey] = useState<any>("login")

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const newState = { ...loginForm, [name]: e.target.value };
    setLoginForm({ ...loginForm, ...newState });

    var { errors } = validateLoginForm(newState);
    setLoginErrorMessages({ ...loginErrorMessages, [name]: errors[name] });
  }

  const onInputChangeSignup = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const newState = { ...signupForm, [name]: e.target.value };
    setSignupForm({ ...signupForm, ...newState });

    var { errors } = validateSignupForm(newState);
    setSignupErrorMessages({ ...signupErrorMessages, [name]: errors[name] });
  }

  const onSubmitLogin = async (e: any) => {
    e.preventDefault();
    const { isValid, errors } = validateLoginForm(loginForm);

    setLoginErrorMessages({ ...errors });
    if (!isValid) return;
    setIsSubmittingLogin(true);
    try {
      const response: any = await dispatch(loginAction(loginForm))
      let data = response?.payload;
      if (data.status === 200) {
        // alertService.success(data.data.message);
        let Logindata = data?.data?.data
        setIsSubmittingLogin(false);
        console.log("Login data", Logindata)
        setItemLocalStorage("authData", JSON.stringify(Logindata))
        setItemLocalStorage("auth_token", Logindata.auth_token)
        userLoggedInSuccessFullyHandler(true)
        // dispatch(getPersonalDetailAction())
        // isBuyNow && history.push("/dashboard");
      }
      setIsSubmittingLogin(false);
    } catch (err: any) {
      setIsSubmittingLogin(false);
      if (err.response) {
        if (err.response.data) {
          alertService.error(err.response.data.detail)
        }
      } else {
        alertService.error(err.message)
      }
      userLoggedInSuccessFullyHandler(false)
    }
  }

  const onSubmitSignup = async (e: any) => {

    e.preventDefault()

    const { isValid, errors } = validateSignupForm(signupForm);

    setSignupErrorMessages({ ...errors });
    if (!isValid) return;

    const payload = {
      email: signupForm.email,
      username: signupForm.username,
      password: signupForm.password,
      register_for_transaction:true
    }
    setIsSubmittingSignup(true);
    try {

      // const response: any = await dispatch(registerAction(payload));
      const response: any = await axiosInstance.post('auth/register/', payload)
      let data = response?.data
      if (data) {
        // alertService.success(data.message)
        setKey("login")
        setIsSubmittingSignup(false);
      }
      setIsSubmittingSignup(false);

    } catch (err: any) {

      setIsSubmittingSignup(false);

      if (err.response) {

        let message: any = '';
        const data: any = err?.response?.data?.data;
        let count: number = 0;
        for (let [key] of Object.entries(data)) {
          count++;
          message += `${count}) ${data[key][0]} \n`;
        }
        alertService.error(message);
      }
      setIsSubmittingSignup(false);


    }
  }

  let checkUserAlreadyExist = async () => {
    try {
      let user_name: any = { username: signupForm.username }

      const response: any = await dispatch(checkUserNameUnique(user_name));
      let data = response?.payload
      console.log("response checkuser", data.data.detail)
      if (data) {
        if (data.data.detail) {
          setuNameFound(true)
          setCheckUserName(data.data.detail ? data.data.detail : "")
        }
      }


    } catch (error) {
      setuNameFound(false)
      console.log("error", error)
      setCheckUserName("")

    }
  }

  return (
    
      <div className={`${isBuyNow ? 'mobile_container signupmobcontainer': 'buy-now-page-tabs'}`}>
        <div className="sabrinamainscroll">

          <div className='loginformtab mobileloginform available-items'>

            <Tabs activeKey={key}
              onSelect={(k: any) => {
                setKey(k)
              }}
              id="uncontrolled-tab-example">

              <Tab eventKey="login" title="login">
                {/* <Alert severity="error">This is an error alert — check it out!</Alert> */}
                <form onSubmit={onSubmitLogin}>
                  <div className="input-wrapper">
                    <input type="text" required
                      name="username"
                      value={loginForm?.username}
                      onChange={(event) => onInputChange(event)}
                    />
                    <label>Username</label>
                    <span className="error-msg">{loginErrorMessages?.username}</span>
                  </div>
                  <div className="input-wrapper">
                    <input type="password" required
                      name="password"
                      value={loginForm?.password}
                      onChange={(event) => onInputChange(event)}
                    />
                    <label>password</label>
                    <span className="error-msg">{loginErrorMessages?.password}</span>
                  </div>
                  <br />
                  <br />
                  <div className={`${isBuyNow ? 'mobile_loginbtn': 'buy-now-page'}`}>
                    <button type="submit"
                      disabled={isSubmittingLogin}
                      className={`${isSubmittingLogin ? 'add-opacity' : ''}`}>
                      {isSubmittingLogin ?
                        <Spinner animation="border" variant="light" /> :
                        <span>Login</span>
                      }
                    </button>
                  </div>
                </form>
              </Tab>

              <Tab eventKey="register" title="signup">
                <form onSubmit={onSubmitSignup}>
                  <div className="input-wrapper">
                    <input type="email" required
                      name="email"
                      value={signupForm?.email}
                      onChange={(event) => onInputChangeSignup(event)}
                    />
                    <label>Email</label>
                    <span className="error-msg">{signupErrorMessages?.email}</span>
                  </div>

                  <div className="input-wrapper">
                    <input type="text" required
                      name="username"
                      value={signupForm?.username}
                      onChange={(event) => onInputChangeSignup(event)}
                      onBlur={checkUserAlreadyExist}
                    />
                    <label>Username</label>
                    <span className="error-msg">{signupErrorMessages?.username}</span>
                  </div>
                  <span className="error-msg">{checkUsername}</span>
                  <div className="input-wrapper">
                    <input type="password" required
                      name="password"
                      value={signupForm?.password}
                      onChange={(event) => onInputChangeSignup(event)}
                    />
                    <label>password</label>
                    <span className="error-msg">{signupErrorMessages?.password}</span>
                  </div>

                  <div className="input-wrapper">
                    <input type="password" required
                      name="confirm_password"
                      value={signupForm?.confirm_password}
                      onChange={(event) => onInputChangeSignup(event)}
                    />
                    <label>confirm password</label>
                    <span className="error-msg">{signupErrorMessages?.confirm_password}</span>
                  </div>
                  <br />
                  <br />
                  <div className={`${isBuyNow ? 'mobile_loginbtn': 'buy-now-page'}`}>
                    <button type='submit'
                      disabled={isSubmittingSignup || uNameFound}
                      className={`${isSubmittingSignup ? 'add-opacity' : ''}`}>
                      {isSubmittingSignup ?
                        <Spinner animation="border" variant="light" /> :
                        <span>Signup</span>
                      }
                    </button>
                  </div>
                </form>
              </Tab>
            </Tabs>


          </div>
        </div>
      </div>
  )
}
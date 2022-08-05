import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Newlogo from "../../assets/images/new-logo.png";
import { validateResetForm } from '../../utils/validators';
import * as alertService from '../../services/AlertService';
import * as authService from "../../services/auth.service"

interface IProps { }
class FormVM {
  password: any;
  confirm_password: any;
}
export const ResetPassword: React.FC<IProps> = () => {
  const history = useHistory()
  const [form, setForm] = useState<FormVM>({
    password: "",
    confirm_password: '',
  })
  let [errorMessages, setErrorMessages] = useState<FormVM>(new FormVM());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const newState = { ...form, [name]: e.target.value };
    setForm({ ...form, ...newState });
    var { errors } = validateResetForm(newState);
    setErrorMessages({ ...errorMessages, [name]: errors[name] });
  }
  const useQuery = () => {
    return new URLSearchParams(window.location.search);
  }
  const query = useQuery();
  const onSubmitReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     const { isValid, errors } = validateResetForm(form);
    setErrorMessages({ ...errors });
    console.log('erf', errorMessages)
    if (!isValid) return;
    const payload = {
      password: form.password,
      token: query.get('token'),
    }
    setIsSubmitting(true);
    try {
      let response: any = await authService.forgotResetPassword(payload)
      if (response.status === 200) {
        // alertService.success(response.data.message)
        setIsSubmitting(false);
        history.push("/");
      } else {
        alertService.error(response.data.message);
      }
      setIsSubmitting(false);
    } catch (err: any) {
      setIsSubmitting(false);
      if (err.response) {
        if (err.response.data) {
          alertService.error(err.response.data.detail)
        }
      } else {
        alertService.error(err.message)
      }
    }
  }
  return (
    <div>
      <div className="login-pageform login_sign_section">
        <div className="top-header">
          <div className="inner-head">
            <img src={Newlogo} className="ml-3" alt="logo" />
            <DehazeIcon className="mr-3 toggle-bar"
            //onClick={() => setIsToggleSidebar(true)}
            />
          </div>
        </div>
        <div className="content-div text-center">
          <div className="content-bg set">
            <h3>Loyal Fans,
              <br />Royal Treatment
            </h3>
            <p className="support-text">Support creators.<br />Get recognition. Be rewarded.</p>
          </div>
          <form className="setfeild" onSubmit={onSubmitReset}>
            {/* <label htmlFor="first">tokuten.co/</label> */}
            <input type="password" required
              placeholder="New Password"
              className="form-control user-inputfeild"
              name="password"
              value={form.password}
              onChange={(event) => onInputChange(event)}
            />
            <span className="error-msg">{errorMessages?.password}</span>
            <input type="password" required
              className="form-control"
              placeholder="Confirm Password"
              name="confirm_password"
              value={form.confirm_password}
              onChange={(event) => onInputChange(event)}
            />
            <span className="error-msg">{errorMessages?.confirm_password}</span>
            {/* <div className="forgot-pass">
              <p>forgot password?</p>
            </div> */}
            <button type="submit"
              //className="login_btn"
              disabled={isSubmitting}
              className={`login_btn  ${isSubmitting ? 'add-opacity' : ''}`}
            >
              {isSubmitting ?
                <Spinner animation="border" variant="light" /> :
                <span>Reset Password</span>
              }
            </button>
            {/* <p className="dont-account">Login</p> */}
            <p className="signup-tokuten" >
              Login
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
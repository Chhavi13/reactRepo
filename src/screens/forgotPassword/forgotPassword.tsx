import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import Newlogo1 from "../../assets/images/new_landing/header-logo.png";
import { Spinner } from "react-bootstrap";
import * as alertService from "../../services/AlertService";
import { validateSignupForm } from "../../utils/validators";
import "./forgotPassword.scss";
import * as authService from "../../services/auth.service";
import TextField from "@material-ui/core/TextField";
import left from "../../assets/images/login/1.png";
import right from "../../assets/images/login/2.png";

interface IProps {
  onPageChange: any;
  setIsToggleSidebar?: any;
  isToggleSidebar?: any;
}

class SignupVM {
  email: any;
}
export const ForgotPassword: React.FC<IProps> = ({
  onPageChange,
  setIsToggleSidebar,
  isToggleSidebar
}) => {
  let [signupForm, setSignupForm] = useState<SignupVM>({
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  let [signupErrorMessages, setSignupErrorMessages] = useState<SignupVM>(
    new SignupVM()
  );

  const onInputChangeSignup = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const newState = { ...signupForm, [name]: e.target.value };
    setSignupForm({ ...signupForm, ...newState });

    var { errors } = validateSignupForm(newState);
    setSignupErrorMessages({ ...signupErrorMessages, [name]: errors[name] });
  };

  let history: any = useHistory();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let response: any = await authService.forgotPassword(signupForm);
      console.log(response);
      //let data = response?.payload;

      if (response) {
        // alertService.success("Email Successfully varified")
        setIsSubmitting(false);
        if (response.data) {
          alertService.success(response?.data?.message);
        }
        history.push("/");
      } else {
        alertService.error("Email Already varified");
      }
      setIsSubmitting(false);
    } catch (err: any) {
      setIsSubmitting(false);
      console.log("error response", err.response);
      console.log("error Message", err.message);
      if (err.response) {
        if (err.response.data) {
          alertService.error(err?.response?.data?.email[0]);
        }
      } else {
        alertService.error(err.message);
      }
    }
  };

  return (
    <div className="login-pageform login_sign_section">
      <img
        src={left}
        className="login_left_img d-lg-block d-none"
        alt="img"
      />

      <img
        src={right}
        className="login_right_img d-lg-block d-none"
        alt="img"
      />
      <div className="content-div new_login text-center">
        <div className="top-header top_new pt-4 pb-3 mb-4">
          <div className="inner-head">
            <img src={Newlogo1} className="ml-3" alt="" onClick={() => history.push('/')} />
          </div>
        </div>

        <h1 className="login_head1 mb-3">Forgot Password</h1>

        <div className="form_body">
          {/* <div className="content-bg set">
            <h3>Loyal Fans,
              <br />Royal Treatment
            </h3>
            <p className="support-text">Support creators.<br />Get recognition. Be rewarded.</p>
          </div> */}
          <form onSubmit={handleSubmit}>
            <TextField
              // id="first test"
              label="Email"
              variant="outlined"
              className="form-control user-inputfeild"
              name="email"
            />

            {/* <input
              type="email"
              required
              className="form-control "
              id="first"
              placeholder="Email"
              name="email"
              value={signupForm?.email}
              onChange={event => onInputChangeSignup(event)}
            /> */}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`login_btn mt-5  ${isSubmitting && "add-opacity"}`}
            >
              {isSubmitting ? (
                <Spinner animation="border" variant="light" />
              ) : (
                <span>Submit</span>
              )}
            </button>
            {/* <div className="">
              <p onClick={() => history.push('/')}>Login ?</p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

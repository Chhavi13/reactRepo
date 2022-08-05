import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import "./login.scss";
import Newlogo1 from "../../assets/images/new_landing/header-logo.png";
import { validateLoginForm } from "../../utils/validators";
import { Spinner } from "react-bootstrap";
import {
  getPersonalDetailAction,
  loginAction
} from "../../redux/action/authActions/authActions";
import { useDispatch } from "react-redux";
import * as alertService from "../../services/AlertService";
import { setItemLocalStorage } from "../../services/StorageService";
import left from "../../assets/images/login/1.png";
import right from "../../assets/images/login/2.png";
import { getOfferData } from "../../redux/action/getOffersAction";
import IconButton from "@material-ui/core/IconButton";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface IProps { }

class LoginVM {
  password: any;
  username: any;
}

export const LoginPage: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmittingLogin, setIsSubmittingLogin] = useState<boolean>(false);
  let [loginErrorMessages, setLoginErrorMessages] = useState<LoginVM>(
    new LoginVM()
  );
  let [loginForm, setLoginForm] = useState<LoginVM>({
    password: "",
    username: ""
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const newState = { ...loginForm, [name]: e.target.value };
    setLoginForm({ ...loginForm, ...newState });

    var { errors } = validateLoginForm(newState);
    setLoginErrorMessages({ ...loginErrorMessages, [name]: errors[name] });
  };

  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, errors } = validateLoginForm(loginForm);

    setLoginErrorMessages({ ...errors });
    if (!isValid) return;
    setIsSubmittingLogin(true);
    try {
      const response: any = await dispatch(loginAction(loginForm));
      //const response: any = await login(loginForm)
      // const response = await axios.post("http://192.168.1.29:8000/api/v1/auth/login/",loginForm)

      console.log(response);
      setIsSubmittingLogin(false);

      let data = response?.payload;
      if (data?.status === 200) {
        let Logindata = data?.data?.data;
        setIsSubmittingLogin(false);
        setItemLocalStorage("authData", JSON.stringify(Logindata));
        setItemLocalStorage("auth_token", Logindata.auth_token);
        dispatch(getPersonalDetailAction());
        dispatch(getOfferData())
        history.push("/dashboard");
      } else {
        alertService.error(data?.response.data.message);
        console.log("data from else part", data?.response.data.message);
      }
    } catch (err: any) {
      setIsSubmittingLogin(false);
      if (err.response) {
        if (err.response.data) {
          alertService.error(err.response.data.detail);
        }
      } else {
        alertService.error(err.message);
      }
    }
  };

  return (
    <div>
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
            {/* <div className="inner-head d-md-block d-none">
            <img src={Newlogo} className="ml-3" alt="" />
            <DehazeIcon
              className={`${isToggleSidebar && "rotate"} mr-3 toggle-bar`}
              onClick={() => setIsToggleSidebar(true)}
            />
          </div> */}
            <div className="inner-head">
              <img src={Newlogo1} className="ml-3" alt="img" onClick={() => history.push('/')} />
            </div>
          </div>
          <h1 className="login_head1 mb-3">Login</h1>

          <div className="form_body">
            <form onSubmit={onSubmitLogin}>

              <TextField
                id="first test"
                label="Username"
                variant="outlined"
                className="w-100 user-inputfeild"
                name="username"
                value={loginForm?.username}
                onChange={(event: any) => onInputChange(event)}
              />
              <span className="error-msg">
                {loginErrorMessages?.username}
              </span>

              {/* <label htmlFor="first">tokuten.co/</label>
              <input
                type="text"
                required
                id="first test"
                placeholder="yourname"
                className="form-control user-inputfeild"
                name="username"
                value={loginForm?.username}
                onChange={event => onInputChange(event)}
              /> */}
              <div className="mt-5 mb-4">
                {/* <TextField
                  label="Password"
                  variant="outlined"
                  className="user-inputfeild"
                  name="password"
                  fullWidth
                  value={loginForm?.password}
                  onChange={(event: any) => onInputChange(event)}
                  type={values.showPassword ? "text" : "password"}
                /> */}
                <FormControl variant="outlined" className="w-100 user-inputfeild user_passowrd1">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    label="Password"
                    //variant="outlined"
                    // className="w-100 user-inputfeild"
                    name="password"
                    value={loginForm?.password}
                    onChange={(event: any) => onInputChange(event)}
                    type={values.showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
                <span className="error-msg">
                  {loginErrorMessages?.password}
                </span>
              </div>

              {/* <input
                type="password"
                required
                className="form-control"
                placeholder="Password"
                name="password"
                value={loginForm?.password}
                onChange={event => onInputChange(event)}
              /> */}
              <div className="forgot-pass">
                <p onClick={() => history.push("/ForgotPassword")}>
                  forgot password?
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmittingLogin}
                className={`login_btn  ${isSubmittingLogin ? "add-opacity" : ""
                  }`}
              >
                {isSubmittingLogin ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  <span>Login</span>
                )}
              </button>

              <p className="dont-account mt-md-2 mt-4">
                don’t have an account yet?
              </p>
              <p className="signup-tokuten" onClick={() => history.push('/signup')}>
                sign up for tokuten
              </p>
            </form>
          </div>

          {/* <div className="d-none">
            <h3>
              Loyal Fans,
              <br />
              Royal Treatment
            </h3>
            <p className="support-text">
              Support creators.
              <br />
              Get recognition. Be rewarded.
            </p>
          </div>

          <form className="setfeild d-md-block d-none" onSubmit={onSubmitLogin}>
            <label htmlFor="first">tokuten.co/</label>
            <input
              type="text"
              required
              id="first test"
              placeholder="yourname"
              className="form-control user-inputfeild"
              name="username"
              value={loginForm?.username}
              onChange={event => onInputChange(event)}
            />

            <input
              type="password"
              required
              className="form-control"
              placeholder="Password"
              name="password"
              value={loginForm?.password}
              onChange={event => onInputChange(event)}
            />
            <div className="forgot-pass">
              <p onClick={() => history.push("/ForgotPassword")}>
                forgot password?
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmittingLogin}
              className={`login_btn  ${isSubmittingLogin ? "add-opacity" : ""}`}
            >
              {isSubmittingLogin ? (
                <Spinner animation="border" variant="light" />
              ) : (
                <span>Login</span>
              )}
            </button>

            <p className="dont-account">don’t have an account yet?</p>
            <p className="signup-tokuten" onClick={() => onPageChange(false)}>
              sign up for tokuten
            </p>
          </form> */}
        </div>
      </div>
    </div>
  );
};

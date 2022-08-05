import React, { ChangeEvent, FormEvent, useState } from "react";
import "./register.scss";
import { Spinner } from "react-bootstrap";
import { validateSignupForm } from "../../utils/validators";
import * as alertService from "../../services/AlertService";
import { useDispatch } from "react-redux";
import { checkUserNameUnique } from "../../redux/action/authActions/authActions";
import axiosInstance from "../../services/axios";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { useHistory } from "react-router-dom";
import { WaitlistHeader } from "../../components/WaitlistHeader/waitlistHeader";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import left from "../../assets/images/login/1.png";
import right from "../../assets/images/login/2.png";

import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from "@material-ui/core/IconButton";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
function countryToFlag(isoCode: string) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
      .toUpperCase()
      .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

interface IProps { }

class SignupVM {
  email: any;
  username: any;
  password: any;
  confirm_password: any;
  first_name: any;
  last_name: any;
  country: any;
}

export const RegisterPage: React.FC<IProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  let [signupForm, setSignupForm] = useState<SignupVM>({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    country: ""
  });
  const [isSubmittingSignup, setIsSubmittingSignup] = useState<boolean>(true);
  
  let [signupErrorMessages, setSignupErrorMessages] = useState<SignupVM>(
    new SignupVM()
  );
  const [uNameFound, setuNameFound] = useState<boolean>(false);
  const [emailFound, setEmailFound] = useState<boolean>(false);
  const [checkUsername, setCheckUserName] = useState<any>("");
  const [checkEmail, setCheckEmail] = useState<any>("");

  const onInputChangeSignup = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const newState = { ...signupForm, [name]: e.target.value };
    setSignupForm({ ...signupForm, ...newState });

    var { errors } = validateSignupForm(newState);
    setSignupErrorMessages({ ...signupErrorMessages, [name]: errors[name] });
  };

  const onSubmitSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // history.push("/signup/step-1");
    const { isValid, errors } = validateSignupForm(signupForm);
    setSignupErrorMessages({ ...errors });
    if (!isValid) return;

    const payload = {
      email: signupForm.email,
      username: signupForm.username,
      password: signupForm.password,
      // first_name: signupForm.first_name,
      // last_name: signupForm.last_name,
      country: signupForm.country
    };

    history.push({
      pathname: "/signup/step-1",
      state: { data: payload }
    });

    // setIsSubmittingSignup(true);
    // try {
    //   const response: any = await axiosInstance.post("auth/register/", payload);
    //   console.log(response);

    //   let data = response?.data;

    //   if (data) {
    //     alertService.success(data.message);
    //     // setKey("login")
    //     setIsSubmittingSignup(false);
    //     history.push("/signup/step-1");
    //   }
    //   setIsSubmittingSignup(false);
    //   onPageChange(true);
    // } catch (err) {
    //   setIsSubmittingSignup(false);
    //   if (err.response) {
    //     let message: any = "";
    //     const data: any = err?.response?.data?.data;
    //     let count: number = 0;
    //     for (let [key] of Object.entries(data)) {
    //       count++;
    //       message += `${count}) ${data[key][0]} \n`;
    //     }
    //     alertService.error(message);
    //   }
    //   setIsSubmittingSignup(false);
    // }
  };


  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  let checkUserAlreadyExist = async () => {
    try {
      let user_name: any = { username: signupForm.username };
      const response: any = await dispatch(checkUserNameUnique(user_name));
      let data = response?.payload;

      if (data?.data?.message) {
        setuNameFound(true);
        setCheckUserName(data?.data?.message);
      } else {
        setCheckUserName("");
        setuNameFound(false);
      }
    } catch (error) {
      setCheckUserName("");
      setuNameFound(false);
    }
  };
  let checkEmailAlreadyExist = async () => {
    try {
      let email: any = { email: signupForm.email };
      const response: any = await dispatch(checkUserNameUnique(email));
      let data = response?.payload;

      if (data?.data?.success) {
        setEmailFound(true);
        setCheckEmail(data?.data?.message);
      } else {
        setCheckEmail("");
        setEmailFound(false);
      }
    } catch (error) {
      setCheckEmail("");
      setEmailFound(false);
    }
  };

  const onCheckBoxHandler = (event: any) => {
    const checked: boolean = event.target.checked;
    setIsSubmittingSignup(!checked);
  }
  
  const setCountryFormValue = (country: string) => {
    const data: any = { target: {value: country, name: 'country'} };
    onInputChangeSignup(data);
  }

  return (
    <div>
      <div className="login-pageform registration-pageform login_sign_section">
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
        {/* <div className="top-header">
          <div className="inner-head">
            <img src={Newlogo} className="ml-3" alt="logo" />
            <DehazeIcon
              className="mr-3 toggle-bar"
              onClick={() => setIsToggleSidebar(true)}
            /> */}
        {/* <img src={Togglebar} className="mr-3 toggle-bar" alt="Image" onClick={()=>setIsToggleSidebar(true)} /> */}
        {/* </div>
        </div> */}

        <div className="content-div new_login registration-ui text-center">
          <WaitlistHeader />

          <div className="content-bg1">
            {/* <h3>Loyal Fans,
              <br />Royal Treatment
            </h3>
            <p className="support-text">
              Support creators.
              <br />
              Get recognition. Be rewarded.
            </p> */}

            <h1 className="login_head1 mb-3">Join Waitlist</h1>
          </div>

          <div className="form_body pt-0">
            <form className="" onSubmit={onSubmitSignup}>
              <div className="available-items">
                <div className="row">
                  <div className="col-md-6 col-6">
                    <div className="form-group">
                      {/* <TextField
                        // id="first test"
                        label="First Name"
                        variant="outlined"
                        className="w-100 user-inputfeild mt-2"
                        name="first_name"
                        value={signupForm?.first_name}
                        onChange={(event: any) => onInputChangeSignup(event)}
                      /> */}

                      {/* <div className="form-group last-namearea">
                    
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div> */}
                      {/* <span className="error-msg">
                        {signupErrorMessages?.first_name}
                      </span> */}
                    </div>
                  </div>
                  <div className="col-md-6 col-6">
                    <div className="form-group">
                      {/* <TextField
                        // id="first test"
                        label="Last Name"
                        variant="outlined"
                        className="w-100 user-inputfeild mt-2"
                        name="last_name"
                        value={signupForm?.last_name}
                        onChange={(event: any) => onInputChangeSignup(event)}
                      /> */}
                      {/* <div className="form-group last-namearea">
                   
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </div> */}
                      {/* <span className="error-msg">
                        {signupErrorMessages?.last_name}
                      </span> */}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <TextField
                    // id="first test"
                    label="Email address"
                    variant="outlined"
                    className="w-100 user-inputfeild mt-2"
                    name="email"
                    value={signupForm?.email}
                    onBlur={checkEmailAlreadyExist}
                    onChange={(event: any) => onInputChangeSignup(event)}
                  />

                  {/* <input
                  type="email"
                  required
                  className="form-control "
                  id="first"
                  placeholder="Email address"
                  name="email"
                  value={signupForm?.email}
                  onBlur={checkEmailAlreadyExist}
                  onChange={event => onInputChangeSignup(event)}
                /> */}
                  <span className="error-msg">
                    {signupErrorMessages?.email}
                  </span>
                  <span className="error-msg">{checkEmail}</span>
                </div>

                {/* <div className="tokuten-user-name">tokuten.co/</div> */}

                {/* <input type="password" className="form-control mb-4" placeholder="Password"></input> */}
                <div className="form-group">
                  {/* <label htmlFor="first">tokuten.co/</label> */}

                  <TextField
                    // id="first test"
                    label="Username"
                    variant="outlined"
                    className="w-100 user-inputfeild mt-2"
                    name="username"
                    value={signupForm?.username}
                    onChange={(event: any) => onInputChangeSignup(event)}
                    onBlur={checkUserAlreadyExist}
                  />

                  {/* <input
                  type="text"
                  required
                  id="first test"
                  className="form-control user-inputfeild"
                  placeholder="Username"
                  name="username"
                  value={signupForm?.username}
                  onChange={event => onInputChangeSignup(event)}
                  onBlur={checkUserAlreadyExist}
                /> */}
                  <span className="error-msg">
                    {signupErrorMessages?.username}
                  </span>
                  <span className="error-msg">{checkUsername}</span>
                </div>

                <div className="form-group margin_input mt-4">
                  {/* <select className="form-control login-selectcity">
                  <option>Choose country</option>
                </select> */}
                  <FormControl
                    variant="outlined"
                    className="w-100 login-selectcity"
                  >
                    {/* <InputLabel htmlFor="outlined-age-native-simple">
                      Choose country
                    </InputLabel> */}
                    {/* <Select
                      native
                      label="Choose country"
                      className="select_material"
                      value={signupForm.country}
                      inputProps={{
                        name: "country",
                        id: "outlined-age-native-simple"
                      }}
                      onChange={(event: any) => onInputChangeSignup(event)}
                    >
                      <option value={""}></option>
                      <option value={"India"}>India</option>
                      <option value={"USA"}>USA</option>
                      <option value={"Spain"}>Spain</option>
                    </Select> */}

                    <Autocomplete
                      id="country-select-demo"
                      // style={{ width: 300 }}
                      options={countries as CountryType[]}
                      classes={{
                        option: classes.option,
                      }}
                      inputValue={signupForm.country}
                      onInputChange={ (e: any, value: any) => setCountryFormValue(value) }
                      // onInputChange={(e: any, value: any) => setSignupForm({ ...signupForm, ['country']: value })}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span>{countryToFlag(option.code)}</span>
                          {option.label} ({option.code}) +{option.phone}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose country"
                          variant="outlined"
                          className="select_material"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </FormControl>
                  <span className="error-msg">
                    {signupErrorMessages?.country}
                  </span>
                </div>
                <div className="form-group height_div">
                  {/* <TextField
                    id="first test"
                    type="password"
                    label="Password"
                    variant="outlined"
                    className="form-control user-inputfeild mt-2"
                    name="password"
                    value={signupForm?.password}
                    onChange={(event: any) => onInputChangeSignup(event)}
                  /> */}
                  <FormControl variant="outlined" className="w-100 user-inputfeild user_passowrd2">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                  label="Password"
                  name="password"
                  value={signupForm?.password}
                  onChange={(event: any) => onInputChangeSignup(event)}
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
                  {/* <input
                  type="password"
                  required
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={signupForm?.password}
                  onChange={event => onInputChangeSignup(event)}
                /> */}
                  <span className="error-msg">
                    {signupErrorMessages?.password}
                  </span>
                </div>
                <div className="form-group height_div">
                  {/* <TextField
                    type="password"
                    // id="first test"
                    label="Confirm password"
                    variant="outlined"
                    className="w-100 user-inputfeild mt-3 mb-0"
                    name="confirm_password"
                    value={signupForm?.confirm_password}
                    onChange={(event: any) => onInputChangeSignup(event)}
                  /> */}

                  {/* <input
                  type="password"
                  required
                  className="form-control"
                  placeholder="Confirm password"
                  name="confirm_password"
                  value={signupForm?.confirm_password}
                  onChange={event => onInputChangeSignup(event)}
                /> */}
                  {/* <span className="error-msg">
                    {signupErrorMessages?.confirm_password}
                  </span> */}
                </div>
                {/* <br /> */}
                {/* <button className="login_btn">sign up</button> */}
                <FormGroup className="agree_label">
                  <FormControlLabel control={<Checkbox />} 
                    onChange={onCheckBoxHandler}
                    label="I certify that I am 18 years of age or older and I agree to Terms of Use" />
                </FormGroup>

                <button
                  type="submit"
                  disabled={isSubmittingSignup || uNameFound || emailFound}
                  className={`login_btn mt-2 ${isSubmittingSignup ? 'add-opacity' : ''}`}>
                  <span>Next</span>
                </button>
                <p className="dont-account">already have an account?</p>
                <p
                  className="signup-tokuten"
                  onClick={() => history.push('/login')}
                >
                  {/* <a href="">Login</a> */}
                  Login
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


interface CountryType {
  code: string;
  label: string;
  phone: string;
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  { code: 'AE', label: 'United Arab Emirates', phone: '971' },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  { code: 'AU', label: 'Australia', phone: '61', suggested: true },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  { code: 'BA', label: 'Bosnia and Herzegovina', phone: '387' },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  { code: 'CA', label: 'Canada', phone: '1', suggested: true },
  { code: 'CC', label: 'Cocos (Keeling) Islands', phone: '61' },
  { code: 'CD', label: 'Congo, Democratic Republic of the', phone: '243' },
  { code: 'CF', label: 'Central African Republic', phone: '236' },
  { code: 'CG', label: 'Congo, Republic of the', phone: '242' },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  { code: 'DE', label: 'Germany', phone: '49', suggested: true },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  { code: 'DO', label: 'Dominican Republic', phone: '1-809' },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  { code: 'FK', label: 'Falkland Islands (Malvinas)', phone: '500' },
  { code: 'FM', label: 'Micronesia, Federated States of', phone: '691' },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  { code: 'FR', label: 'France', phone: '33', suggested: true },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  { code: 'GS', label: 'South Georgia and the South Sandwich Islands', phone: '500' },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  { code: 'HM', label: 'Heard Island and McDonald Islands', phone: '672' },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  { code: 'IO', label: 'British Indian Ocean Territory', phone: '246' },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  { code: 'IR', label: 'Iran, Islamic Republic of', phone: '98' },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  { code: 'JP', label: 'Japan', phone: '81', suggested: true },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  { code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869' },
  { code: 'KP', label: "Korea, Democratic People's Republic of", phone: '850' },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  { code: 'LA', label: "Lao People's Democratic Republic", phone: '856' },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  { code: 'MD', label: 'Moldova, Republic of', phone: '373' },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  { code: 'MF', label: 'Saint Martin (French part)', phone: '590' },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  { code: 'MK', label: 'Macedonia, the Former Yugoslav Republic of', phone: '389' },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  { code: 'MP', label: 'Northern Mariana Islands', phone: '1-670' },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  { code: 'PM', label: 'Saint Pierre and Miquelon', phone: '508' },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  { code: 'PS', label: 'Palestine, State of', phone: '970' },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  { code: 'SJ', label: 'Svalbard and Jan Mayen', phone: '47' },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  { code: 'ST', label: 'Sao Tome and Principe', phone: '239' },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  { code: 'SX', label: 'Sint Maarten (Dutch part)', phone: '1-721' },
  { code: 'SY', label: 'Syrian Arab Republic', phone: '963' },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  { code: 'TC', label: 'Turks and Caicos Islands', phone: '1-649' },
  { code: 'TD', label: 'Chad', phone: '235' },
  { code: 'TF', label: 'French Southern Territories', phone: '262' },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  { code: 'TT', label: 'Trinidad and Tobago', phone: '1-868' },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  { code: 'TW', label: 'Taiwan, Province of China', phone: '886' },
  { code: 'TZ', label: 'United Republic of Tanzania', phone: '255' },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  { code: 'US', label: 'United States', phone: '1', suggested: true },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  { code: 'VA', label: 'Holy See (Vatican City State)', phone: '379' },
  { code: 'VC', label: 'Saint Vincent and the Grenadines', phone: '1-784' },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  { code: 'VG', label: 'British Virgin Islands', phone: '1-284' },
  { code: 'VI', label: 'US Virgin Islands', phone: '1-340' },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];


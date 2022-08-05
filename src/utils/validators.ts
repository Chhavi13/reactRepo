import isEmpty from "lodash/isEmpty";
import { REQUIRED, EMAIL_VALID, PASSWORD_REQ, PASSWORD_LEN, USERNAME_SPACE} from "./messages";

const isEmailValid = (email: any) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

const isPasswordValid = (password: any) => {
  const pattern = /^.*(?=.{8,20})(?=.*\d)(?=.*[a-zA-Z ])(?=.*[@#$%&!-_]).*$/;
  if (!pattern.test(password)) return true;
  else return false;
};
const isUsernameValid=(username:string)=>{
  var whiteSpace = new RegExp("\\s+");
  if(whiteSpace.test(username)) return true
  else return false;
}

const validateLoginForm = (data: any) => { 
  
  let errors: any = {};

  if (isEmpty(data.username)) {
    errors.username = `Username ${REQUIRED}`;
  }
  if (isEmpty(data.password)) {
    errors.password = PASSWORD_REQ;
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateResetForm = (data: any) => {
  let errors: any = {};
  if (isEmpty(data.password)) {
    errors.password = PASSWORD_REQ;
  } else if (isPasswordValid(data.password)) {
    errors.password = PASSWORD_LEN;
  }
  if (isEmpty(data.confirm_password)) {
    errors.confirm_password = `Confirm password ${REQUIRED}`;
  } else if (data.password !== data.confirm_password) {
    errors.confirm_password = 'Passwords must be the same';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

const validateSignupForm = (data: any) => { 
  
  let errors: any = {};
  if (isEmpty(data.email)) {
    errors.email = `Email ${REQUIRED}`;
  } else if (!isEmailValid(data.email)) {
    errors.email = EMAIL_VALID;
  }
  if (isEmpty(data.username)) {
    errors.username = `Username ${REQUIRED}`;
  } else if (isUsernameValid(data.username)){
    errors.username = USERNAME_SPACE;
  }
  if (isEmpty(data.password)) {
    errors.password = PASSWORD_REQ;
  } else if(isPasswordValid(data.password)) {
    errors.password = PASSWORD_LEN;
  }
  // if (isEmpty(data.confirm_password)) {
  //   errors.confirm_password = `Confirm password ${REQUIRED}`;
  // } else if (data.password !== data.confirm_password) {
  //   errors.confirm_password = 'Passwords must be the same';
  // }
  // if (isEmpty(data.first_name)) {
  //   errors.first_name = `First Name ${REQUIRED}`;
  // }
  // if (isEmpty(data.last_name)) {
  //   errors.last_name = `Last Name ${REQUIRED}`;
  // }
  if (isEmpty(data.country)) {
    errors.country = `Country ${REQUIRED}`;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export { validateLoginForm, validateSignupForm, validateResetForm };

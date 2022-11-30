import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Registration = () => {
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: ""
  })
  const navigate = useNavigate()

  const [ErrField, setErrField] = useState({
    nameErr: "",
    emailErr: "",
    phoneErr: "",
    passwordErr: "",
    cpasswordErr: ""
  })

  const inputHandler = (e) => {
    const { name, value } = e.target
    setInputField({ ...inputField, [name]: value })
    // console.log(inputField)
  }
  const submitButton = async(e) => {
    e.preventDefault();
    if (validForm()) {
      console.log("valid")
      let url ="http://localhost:4000/users/register"
      // let options ={
      //   method:'POST',
      //   url:url,
      //   headers:{
      //     'content-type': 'text/json'
      //   },
      //   data:inputField
      // }
      try{
    //   debugger
          let response =await axios.post('http://localhost:4000/users/register',inputField)
          // console.log(response)
          clearState()
          if(response.status == 200){
           alert(" registered successfully")
           setTimeout(() => {
            navigate("/login")
           }, 1000);
          }
      }catch(error){
     //   debugger
        console.log(error)
        alert("something went wrong")
      }

    } else {
      console.log("form invalid")
      alert("form invalid")
    }

  }

   const clearState = () => {
    setInputField({
      name:"",
      email:"",
      phone:"",
      password:"",
      cpassword:""

    });
  };

  const validForm = () => {
    let formIsValid = true
    setErrField({
      nameErr: "",
    emailErr: "",
    phoneErr: "",
    passwordErr: "",
    cpasswordErr: ""

    })
    if (inputField.name == "") {
      formIsValid = false
      setErrField(prevState => ({
        ...prevState, nameErr: "Please Enter Name !"
      }))
        
    }
    if (inputField.email == "") {
      formIsValid = false
      setErrField(prevState => ({
        ...prevState, emailErr: "Please Enter email !"
      }))

    }
    if (inputField.phone == "") {
      formIsValid = false
      setErrField(prevState => ({
        ...prevState, phoneErr: "Please Enter phone !"
      }))

    }
    if (inputField.password == "") {
      formIsValid = false
      setErrField(prevState => ({
        ...prevState, passwordErr: "Please Enter password !"
      }))

    }

    if (inputField.cpassword == "") {
      formIsValid = false
      setErrField(prevState => ({
        ...prevState, cpasswordErr: "Please Enter confirm password !"
      }))

    }
    if (inputField.cpassword !="" && inputField.cpassword != inputField.password) {
      formIsValid = false
      setErrField(prevState => ({
        ...prevState, cpasswordErr: " password does not match !"
      }))

    }
   console.log(formIsValid)
    return formIsValid
  }

  return (<>
    <div className="signup-form">
      {/* <form action="/examples/actions/confirmation.php" method="post"> */}
      {/* <pre>{JSON.stringify(inputField,undefined,2)}</pre> */}
      <form onSubmit={submitButton} method="post">
        <h2>Register</h2>
        <p className="hint-text">Create your account. It's free and only takes a minute.</p>
        <div className="form-group">
          <div className="row">
            <div className="col"><input type="text" className="form-control" name="name" value={inputField.name} onChange={inputHandler} placeholder="Name" />
              {ErrField.nameErr.length > 0 && <span className='validation'>{ErrField.nameErr}</span>

              }
            </div>
          </div><br></br>
          <div className="row">
            <div className="col"><input type="text" className="form-control" name="phone" value={inputField.phone} onChange={inputHandler} placeholder="Phone" maxLength="10" /></div>
            {ErrField.phoneErr.length > 0 && <span className='validation'>{ErrField.phoneErr}</span>

              }

          </div><br></br>
          <div className="form-group">
            <input type="email" className="form-control" name="email" value={inputField.email} onChange={inputHandler} placeholder="Email" />
            {ErrField.emailErr.length > 0 && <span className='validation'>{ErrField.emailErr}</span>

}
          </div>
          <div className="form-group">
            <input type="password" className="form-control" name="password" value={inputField.password} onChange={inputHandler} placeholder="Password" />
            {ErrField.passwordErr.length > 0 && <span className='validation' >{ErrField.passwordErr}</span>

}
          </div>
          <div className="form-group">
            <input type="password" className="form-control" name="cpassword" value={inputField.cpassword} onChange={inputHandler} placeholder="Confirm Password" />
            {ErrField.cpasswordErr.length > 0 && <span className='validation' >{ErrField.cpasswordErr}</span>

}
        
          </div>

          <div className="form-group">
            <button type='submit' className="btn btn-success btn-lg btn-block">Register Now</button>
          </div>
        </div>
      </form>
      <div className="text-center">Already have an account? <a href="">Sign in</a></div>
    </div>


  </>)
}

export default Registration
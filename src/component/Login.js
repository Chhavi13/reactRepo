import React, { useState } from 'react'
import profile from '../images/userpic.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

  const [inputField, setInputField] = useState({
    email: "",
    password: "",

  })
  const navigate = useNavigate()

  const [ErrField, setErrField] = useState({

    emailErr: "",
    passwordErr: "",

  })
  const inputHandler = (e) => {
    const { name, value } = e.target
    setInputField({ ...inputField, [name]: value })
    console.log(inputField)
  }
  const submitButton = async (e) => {
    e.preventDefault();
    if (validForm()) {
      console.log("valid")
      let url = "http://localhost:4000/users/login"
      // let options ={
      //   method:'POST',
      //   url:url,
      //   headers:{
      //     'content-type': 'text/json'
      //   },
      //   data:inputField
      // }
      try {
        //   debugger
        let response = await axios.post('http://localhost:4000/users/login', inputField)
        console.log(response)
        clearState()
        if (response.status == 200) {
          toast.success("login successfully")
          localStorage.setItem('token',response.data.data.token)
          setTimeout(() => {
            navigate("/")
          }, 1000);
        }
        // }else{
        //   alert()
        // }

      } catch (error) {
        //   debugger
        console.log(error)
        alert("invalid credintial")
      }

    } else {
      console.log("form invalid")
      alert("form invalid")
    }

  }

  const clearState = () => {
    setInputField({
      email: "",
      password: ""

    });
  };


  const validForm = () => {
    let formIsValid = true
    setErrField({
      emailErr: "",
      passwordErr: "",
    })

    if (inputField.email == "") {
      formIsValid = false
      setErrField(prevState => ({
        ...prevState, emailErr: "Please Enter email !"
      }))

    }

    if (inputField.password == "") {
      formIsValid = false
      setErrField(prevState => ({
        ...prevState, passwordErr: "Please Enter password !"
      }))

    }

    console.log(formIsValid)
    return formIsValid
  }

  return (
    <div className='main'>
    
      <div className='sub-main'>
        <div>

          <div className='img'>
            <div className='container-image'>
              <img src={profile} alt="profile" className='profile' />
            </div>
          </div>

          <div><h3 style={{ color: 'blue' }}> LOGIN </h3></div>
          <br></br>
          <div >
            <input type="text" size="20" name="email" value={inputField.email} onChange={inputHandler} placeholder='username' className='email' required />
            <div>{ErrField.emailErr.length > 0 && <span className='validation'>{ErrField.emailErr}</span>

            }</div>
          </div><br></br>
          <div  >
            <input type="password" name="password" value={inputField.password} onChange={inputHandler} placeholder='password' className='email ' required />
            <div>{ErrField.passwordErr.length > 0 && <span className='validation' >{ErrField.passwordErr}</span>

            }</div>
          </div>
          <div className='btnsb'>
            <br></br>
            <button type='button' onClick={submitButton} style={{ fontSize: "20px" }}>Login <AiOutlineLogin style={{ fontSize: "30px" }} />
            </button>
            <ToastContainer />
          </div>
          <br></br>
          <p className='link'>
            <a href='#'>forgot password ?</a> or <a href='signup'>Create account </a>
          </p>
        </div>



      </div>
       
    </div>
  )
}

export default Login
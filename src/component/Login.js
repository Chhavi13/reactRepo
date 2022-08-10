import React, { useEffect, useState } from 'react'
import profile from '../assets/images/userpic.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../App';
import { useSelector, useDispatch } from 'react-redux'
import { loginFun,reset } from '../features/User/userSlice';
import CircularProgress from '@mui/material/CircularProgress';


const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user,isLoading,isError,isSuccess,message} = useSelector((state)=>state.user)
  // console.log("user data from redux",user)



  const [inputField, setInputField] = useState({
    email: "",
    password: "",

  })
  const [isSubmit, setIsSubmit] = useState(false)

  const [ErrField, setErrField] = useState({

    emailErr: "",
    passwordErr: "",

  })
  const inputHandler = (e) => {
    const { name, value } = e.target
    setInputField({ ...inputField, [name]: value })
    validate(name, value)

    }
    const validate = (name, value) => {

      switch (name) {  
        case 'email':
          if(!value){
            setErrField(prevState => ({
              ...prevState, emailErr: "enter  email  !"
            }))}
         else if (
            !new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
          ) {
            setErrField(prevState => ({
              ...prevState, emailErr: "enter strong email  !"
            }))
          }
          else {
            setErrField({...ErrField, emailErr: "" })
          }
          break;
  
        case 'password':
          if(!value){
            setErrField(prevState => ({
              ...prevState, passwordErr: "enter  password  !"
            }))}
    
         else if (
            !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
          ) {
            setErrField(prevState => ({
              ...prevState,
              passwordErr: 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
            }))
          } else {
            //debugger
            setErrField({ ...ErrField,passwordErr: "" })
  
          }
          break;  
        
        default:
          break;
      }
    }
  
  // useEffect(()=>{
  //   message && toast.error(message)
  //   console.log("cccccc",message)

  //  },[message])
  
  const submitButton = async (e) => {
    e.preventDefault();
    
    let isValid =validForm()
    console.log(isValid)
    if (isValid) {
      try{
   let response = await dispatch(loginFun(inputField))
  

  //  console.log(response)
   clearState()
   if(response?.payload?.status ==200){
    setIsSubmit(true)
    //toast.success("login successfully")
     
    const user =JSON.stringify(response.payload.data)
      const token =response.payload.data.token
      localStorage.setItem('user',user)
      localStorage.setItem('token',token)
      setTimeout(() => {
        navigate("/")

      }, 1000);
     
         
   }else{
    toast.error("invalid credential")
   }
   }catch(error){
     console.log(error)
     
     
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
    // setErrField({
    //   emailErr: "",
    //   passwordErr: "",
    // })

    if (!inputField?.email) {
      formIsValid = false
      setErrField(prevState => ({
        ...prevState, emailErr: "Please Enter email !"
      }))

    }

    if (!inputField?.password ) {
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
            <div>{ErrField?.emailErr?.length > 0 && <span className='validation'>{ErrField.emailErr}</span>

            }</div>
          </div><br></br>
          <div  >
            <input type="password" name="password" value={inputField.password} onChange={inputHandler} placeholder='password' className='email ' required />
            <div>{ErrField?.passwordErr?.length > 0 && <span className='validation' >{ErrField.passwordErr}</span>

            }</div>
          </div>
          <div className='btnsb'>
            <br></br>
            <button type='button' onClick={submitButton} style={{ fontSize: "20px" }}>{isSubmit ? <CircularProgress style={{ height: 20, width: 20, color: 'white' }}/>: "Login"}
            
            </button>
            <ToastContainer />
          </div>
          <br></br>
          <p className='link'>
          <Link to="/forgetpwd">forget password ?</Link>or<Link to="/register">create Account</Link>
          </p>
        </div>



      </div>

    </div>
  )
}

export default Login



// <AiOutlineLogin style={{ fontSize: "30px" }} />

//  let url = "http://localhost:4000/users/login"
      // let options ={
      //   method:'POST',
      //   url:url,
      //   headers:{
      //     'content-type': 'text/json'
      //   },
      //   data:inputField
      // }
      //   try {
      //     //   debugger
      //     let response = await axios.post('http://localhost:4000/users/login', inputField)
      //     console.log("===========%%%%%%%",response.data.data)
      //     clearState()
      //     if (response.status == 200) {
      //       toast.success("login successfully")
      //       const user =JSON.stringify(response.data.data)
      //       localStorage.setItem('token',response.data.data.token)
      //       // localStorage.setItem('user',user)
      //       // dispatch({type:"USER",payload:user})
      //       

      //       setTimeout(() => {
      //         navigate("/")
      //       }, 1000);
      //     }
      //     return response
      //     // }else{
      //     //   alert()
      //     // }

      //   } catch (error) {
      //     //   debugger
      //     console.log(error)
      //     alert("invalid credintial")
      //   }
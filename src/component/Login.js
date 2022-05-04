import React from 'react'
import profile from '../images/userpic.png'

import {AiOutlineLogin } from 'react-icons/ai'

const Login = () => {
  return (
    <div className='main'>
      <div className='sub-main'>
        <div>

          <div className='img'>
            <div className='container-image'>
              <img src={profile} alt="profile" className='profile' />
            </div>
          </div>
          
          <div><h3 style={{color:'blue'}}> LOGIN </h3></div>
          <br></br>
          <div>
            <input type="text" placeholder='   username' className='email' required/>
          </div><br></br>
          <div>
            <input type="password" placeholder='    password' className='email ' required/>
          </div>
          <div>
            <br></br>
          <button type='submit'  style={{fontSize:"20px"}}>Login <AiOutlineLogin  style={{fontSize:"30px"}} />
</button>
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
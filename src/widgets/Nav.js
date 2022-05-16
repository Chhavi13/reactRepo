import React from 'react'
import { NavLink } from 'react-router-dom'
 import {BiLogOutCircle} from 'react-icons/bi'



  const Nav = () => {
   const token =localStorage.getItem("token")

  return (
    <div className='ulNav'>
          
        
         { token &&  <li><NavLink to='/'  className={(navData) => navData.isActive ? "active" : "" } >Home</NavLink></li>}{/*active clss in v6  */}
    
           <li><NavLink to='/register'activeclassname="active"  >Register</NavLink></li>
           <li><NavLink to='/login' activeclassname="active" >Login</NavLink></li>

          {token && <li style={{float:"right"}}><NavLink to='/logout' activeclassname="active"   >Log out <BiLogOutCircle   style={{fontSize:"30px"}}/></NavLink></li>} 
           
         {token && <li style={{float:"right"}}><NavLink to='/test' activeclassname="active"   >HEllo username</NavLink></li>}  
       <li style={{float:"left"}}><NavLink to='/showpost' activeclassname="active"   >ShowPost</NavLink></li>
    </div>
  )
}
export default Nav
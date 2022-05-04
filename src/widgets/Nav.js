import React from 'react'
import { NavLink } from 'react-router-dom'
 import {BiLogOutCircle} from 'react-icons/bi'



  const Nav = () => {
  return (
    <div className='ulNav'>
        
           <li><NavLink to='/'  className={(navData) => navData.isActive ? "active" : "" } >Home</NavLink></li>{/*active clss in v6  */}
           <li><NavLink to='/register'activeClassName="active"  >Register</NavLink></li>
           <li><NavLink to='/login' activeClassName="active" >Login</NavLink></li>

           <li style={{float:"right"}}><NavLink to='/logout' activeClassName="active"   >Log out <BiLogOutCircle   style={{fontSize:"30px"}}/></NavLink></li>
           
           <li style={{float:"right"}}><NavLink to='/test' activeClassName="active"   >HEllo username</NavLink></li>
      
    </div>
  )
}
export default Nav
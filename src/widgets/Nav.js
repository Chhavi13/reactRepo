import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { BiLogOutCircle } from 'react-icons/bi'
import { UserContext } from '../App';
import { useSelector } from 'react-redux';





const Nav = () => {
  const navigate = useNavigate()


  const token = localStorage.getItem("token")
  const user =useSelector((state)=>state.user)
 
   console.log("99999999999", user)
  return (
    <div className='ulNav'>


      {token && <li><NavLink to='/' className={(navData) => navData.isActive ? "active" : ""} >Home</NavLink></li>}{/*active clss in v6  */}
      {token && <li><NavLink to='/createpost' className={(navData) => navData.isActive ? "active" : ""} >Create Post</NavLink></li>}
    {!token &&  <li><NavLink to='/register' activeclassname="active"  >Register</NavLink></li>} 
    {!token &&  <li><NavLink to='/login' activeclassname="active" >Login</NavLink></li>} 

      {token && <li style={{ float: "right" }}><NavLink to='/login' activeclassname="active" onClick={() => {
        localStorage.clear()
        // dispatch({ type: "CLEAR" })
        navigate("/login")


      }}   >Logout <BiLogOutCircle style={{ fontSize: "30px" }} /></NavLink></li>}

      {token && <li style={{ float: "right" }}><NavLink to='/userprofile' activeclassname="active"   ><span >{user.user.name}<i className="large material-icons" style={{ marginTop: "10px" }} >account_circle</i></span></NavLink></li>}

      {token && <li style={{ float: "left" }}><NavLink to='/showpost' activeclassname="active"   >ShowPost</NavLink></li>}
    </div>
  )
}
export default Nav
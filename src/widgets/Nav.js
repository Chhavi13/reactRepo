import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { BiLogOutCircle } from 'react-icons/bi'
import { UserContext } from '../App';




const Nav = () => {
  const navigate = useNavigate()

 
  // console.log("99999999999", state)
  const token = localStorage.getItem("token")

  return (
    <div className='ulNav'>


      {token && <li><NavLink to='/' className={(navData) => navData.isActive ? "active" : ""} >Home</NavLink></li>}{/*active clss in v6  */}

      <li><NavLink to='/register' activeclassname="active"  >Register</NavLink></li>
      <li><NavLink to='/login' activeclassname="active" >Login</NavLink></li>

      {token && <li style={{ float: "right" }}><NavLink to='/login' activeclassname="active" onClick={() => {
        localStorage.clear()
        // dispatch({ type: "CLEAR" })
        navigate("/login")


      }}   >Logout <BiLogOutCircle style={{ fontSize: "30px" }} /></NavLink></li>}

      {token && <li style={{ float: "right" }}><NavLink to='/test' activeclassname="active"   ><span >User Profile<i className="large material-icons" style={{ marginTop: "10px" }} >account_circle</i></span></NavLink></li>}

      {token && <li style={{ float: "left" }}><NavLink to='/showpost' activeclassname="active"   >ShowPost</NavLink></li>}
    </div>
  )
}
export default Nav
import React from 'react'
import './mystyle.css'

function Stylesheets(props) {
    const className =props.primary ? "primary":""

  return (
    <div className="primary"> <h2>Stylesheets</h2></div>
  )
}

export default Stylesheets
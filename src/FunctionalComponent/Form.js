import React, { useState } from 'react'

function Form() {
  const [data, setData] = useState({
    myname:"",
    textarea:"",
    

  });
  
  const handleSubmit = (event) => {
    event.preventDefault();
 
    // console.log(data.textarea)
    alert(`the name you entered is ${data.myname} and your comment is ${data.textarea}`)

  }
  const handleChange = (event) => {
    setData({...data, textarea: event.target.value})

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your name:
          <input type="text" value={data.myname} onChange={(e) => setData({...data, myname: e.target.value})} />
        </label><br /><br />
        <label>comments:
          <textarea value={data.textarea} onChange={handleChange} />
        </label>
        <br />
        <input type="submit" />
      </form>
      {console.log(data)}

    </div>

  )
}

export default Form
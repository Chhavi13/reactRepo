import React, { Component } from 'react'
import {withRouter} from '../common/withRouter'
import axios from 'axios';
import { connect } from 'react-redux';

class Userprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: ""

    }
    this.submitButton = this.submitButton.bind(this)
  }
  
  // componentDidMount() {
  //   // send HTTP request equal to useeffect 
  //   // save it to the state


  // }
  handleChange=(e)=>{
    e.preventDefault();
    const { name, value } = e.target
    this.setState({
      ...this.state,
      [name]: value

    })
    // console.log(this.state)
  }

  submitButton =async(e)=>{
    e.preventDefault();
    try{
      const token = localStorage.getItem('token')
      if (token) {
          const AuthStr = 'Bearer '.concat(token);
          const headers = {
              'content-type': 'application/json',
              Authorization: AuthStr
          }
          // let response = await axios.put(`http://localhost:4000/user/user-profile/${id}`, this.state,{ headers: headers })
          // console.log("*****************",response)
          // // clearState()
          // // toast.success("post upadated successfully")                      
         this.props.navigate('/error')
        
      } else {
        this.props.navigate('/login')
        
      }
    }catch(e){
       console.log(e)
    }

  }

  render() {
    return (
      <div>
        <div className="signup-form">
          {/* <form action="/examples/actions/confirmation.php" method="post"> */}
          {/* <pre>{JSON.stringify(inputField,undefined,2)}</pre> */}
          <form  method="post">
            <h2>User Profile</h2>
            <div className="form-group">
              <div className="row">
                <div className="col"><input type="text" className="form-control" name="name" value={this.state.name} placeholder='username' onChange={this.handleChange} />
                  {/* {ErrField?.nameErr?.length > 0 && <span className='validation'>{ErrField.nameErr}</span>
              } */}
                </div>
              </div><br></br>

              <div className="form-group">
                <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder='Email Address' />
                {/* {ErrField?.emailErr?.length > 0 && <span className='validation'>{ErrField.emailErr}</span>

            } */}
              </div>
              {/* <div className="mb-3">
                <label style={{ fontSize: "12px" }} htmlFor="formFileSm" className="form-label"> update profile</label>
                <input className="form-control form-control-sm" id="formFileSm" type="file"  style={{ width: "200px" }} />
              </div> */}

              <div className="form-group">
                <input type="phone" className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder='phone number' />
                {/* {ErrField?.emailErr?.length > 0 && <span className='validation'>{ErrField.emailErr}</span>

            } */}
              </div>
              <div className="form-group">
                <button type='submit' onClick={this.submitButton} className="btn btn-success btn-lg btn-block"> update Profile </button>
              </div>
            </div>
          </form>

        </div>

      </div>
    )
  }
}



const mapStateToProps = (state) => {
  console.log("state from store",state)
  // return { username: state. };
};
export default withRouter(connect(mapStateToProps)(Userprofile))

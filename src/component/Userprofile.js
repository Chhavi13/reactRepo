import React, { Component } from 'react'

class Userprofile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      email: "",
      image:""
    }

    this.setState()
  }

  render() {
    return (
      <div>
        <div className="signup-form">
          {/* <form action="/examples/actions/confirmation.php" method="post"> */}
          {/* <pre>{JSON.stringify(inputField,undefined,2)}</pre> */}
          <form onSubmit={this.submitButton} method="post">
            <h2>User Profile</h2>

            <div className="form-group">
              <div className="row">
                <div className="col"><input type="text" className="form-control" name="name" placeholder='username'/>
                  {/* {ErrField?.nameErr?.length > 0 && <span className='validation'>{ErrField.nameErr}</span>
              } */}
                </div>
              </div><br></br>

              <div className="form-group">
                <input type="email" className="form-control" name="email" placeholder='Email Address' />
                {/* {ErrField?.emailErr?.length > 0 && <span className='validation'>{ErrField.emailErr}</span>

            } */}
              </div>
              <div className="mb-3">
                <label style={{ fontSize: "12px" }} htmlFor="formFileSm" className="form-label"> update profile</label>
                <input className="form-control form-control-sm" id="formFileSm" type="file"  style={{ width: "200px" }} />
              </div>


              <div className="form-group">
                <button type='submit' className="btn btn-success btn-lg btn-block"> update Profile </button>
              </div>
            </div>
          </form>

        </div>

      </div>
    )
  }
}
export default Userprofile
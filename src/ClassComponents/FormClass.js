import React, { Component } from 'react'

class FormClass extends Component {
    constructor(props) {
        super(props)

        this.state = {
            myname: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            myname:event.target.value
        })  

    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.myname)
        alert(`ur name is ${this.state.myname}`)

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>name:
                        <input type="text"  onChange={this.handleChange.bind(this)} />
                    </label>
                    <button type="submit" >submit</button>
                </form>

             
            </div>
        )
    }
}

export default FormClass
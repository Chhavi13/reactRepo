import React, { Component } from 'react'

class Child extends Component {

    render() {
        return (
            <div>
              
               <button onClick={()=>this.props.data.changeUnit("change data")}>update</button>
            </div>
        )
    }
}

export default Child
import React, { Component } from 'react'

export default class Practice extends Component {
     
    constructor(){
        super()
        this.state={
            data:"this is class component"
        }
        // this.state={
        //          data:1
        //      }

   
    }
    updateData(){
       alert("updated data")
      this.setState({
          data:"this is updated data"
      })
    // this.setState({
    //        data: this.state.data+1
    //        })
    //        console.log(this)
       
    }
  render() {

    return (
      <div>
            <h3>{this.state.data}</h3>

          <button onClick={()=>this.updateData()}>updatedData</button>
          {/* <button onClick={this.updateData.bind(this)} >updatedata</button> */}//alternate of upper button
      </div>
    )
  }
}

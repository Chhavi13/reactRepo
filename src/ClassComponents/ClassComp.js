import React ,{Component}from "react";

class Welcome extends Component{

    constructor(){
        super()
        this.state ={
            data :"chhavi"
        }

        this.setState ={
            data:""
        }
    }
  
    render(){
        return <h2>hello {this.state.data} welcome to home </h2>
    }
}

export default Welcome ;



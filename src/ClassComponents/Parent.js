import React, { Component } from 'react'
import Child from './Child'

class Parent extends Component {
    constructor(props) {
        super(props)
        this.state = {
           unit: "kg"
        }
    }
    changeUnit(newdata) {

        this.setState({
            unit: newdata
        })
    }

    render() {
        return (
            <>
                <p>{this.state.unit}</p>
                <Child data={
                    { unit: this.state.unit, changeUnit:this.changeUnit.bind(this) }
                } />

            </>
        )
    }
}

export default Parent
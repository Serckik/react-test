import { Component } from "react";
import { Navigate, json } from "react-router-dom";
import axios from "axios";

export default class Data extends Component {
    constructor(props){
        super(props)
        console.log(this.props.data)
    }

    render() {
        if(localStorage.getItem('access') === 'null')
            return <Navigate to="/login" replace></Navigate>
        else
            return (
            this.props.data.map((item) => (
                <div key={item.id}>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                </div>
            )) 
        )
    }
}
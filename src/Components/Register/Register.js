import React from 'react'
import './Register.css'

export default class Register extends React.Component{
    render(){
        return(
            <div className = 'register-page'>
                <h1>Register</h1>
            <form>
                <label htmlFor = 'Email'>Email</label>
                <input 
                    type = 'text'
                    id = 'email'
                    name= 'email'></input>
                
                <label htmlFor = 'Password'>Password</label>
                <input 
                    type = 'password'
                    id = 'password'
                    name= 'password'></input>
                </form>            </div>
        )
    }
}
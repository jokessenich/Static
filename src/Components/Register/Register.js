import React from 'react'
import './Register.css'
import config from '../../config'

export default class Register extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email: "",
            username: "",
            password: "",
            repeatPassword: "",
            error: ""
        }
    }
    
    render() {

        return (

            <div className='register-page'>
                <header className = "register-header">
                <h1>Register</h1>
                </header>
                <section className = "register-body">
                <form className = "register-form">

                    <label htmlFor='Email' >Email</label><br />
                    <input
                        type='text'
                        id='email'
                        name='email'
                        ></input><br />


                    <label htmlFor='username' >Username</label><br />
                    <input
                        type='text'
                        id='username'
                        name='username'
                        ></input><br />

                    <label htmlFor='Password' >Password <span className="p-advice"> (min. 6 characters)</span></label><br />
                    <input
                        type='password'
                        id='password'
                        name='password'
                        ></input><br />

                    <label htmlFor='repeatPassword' >Repeat Password</label><br />
                    <input
                        type='password'
                        id='repeatPassword'
                        name='repeatPassword'
                        ></input><br />

                        <p>{this.state.error}</p>

                    <button className = "login-button" type='submit'>Register</button>
                </form>            
                </section>
            </div>
        )}
}
import React from 'react'
import './Login.css'

export default class Login extends React.Component {
    render() {
        return (
            <div className='login-page'>
                <h1>Login</h1>
                <form>
                    <label htmlFor='Email'>Login Email</label>
                    <input
                        type='text'
                        id='login-email'
                        name='login-email'></input>

                    <label htmlFor='Password'>Password</label>
                    <input
                        type='password'
                        id='login-password'
                        name='login-password'></input>
                </form>
            </div>
        )
    }
}
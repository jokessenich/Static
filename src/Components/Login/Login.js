import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import config from '../../config'
import Context from '../../Context'

export default class Login extends React.Component {

    static contextType = Context

    handleLogin = (e) =>{
        e.preventDefault()
        console.log('inside handle login')
        this.context.handleLogIn()
    }

    render() {
        return (
            <div className='login-page'>

                <header className="login-page-header">
                    <div className="background-box">
                        <h1>Login</h1>
                    </div>
                </header>

                <section className="login-body">
                    <form className="login-form">
                        <label htmlFor='Username'>Username/Email <br /></label>
                        <input
                            type='text'
                            id='login-username'
                            name='login-username'></input><br />

                        <label htmlFor='Password'>Password<br /></label>
                        <input
                            type='password'
                            id='login-password'
                            name='login-password'></input><br />
                        <p>Click button for automatic login</p>
                        <button className="login-button" type="submit" onClick={this.handleLogin}>Login</button>

                    </form>

                    <p>Not a member? <Link to='/register' className="register-link">Register</Link></p>
                </section>
            </div>

        )
    }
}
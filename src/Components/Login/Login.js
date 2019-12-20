import React from 'react'
import './Login.css'
import {Link} from 'react-router-dom'
import config from '../../config'
import Context from '../../Context'

export default class Login extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            error: ""
        }
    }

    static contextType = Context

    handleLogin=(e)=>{

        e.preventDefault()
        const username = e.currentTarget['login-username'].value
        const password = e.currentTarget['login-password'].value

        fetch(`${config.API_ENDPOINT}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"username": "${username}",
                        "userpassword": "${password}"
                    }`
        })

        .then(res=>{
            if(!res.ok){
                return res.json()
                    .then(error=> {
                        console.log(error)
                        throw error})
            }
            return res.json()
        })

        .then(token=>{
            localStorage.setItem('token', token)
            console.log(token)
        })

        .then(res=> {
            this.context.handleLogin()
            this.props.history.push('/')
        })

        .catch(error=> {
            this.setState({
                error:error.message
        })
    })
    }

    render() {
        return (
            <div className='login-page'>
                <h1>Login</h1>

                <form onSubmit = {this.handleLogin}>
                    <label htmlFor='Username'>Username</label>
                    <input
                        type='text'
                        id='login-username'
                        name='login-username'></input><br />

                    <label htmlFor='Password'>Password</label>
                    <input
                        type='password'
                        id='login-password'
                        name='login-password'></input>

                    <button type = "submit">Login</button>
                    {this.state.error}
                </form>

                <p>Not a member? <Link to = '/register'>Register</Link></p>
            </div>
        )
    }
}
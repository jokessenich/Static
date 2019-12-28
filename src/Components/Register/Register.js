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

    onChange=(e)=>{
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
    
        if(this.state.email.includes(" ")||this.state.username.includes(" ")){
            this.setState({
                error: "Email/Username must not contain spaces"
            })
            return;
        }        

        if(this.state.username<3){
            this.setState({
                error: "Username must be at least 3 Characters"
            })
            return;
        }        
        
        if(this.state.password!==this.state.repeatPassword){
            this.setState({
                error: "Passwords do not match"
            })
            return;
        }

        else if(!this.state.email.includes('@')||!this.state.email.includes('.')){
            this.setState({
                error: "Must enter a valid email"
            })
            return;
        }

        else if(this.state.password.length<6){
            this.setState({
                error: "Password must be at least 6 characters long"
            })
            return;
        }

        fetch(`${config.API_ENDPOINT}/users/register`,{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"username": "${this.state.username.toLowerCase()}",
                        "userpassword": "${this.state.password}",
                        "email": "${this.state.email.toLowerCase()}"
                    }`
        })

        .then(res=>{
            if(!res.ok){
                return res.json()
                .then(error=> {
                    throw error})
                }
            })

        .then(res=> this.props.history.push('/login'))

        .catch(error=>{
            this.setState({
                error: error.message
            })
        })
    }
    
    render() {

        return (

            <div className='register-page'>
                <header className = "register-header">
                <h1>Register</h1>
                </header>
                <section className = "register-body">
                <form className = "register-form" onSubmit ={this.handleSubmit}>

                    <label htmlFor='Email' >Email</label><br />
                    <input
                        type='text'
                        id='email'
                        name='email'
                        onChange={this.onChange}></input><br />


                    <label htmlFor='username' >Username</label><br />
                    <input
                        type='text'
                        id='username'
                        name='username'
                        onChange={this.onChange}></input><br />

                    <label htmlFor='Password' >Password</label><br />
                    <input
                        type='password'
                        id='password'
                        name='password'
                        onChange={this.onChange}></input><br />

                    <label htmlFor='repeatPassword' >Repeat Password</label><br />
                    <input
                        type='password'
                        id='repeatPassword'
                        name='repeatPassword'
                        onChange={this.onChange}></input><br />

                        <p>{this.state.error}</p>

                    <button className = "register-button" type='submit'>Register</button>
                </form>            
                </section>
            </div>
        )}
}
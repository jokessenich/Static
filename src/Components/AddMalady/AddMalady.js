import React from 'react'
import './AddMalady.css'
import config from '../../config'
import Context from '../../Context'

export default class AddMalady extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:"",
            description:"",
            symptoms: "",
        }
    }
    static contextType = Context

    handleChange=(e)=>{
        this.setState({
            [e.currentTarget.id]:e.currentTarget.value
        })
        
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const {name, description, symptoms} = this.state
        debugger;
        fetch(`${config.API_ENDPOINT}/maladies/${localStorage.getItem('token')}`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: `{"malady_name": "${name}",
                    "malady_description": "${description}",
                    "malady_symptoms": "${symptoms}"
                }`
        })
        .then(res=>res.json())
        .then(data=> console.log(data))
    }

    render(){
        return(

            <div className = 'add-malady-page'>
            <h1>Add Malady</h1>
            
            <form onSubmit = {this.handleSubmit}>
                <label htmlFor = 'name'>Malady</label>
                <input 
                type = 'list'
                id = 'name'
                onChange = {this.handleChange}>
                    </input><br />

                <label htmlFor = 'symptoms'>Symptoms</label>
                <input 
                type = 'text'
                id= "symptoms"
                onChange = {this.handleChange}>
                    </input><br />

                <label htmlFor = 'description'>Description</label>
                <input 
                type = 'text'
                id= "description"
                onChange = {this.handleChange}
                ></input>

                <button
                    type= "submit">
                        Add
                    </button>
            </form>

            </div>
        )
    }
}
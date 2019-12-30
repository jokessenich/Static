import React from 'react'
import './AddMalady.css'
import config from '../../config'
import Context from '../../Context'

export default class AddMalady extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
            symptoms: "",
            error: ""
        }
    }
    static contextType = Context

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.id]: e.currentTarget.value
        })

    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { name, description, symptoms } = this.state

        if(name.length===0){
            this.setState({
                error: `Remedy must have a name.`
            })
            window.scrollTo(0, 0)
            return
        }

        let newDescription = JSON.stringify(description)

        if(newDescription.length <10){
            this.setState({
                error: `Description must be at least 10 words.`
            })
            window.scrollTo(0, 0)
            return;
        }

        if(symptoms.length ===0){
            this.setState({
                error: `Symptoms must be included.`
            })
            window.scrollTo(0, 0)
            return;
        }
        fetch(`${config.API_ENDPOINT}/maladies/add/${localStorage.getItem('token')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"malady_name": "${name}",
                    "malady_description": "${description}",
                    "malady_symptoms": "${symptoms}"
                }`
        })
            .then(res => res.json())
            .then(data => window.location.reload())
    }

    render() {
        return (

            <div className='add-malady-page'>

                <header className="add-malady-page-header">
                    <h1>Add Malady</h1>
                </header>

                <section className="add-mal-body">
                    <p className = 'error-message'>{this.state.error}</p>
                    <form className="add-mal-form" onSubmit={this.handleSubmit}>
                        <label htmlFor='name'>Malady Name</label><br />
                        <input
                            type='list'
                            id='name'
                            onChange={this.handleChange}
                            >
                        </input><br />

                        <label htmlFor='symptoms'>Symptoms</label><br />
                        <textarea
                            type='text'
                            id="symptoms"
                            cols="30"
                            rows="10"
                            onChange={this.handleChange}
                            >
                        </textarea><br />

                        <label htmlFor='description'>Description</label><br />
                        <textarea
                            type='text'
                            id="description"
                            cols="30"
                            rows="10"
                            onChange={this.handleChange}
                            >
                        </textarea><br />

                        <button
                            type="submit"
                            className = "login-button">
                            Add
                    </button>
                    </form>
                </section>
            </div>
        )
    }
}
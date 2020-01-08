import React from 'react'
import './AddRemedy.css'
import config from '../../config'
import Context from '../../Context'
import { Link } from 'react-router-dom'

export default class AddRemedy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            malady: "",
            remedy: "",
            reference: "",
            description: "",
            options: [],
            error: ""
        }
    }
    static contextType = Context

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.id]: e.currentTarget.value
        })

        if (e.currentTarget.id === "malady") {
            if (e.currentTarget.value.length > 0) {
                this.suggestMalady(e.currentTarget.value)
            }

            if (e.currentTarget.value.length < 1) {
                this.setState({
                    options: []
                })
            }
        }
    }

    suggestMalady = (frag) => {
        const options = this.context.maladies.filter(mal => mal.malady_name
                                                            .toLowerCase()
                                                            .includes(frag.toLowerCase())
                                                            &&
                                                            mal.malady_name
                                                            .toLowerCase()
                                                            .charAt(0) === frag
                                                                            .toLowerCase()
                                                                            .charAt(0))
        this.setState({
            options: options,
        })

    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { malady, remedy, reference, description } = this.state
        const maladyResults = this.context.maladies.filter(mal => mal.malady_name.toLowerCase() === malady.toLowerCase())
        
        if(this.context.isLoggedIn===false){
            this.setState({
                error: `You must log in to add a Remedy.`
            })
            return
        }

        
        if(maladyResults.length===0){
            this.setState({
                error: `No maladies found with a name of ${malady}.`
            })
            return
        }

        if(remedy.length===0){
            this.setState({
                error: `Remedy must have a name.`
            })
            return
        }

        let newDescription = JSON.stringify(description)

        if(newDescription.length <10){
            this.setState({
                error: `Description must be at least 10 characters.`
            })
            return;
        }

        if(reference.length ===0){
            this.setState({
                error: `Reference must be included.`
            })
            return;
        }

        fetch(`${config.API_ENDPOINT}/remedies/add/${localStorage.getItem('token')}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"remedy_name": "${remedy}",
                    "remedy_description": ${newDescription},
                    "remedy_malady": "${maladyResults[0].id}",
                    "remedy_reference": "${reference}"
                }`
        })
            .then(res => {
                if(!res.ok){
                    return res.json()
                    .then(error=>{
                        throw error
                    })
                }
                    return res.json()
            })
            .then(data => {
                window.location.assign(`${config.API_ENDPOINT}/malady/${maladyResults[0].id}`)
            })

            .catch(error=> this.props.history.push('/ErrorPage'))
    }

    handleFill = (name) => {
        document.getElementById('malady').value = name
        this.setState({
            malady: name,
        })
    }

    render() {

        let autofill = this.state.options.length === 0 && 
                        this.state.malady.length!==0 ? <Link to='/addMalady' className="autofill-rem">No Matches. Click to Add</Link> : this.state.options.map(mal => <p className="autofill-rem" onClick={() => this.handleFill(mal.malady_name)} key={mal.id} to={`/malady/${mal.id}`}>{mal.malady_name}</p>)

        let header = this.props.noHeader ? <header>
                                                <h1 className="malady-page-header">Add Remedy</h1>
                                            </header>
                                            :
                                            <header className="add-page-header">
                                                <h1>Add Remedy</h1>
                                            </header>
        return (
            
            <div className='add-page'>
                {header}
                <form id="new-remedy-form" onSubmit={this.handleSubmit}>
                    <label htmlFor='malady'>Malady</label><br />
                    <input
                        type='text'
                        id='malady'
                        onChange={this.handleChange}>
                    </input>{autofill}<br />

                    <label htmlFor='remedy'>Remedy Name</label><br />
                    <input
                        type='textarea'
                        id="remedy"
                        onChange={this.handleChange}>
                    </input><br />

                    <label htmlFor='description'>Description</label><br />
                    <textarea
                        type='text'
                        id="description"
                        cols="30"
                        rows="10"
                        onChange={this.handleChange}
                    ></textarea><br />

                    <label htmlFor='reference'>Reference</label><br />
                    <input
                        type='text'
                        id="reference"
                        onChange={this.handleChange}
                    ></input><br />

                    <button
                        type="submit"
                        className="login-button">
                        Add
                    </button>

                    <p>{this.state.error}</p>

                </form>

            </div>
        )
    }
}
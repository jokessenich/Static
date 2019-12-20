import React from 'react'
import './AddRemedy.css'
import config from '../../config'
import Context from '../../Context'

export default class AddRemedy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            malady: "",
            remedy: "",
            reference: "",
            description: "",
            options:[]
        }
    }
    static contextType = Context

    handleChange = (e) => {

        this.setState({
            [e.currentTarget.id]: e.currentTarget.value
        })

        if (e.currentTarget.value.length > 1) {
            this.suggestMalady(e.currentTarget.value)
        }

        if (e.currentTarget.value.length < 2) {
            this.setState({
                options: []
            })
        }
        console.log(e.currentTarget.value)
    }

    suggestMalady = (frag) => {
        const options = this.context.maladies.filter(mal => mal.malady_name
            .toLowerCase().includes(frag.toLowerCase())
            && mal.malady_name
                .toLowerCase().charAt(0) === frag.toLowerCase().charAt(0))
        this.setState({
            options: options,
        })

}

handleSubmit = (e) => {
    e.preventDefault()
    const { malady, remedy, reference, description } = this.state
    const maladyResults = this.context.maladies.filter(mal => mal.malady_name.toLowerCase() === malady.toLowerCase())
    let newDescription=JSON.stringify(description)
    debugger;
    fetch(`${config.API_ENDPOINT}/remedies/${localStorage.getItem('token')}`, {
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
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}

handleFill=(name)=>{
    document.getElementById('malady').value=name
    this.setState({
        malady: name,
        options: []
    })
}

render(){
    const autofill = this.state.options.map(mal=><p className = "autofill-rem" onClick = {()=>this.handleFill(mal.malady_name)} key = {mal.id} to = {`/malady/${mal.id}`}>{mal.malady_name}</p>)

    return (

        <div className='add-page'>
            <h1>Add Remedy</h1>

            <form id = "new-remedy-form"  onSubmit={this.handleSubmit}>
                <label htmlFor='malady'>Malady</label>
                <input
                    type='text'
                    id='malady'
                    onChange={this.handleChange}>
                </input>{autofill}<br />

                <label htmlFor='remedy'>Remedy Name</label>
                <input
                    type='textarea'
                    id="remedy"
                    onChange={this.handleChange}>
                </input><br />

                <label htmlFor='description'>Description</label>
                <textarea
                    type='text'
                    id="description"
                    cols="30"
                    rows="10"
                    onChange={this.handleChange}
                ></textarea>

                <label htmlFor='reference'>Reference</label>
                <input
                    type='text'
                    id="reference"
                    onChange={this.handleChange}
                ></input>

                <button
                    type="submit">
                    Add
                    </button>
            </form>

        </div>
    )
}
}
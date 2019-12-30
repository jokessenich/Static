import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import Context from '../../Context'

export default class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            searchTerm: "",
            options: [],
            optionIds:[]
        }
    }

    static contextType = Context

    handleSearch=(e)=> {
        e.preventDefault()
        const searchTerm = e.currentTarget['home-search-term'].value.toLowerCase()
        console.log(searchTerm)
        const maladyArr = this.context.maladies.filter(mal=> mal.malady_name.toLowerCase() === searchTerm)
        if(!maladyArr[0]){
            this.props.history.push(`maladynotfound/${searchTerm}`)
            return
        }
        const malId=maladyArr[0].id
        this.props.history.push(`malady/${malId}`)
    }

    handleChange=(e)=>{
        e.preventDefault()
        this.setState({
            searchTerm: e.currentTarget.value
        })
        if(e.currentTarget.value.length>1){
        this.suggestMalady(e.currentTarget.value)
        }
        if(e.currentTarget.value.length<2){
            this.setState({ 
                options: []
            })        }
        console.log(this.state.searchTerm)
    }

    suggestMalady=(frag)=>{
        const options= this.context.maladies.filter(mal=> mal.malady_name
                                                            .toLowerCase().includes(frag.toLowerCase())
                                                            && mal.malady_name
                                                            .toLowerCase().charAt(0)===frag.toLowerCase().charAt(0))
        this.setState({ 
            options: options,
        })
    }

    render() {

        const autofill = this.state.options.map(mal=><Link className = "autofill" key = {mal.id} to = {`/malady/${mal.id}`}>{mal.malady_name}</Link>)
        
        return (

            <div className="home-page">

                <section className="home-search">
                    <h1 className = "home-hero">Alternative Remedies for the People.{<br />} <span className = "subheader-home">By the People.</span></h1>
                    
                    <form onSubmit={this.handleSearch} id = 'home-search-form'>
                        <input type='text' 
                                id='home-search-term' 
                                placeholder = "Find a condition. e.g. 'Flu'"
                                onChange = {this.handleChange}>
                                </input>


                        <button
                            type='submit'
                            id = 'search-button'
                            ></button>
                    </form>
                    {autofill}

                </section>

                 <section className = "browse-maladies">
                    <Link to = '/maladylist' className = "home-browse">Browse Conditions</Link>
                </section>

                <section className="app-explain">
                    <p>OurHealth is a web app with user generated content that allows users to search for alternative remedies.
                        Visitors can search any condition in the database to find the natural remedy that suits them.
                        Users can login for the added functionality of creating maladies or remedies, or rating the remedies.
                    </p>
                </section>
            </div>
        )
    }
}


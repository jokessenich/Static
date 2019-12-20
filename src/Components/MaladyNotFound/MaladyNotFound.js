import React from 'react'
import AddMalady from '../AddMalady/AddMalady';
import Context from '../../Context'
import {Link} from 'react-router-dom'

export default class MaladyNotFound extends React.Component{


    static contextType = Context

    render(){
        const addMalady = this.context.isLoggedIn? <AddMalady></AddMalady>:
        <div>
            <p><Link to = '/login'>Login</Link> to add a Malady</p>
        </div>
        return(
            <div>
            <h1>Sorry we couldnt find {this.props.match.params.name}</h1>
            <h2>Would you like to add it?</h2>
            {addMalady}
            </div>
        )
    }
}

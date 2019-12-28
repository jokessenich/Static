import React from 'react'
import AddMalady from '../AddMalady/AddMalady';
import Context from '../../Context'
import { Link } from 'react-router-dom'

export default class ErrorPage extends React.Component {



    render() {

        return (
            <div>
                <h1>Something is not quite right with us.</h1>
                <h2>Please check back again soon.</h2>
            </div>
        )
    }
}

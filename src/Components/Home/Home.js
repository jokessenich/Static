import React from 'react'
import './Home.css'

export default class Home extends React.Component{
    render(){
        return(
            <div className = "home-page">

                <h1>Search for a remedy:</h1>
                <form>
                    <label htmlFor = 'search-term'>Search:</label>
                    <input type = 'text' id = 'search-term'></input>
                    <button type= 'submit'>submit</button>
                </form>
                </div>
        )
    }
}


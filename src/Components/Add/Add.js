import React from 'react'
import './Add.css'

export default class Add extends React.Component{
    render(){
        return(
            <div className = 'add-page'>
            <h1>Add Remedy</h1>
            <form>
                <label htmlFor = 'illness'>Illness</label>
                <input type = 'list'></input>
                <label htmlFor = 'remedy'>Remedy</label>
                <input type = 'text'></input>
                <label htmlFor = 'citation'>Citation</label>
                <input type = 'text'></input>
            </form>

            </div>
        )
    }
}
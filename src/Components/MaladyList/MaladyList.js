import React from 'react'
import './MaladyList.css'
import Malady from './Malady/Malady'

export default class MaladyList extends React.Component{
    render(){
        return(
            <div className = 'malady-page'>
            <h1>Maladies</h1>
            <h2>List of Maladies</h2>
            <Malady></Malady>
            <Malady></Malady>
            <Malady></Malady>
            <Malady></Malady>

            </div>
        )
    }
}
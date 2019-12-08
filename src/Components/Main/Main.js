import React from 'react'
import {Switch, Route} from 'react-router-dom'
import  Home from '../Home/Home.js'
import Register from  '../Register/Register'
import Login from '../Login/Login'
import Remedy from '../Remedy/Remedy'
import Add from '../Add/Add.js'
import SearchResults from '../SearchResults/SearchResults.js'

export default class Main extends React.Component{

    render(){
        return(

        <Switch>

            <Route exact path ='/' component = {Home}></Route> 

            <Route path = '/register' component = {Register}></Route>

            <Route path = '/login' component = {Login}></Route>

            <Route path = '/remedy' component = {Remedy}></Route>

            <Route path = '/add' component = {Add}></Route>

            <Route path = '/search' component = {SearchResults}></Route>
        </Switch>            
        )
    }
}
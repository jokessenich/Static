import React from 'react'
import {Switch, Route} from 'react-router-dom'
import  Home from '../Home/Home.js'
import Register from  '../Register/Register'
import Login from '../Login/Login'
import Add from '../Add/Add.js'
import SearchResults from '../SearchResults/SearchResults.js'
import MaladyList from '../MaladyList/MaladyList'
import Malady from '../MaladyList/Malady/Malady'

export default class Main extends React.Component{

    render(){
        return(

        <Switch>

            <Route exact path ='/' component = {Home}></Route> 

            <Route path = '/register' component = {Register}></Route>

            <Route path = '/login' component = {Login}></Route>

            <Route path = '/maladylist' component = {MaladyList}></Route>

            <Route path = '/add' component = {Add}></Route>

            <Route path = '/search' component = {SearchResults}></Route>

            <Route path = '/malady' component = {Malady}></Route>

        </Switch>            
        )
    }
}
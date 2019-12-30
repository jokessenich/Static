import React from 'react'
import {Switch, Route} from 'react-router-dom'
import  Home from '../Home/Home.js'
import Register from  '../Register/Register'
import Login from '../Login/Login'
import AddRemedy from '../AddRemedy/AddRemedy.js'
import SearchResults from '../SearchResults/SearchResults.js'
import MaladyList from '../MaladyList/MaladyList'
import Malady from '../MaladyList/Malady/Malady'
import AddMalady from '../AddMalady/AddMalady.js'
import MaladyNotFound from '../MaladyNotFound/MaladyNotFound.js'
import ErrorPage from '../../ErrorPage/ErrorPage.js'

export default class Main extends React.Component{

    render(){
        return(

        <Switch>

            <Route exact path ='/' component = {Home}></Route> 

            <Route path = '/register' component = {Register}></Route>

            <Route path = '/login' component = {Login}></Route>

            <Route path = '/maladylist' component = {MaladyList}></Route>

            <Route path = '/addremedy' component = {AddRemedy}></Route>

            <Route path = '/addmalady' component = {AddMalady}></Route>

            <Route path = '/search' component = {SearchResults}></Route>

            <Route path = '/malady/:id' component = {Malady}></Route>

            <Route path = '/maladynotfound/:name' component = {MaladyNotFound}></Route>

            <Route path = '/ErrorPage' component = {ErrorPage}></Route>


        </Switch>            
        )
    }
}
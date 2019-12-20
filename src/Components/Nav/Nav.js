import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import Context from '../../Context'
import { slide as Menu } from 'react-burger-menu'


export default class Nav extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            isOpen: false
        }
    }

    static contextType = Context
    
    handleLogout=()=>{
        this.context.handleLogout()
    }

    closeMenu=()=>{
        this.setState({
            isOpen: false
        })
    }

    render() {
        const menuProp = this.state.isOpen
        const navBar = this.context.isLoggedIn ?
            <div className='nav-bar'>
                <Menu isOpen = {{menuProp}}>
                
                    <Link to='/login' className="nav-link" onClick = {this.handleLogout}>Logout</Link>

                    <Link to='/' className="nav-link" onClick = {this.closeMenu}>Home</Link>

                    <Link to='/maladylist' className="nav-link" onClick = {this.closeMenu}>Maladies</Link>

                    <Link to='/addremedy' className="nav-link" onClick = {this.closeMenu}>Add Remedy</Link>

                    <Link to='/addmalady' className="nav-link" onClick = {this.closeMenu}>Add Malady</Link>


                </Menu>


            </div>:
            <div className='nav-bar'>
            <Menu isOpen = {{menuProp}}>

                <Link to='/login' className="nav-link" onClick = {this.closeMenu}>Login</Link>

                <Link to='/' className="nav-link" onClick = {this.closeMenu}>Home</Link>

                <Link to='/maladylist' className="nav-link" onClick = {this.closeMenu}>Maladies</Link>


            
        </Menu>
        
        </div>
        console.log(menuProp)
        return (
            <div>
            {navBar}
            </div>
        )
    }
}
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
    
    handleStateChange (state) {
        this.setState({isOpen: state.isOpen})  
      }

    handleLogout=()=>{
        this.context.handleLogout()
    }

    closeMenu=()=>{
        this.setState({
            isOpen: false
        })
    }

    render() {
        let menuProp = this.state.isOpen
        let navBar = this.context.isLoggedIn ?
            <div className='nav-bar'>
                <ul className = 'screen-nav-bar'>
                    

                    <li><Link to='/' className="nav-bar-link">Home</Link></li>

                    <li><Link to='/maladylist' className="nav-bar-link">Maladies</Link></li>

                    <li><Link to='/addremedy' className="nav-bar-link">Add Remedy</Link></li>

                    <li><Link to='/addmalady' className="nav-bar-link">Add Malady</Link></li>
                
                    <li><Link to='/login' className="nav-bar-link" onClick = {this.handleLogout}>Logout</Link></li>

                </ul>

                <Menu isOpen = {menuProp}
                       width = {'100%'}
                       right
                      onStateChange={(state) => this.handleStateChange(state)}>
                

                    <Link to='/' className="nav-link" onClick = {this.closeMenu}>Home</Link>

                    <Link to='/maladylist' className="nav-link" onClick = {this.closeMenu}>Maladies</Link>

                    <Link to='/addremedy' className="nav-link" onClick = {this.closeMenu}>Add Remedy</Link>

                    <Link to='/addmalady' className="nav-link" onClick = {this.closeMenu}>Add Malady</Link>

                    <Link to='/login' className="nav-link" onClick = {this.handleLogout}>Logout</Link>

                </Menu>


            </div>:
            <div className='nav-bar'>

                <ul className = 'screen-nav-bar'>

                    <li><Link to='/' className="nav-bar-link" >Home</Link></li>

                    <li><Link to='/maladylist' className="nav-bar-link">Maladies</Link></li>

                    <li><Link to='/login' className="nav-bar-link">Login</Link></li>

                    <li><Link to='/register' className="nav-bar-link">Register</Link></li>

                </ul>

            <Menu isOpen = {menuProp}  
                  width = {'100%'}  
                  right       
                  onStateChange={(state) => this.handleStateChange(state)}>

                <Link to='/' className="nav-link" onClick = {this.closeMenu}>Home</Link>

                <Link to='/maladylist' className="nav-link" onClick = {this.closeMenu}>Maladies</Link>

                <Link to='/login' className="nav-link" onClick = {this.closeMenu}>Login</Link>

                <Link to='/register' className="nav-link" onClick = {this.closeMenu}>Register</Link>


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
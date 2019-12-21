import React from 'react';
import Footer from './Components/Footer/Footer'
import Main from './Components/Main/Main'
import Nav from './Components/Nav/Nav'
import Context from './Context'
import config from './config'
import './app.css'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      maladies: [],
      remedies: [],
      isLoggedIn: false,
      likes: [],
    }
  }

  componentDidMount() {
    console.log('mounting app')
    Promise.all([
      fetch(`${config.API_ENDPOINT}/remedies`),
      fetch(`${config.API_ENDPOINT}/maladies`),
      fetch(`${config.API_ENDPOINT}/likes`),
      fetch(`${config.API_ENDPOINT}/users/verify/${localStorage.getItem('token')}`)
    ])

      .then(([remedyRes, maladyRes, likesRes, userIdres]) => {
        return Promise.all([remedyRes.json(), maladyRes.json(), likesRes.json(), userIdres.json()])
      })

      .then(([remedies, maladies, likes, isLoggedIn]) => {
        this.setState({ remedies, maladies, likes, isLoggedIn })
       
      })
      
      
  }

  handleLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false
    })
    localStorage.removeItem('token')
  }




  render() {
    
    const contextVal = {
      remedies: this.state.remedies,
      maladies: this.state.maladies,
      isLoggedIn: this.state.isLoggedIn,
      likes: this.state.likes,
      handleLogin: this.handleLogin,
      handleLogout: this.handleLogout
    }

    return (
      <Context.Provider value={contextVal}>
          <div className="app">
            <Nav></Nav>

            <Main></Main>

            <Footer></Footer>
          </div>
      </Context.Provider>
    );
  }
}
export default App;

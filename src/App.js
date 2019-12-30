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
      error: false
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

      .then(([remedyRes, maladyRes, likesRes, userIdRes]) => {
          if(!remedyRes.ok){
            return remedyRes.json().then(e => Promise.reject(e));
          }

          if(!maladyRes.ok){
            return maladyRes.json().then(e => Promise.reject(e));
          }

          if(!likesRes.ok){
            return likesRes.json().then(e => Promise.reject(e));
          }


        return Promise.all([remedyRes.json(), maladyRes.json(), likesRes.json(), userIdRes.json()])
      })

      .then(([remedies, maladies, likes, isLoggedIn]) => {
        this.setState({ remedies, maladies, likes, isLoggedIn })
       
      })

      .catch(error=>{
        this.setState({
          error: true
        })
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

    const appPage = this.state.error? <div>
  <h1>Something went wrong  :/ {<br />}We are working on a fix :)</h1>
                                      </div>:
                                      
                                      <Context.Provider value={contextVal}>
                                      <div className="app">
                                        <Nav></Nav>
                            
                                        <Main></Main>
                            
                                        <Footer></Footer>
                                      </div>
                                  </Context.Provider>
return (
      <div>
        {appPage}
      </div>
    );
  }
}
export default App;

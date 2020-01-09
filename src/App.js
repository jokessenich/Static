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
      maladies: [
        {
          id:1,
          malady_name: "lice",
          malady_description: "bad bugs",
          malady_symptoms: "itchy", 
          userid : null 
  },
      {
          id:2,
          malady_name: "cold",
          malady_description: "virus",
      malady_symptoms: "cough", 
      userid : null
  },
      {
          id:3,
          malady_name: "obesity",
          malady_description: "being overweight",
      malady_symptoms: "overeating", 
      userid : null
  }
      ],
      remedies: [
        {
          id:1,
          remedy_name: "lice spray",
          remedy_description: "Buy a spray and solve the problem",
          remedy_reference: "website",
          remedy_malady: 1, 
          userid : null 
  },
      {
          id:2,
          remedy_name: "cold medicine",
          remedy_description: "go to cvs and buy cold medicine",
          remedy_reference: "website",
          remedy_malady: 2, 
          userid : null
  },
      {
          id:3,
          remedy_name: "obesity",
          remedy_description: "eating less",
          remedy_reference: "website",
          remedy_malady: 3, 
          userid : null
  }
      ],
      isLoggedIn: false,
      likes: [],
      error: false
    }
  }


  handleLogIn =()=>{
    console.log('inside app')
    this.setState({
      isLoggedIn: true
    })
  }

  render() {
    
    const contextVal = {
      remedies: this.state.remedies,
      maladies: this.state.maladies,
      isLoggedIn: this.state.isLoggedIn,
      likes: this.state.likes,
      error: this.state.error,
      handleLogIn: this.handleLogIn

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

import React from 'react';
import Footer from './Components/Footer/Footer'
import Main from './Components/Main/Main'
import Nav from './Components/Nav/Nav'
import {HashRouter} from 'react-router-dom'

function App() {
  return (
    <HashRouter basename = '/'>
    <div>
      <Nav></Nav>

      <Main></Main>

      <Footer></Footer>
      </div>
      </HashRouter>
  );
}

export default App;

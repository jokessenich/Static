import React from 'react';
import ReactDOM from 'react-dom';
import Remedy from './Remedy';
import { BrowserRouter } from 'react-router-dom'


it('renders without crashing', () => {
    const remedy = {
        id:1,
        remedy_name: "lice",
        remedy_description: "bad bugs",
        remedy_reference: "abc",
        remedy_malady: 1, 
        userid : null 
    }

  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><Remedy rem = {remedy}/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
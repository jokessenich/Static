import React from 'react';
import ReactDOM from 'react-dom';
import MaladyList from './MaladyList';
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><MaladyList /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
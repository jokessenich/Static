import React from 'react';
import ReactDOM from 'react-dom';
import AddMalady from './AddMalady';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddMalady />, div);
  ReactDOM.unmountComponentAtNode(div);
});
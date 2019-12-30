import React from 'react';
import ReactDOM from 'react-dom';
import AddRemedy from './AddRemedy';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddRemedy />, div);
  ReactDOM.unmountComponentAtNode(div);
});
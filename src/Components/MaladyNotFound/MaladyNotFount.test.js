import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import MaladyNotFound from './MaladyNotFound';

it('renders without crashing', () => {

    const malady = {
        params:{
            name: "this"
        }

    }

    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><MaladyNotFound match={malady}/></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});
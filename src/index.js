//Predefined React functions
import React from 'react';
import ReactDOM from 'react-dom/client';
//Redux functions
//This Provider provides store (containing all redux functionalities) for all components wrapped in it
import { Provider } from 'react-redux';
//User Defined functions
import './index.css';
import App from './App';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

//Redux Predefined functions
import { configureStore } from '@reduxjs/toolkit';
//User defined functions
import { myReducer } from './reducer';

//Add all those reducer functions to the store using configureStore.
//If there is a single reducer function, we can use createStore.
//configureStore can be used for single or multiple reducer functions.
const store = configureStore({ reducer:myReducer});

export default store;
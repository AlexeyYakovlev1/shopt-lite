import loggedReducer from './isLogged.js';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    logged: loggedReducer
})

export default allReducers;
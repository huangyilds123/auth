import axios from 'axios';
import { returnErrors } from './errorActions'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

// check token and load user 
export const loadUser = () => (dispatch, getState) => {
    // User loading 
    dispatch({ type: USER_LOADING });


    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}






//login User
export const login = ({ email, password }) => dispatch => {
    //Headers 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // request body 
    const body = JSON.stringify({ email, password });
    console.log(body);
    axios.post('/api/auth', body, config)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data

            })
        }

        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}







//Register User
export const register = ({ name, email, password }) => dispatch => {
    //Headers 
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // request body 
    const body = JSON.stringify({ name, email, password });

    axios.post('/api/users', body, config)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data

            })
        }

        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

//Logout User 
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}


// Setup config/header and token 
export const tokenConfig = getState => {
    // Get token from locak storage
    const token = getState().auth.token


    //HEADERS 
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // if token, add to headers 
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}
import axios from 'axios';

import { AUTH_SIGN_IN, AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_ERR, DASHBOARD_GET_DATA } from './types';
/* 
ActionCreators -> create/return actions or ({}) or function ->  dispatched -> middlewares -> reducers
*/
export const getSecret = () => {
    return async dispatch => {
        try {
            const res = await axios.get('http://localhost:5000/users/secret');
            dispatch({
                type: DASHBOARD_GET_DATA,
                payload: res.data.secret
            })

        } catch (error) {
            
        }
    }
}

export const oauthFacebook = data => {
    return async dispatch => {
        const res = await axios.post('http://localhost:5000/users/facebook/oauth',
            { access_token: data });

        dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;

    }
}


export const oauthGoogle = data => {
    return async dispatch => {
        const res = await axios.post('http://localhost:5000/users/google/oauth',
            { access_token: data });

        dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        });

        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;

    }
}

export const signIn = data => {
    return async dispatch => {
        /*  1 make HTTP requet to backend
            2 take the backend response (jwt token)
            3 dispatch user just signed in (with jwt token)
            4 save the jwt token to locaStorage
        */

        try {
            const res = await axios.post('http://localhost:5000/users/signin', data);

            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;

        } catch (error) {
            dispatch({
                type: AUTH_ERR,
                payload: 'Email is already in use!'
            });
        }
    }
}


export const signUp = data => {
    return async dispatch => {
        /*  1 make HTTP requet to backend
            2 take the backend response (jwt token)
            3 dispatch user just signed up (with jwt token)
            4 save the jwt token to locaStorage
        */

        try {
            const res = await axios.post('http://localhost:5000/users/signup', data);

            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
        } catch (error) {
            dispatch({
                type: AUTH_ERR,
                payload: 'Email is already in use!'
            });
        }
    }
}

export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');

        axios.defaults.headers.common['Authorization'] = '';

        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        });

    }
}
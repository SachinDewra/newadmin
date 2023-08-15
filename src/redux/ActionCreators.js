import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const postAdmin = (username, name, email, mobile, password) => (dispatch) => {
    const newAdmin = {
        username: username,
        name: name,
        email: email,
        mobile: mobile,
        password: password
    }

    console.log(newAdmin);

    newAdmin.date = new Date().toISOString();

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        body: JSON.stringify(newAdmin),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error: ' + response.status + ': '+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(response => dispatch(addAdmin(response)))
    .catch(error => {console.log('Post admin', error.message);
            alert('Your admin could not be posted\nError: '+ error.message)})
    
}


export const addAdmin = (admins) => ({
    type: ActionTypes.ADD_ADMIN,
    payload: admins 
})
import axios from 'axios';

export const register = values => async dispatch => {
    try {
        const res = await axios.post('/register', values);
        if (res.status === 201) {
            dispatch({ type: 'REGISTER_SUCCESS' });
        }
    } catch (err) {
        console.log(err);
        dispatch({ type: 'REGISTER_FAIL' });
    }
};

export const login = values => async dispatch => {
    try {
        const res = await axios.post('/login', values);
        if (res.status === 200) {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }
    } catch (err) {
        console.log(err);
        dispatch({ type: 'LOGIN_FAIL' });
    }
};

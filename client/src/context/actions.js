import axios from 'axios';

export const register = values => async dispatch => {
    try {
        const res = await axios.post('/register', values);
        console.log(res);
        if (res.status === 201) {
            dispatch({ type: 'REGISTER_SUCCESS' });
            return res.status;
        }
    } catch (err) {
        console.log(err.response);
        dispatch({ type: 'REGISTER_FAIL' });
        return err.response.data.response;
    }
};

export const login = values => async dispatch => {
    try {
        const res = await axios.post('/login', values);
        if (res.status === 200) {
            dispatch({ type: 'LOGIN_SUCCESS' });
            return res.status;
        }
    } catch (err) {
        console.log(err);
        dispatch({ type: 'LOGIN_FAIL' });
        return err.response.data.response;
    }
};

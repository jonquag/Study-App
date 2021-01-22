import axios from 'axios';

export const register = values => async dispatch => {
    try {
        const res = await axios.post('/auth/register', values);

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
        const res = await axios.post('/auth/login', values);
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

export const fetchProfile = () => async dispatch => {
    try {
        const res = await axios.get('/user');
        const response = await axios.get(`/universities/${res.data.university}`);

        dispatch({
            type: 'FETCH_USER_COURSES',
            payload: {
                school: response.data.name,
                userCourses: res.data.courses,
                schoolCourses: response.data.courses,
            },
        });
    } catch (err) {
        console.log(err.message);
    }
};

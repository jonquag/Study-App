import axios from 'axios';

export const register = values => async dispatch => {
    try {
        const res = await axios.post('/register', values)
            .catch((err) => {
                throw err.response;
            });
        if (res.status === 201) {
            dispatch({ type: 'REGISTER_SUCCESS' });
            return res;
        }
    } catch (err) {
        console.log(err);
        dispatch({ type: 'REGISTER_FAIL' });
        return err;
    }
};

export const login = values => async dispatch => {
    try {
        const res = await axios.post('/login', values)
        .catch((err) => {
            throw err.response;
        });

        if (res.status === 200) {
            dispatch({ type: 'LOGIN_SUCCESS' });
            return res;
        }
    } catch (err) {
        console.log(err);
        dispatch({ type: 'LOGIN_FAIL' });
        return err;
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
        return res.data.groups;
    } catch (err) {
        console.log(err.message);
    }
};

export const fetchUserGroups = (userGroups) => async dispatch => {
    try {
        const res = await axios.get('/user/groups');
        const courseGroups = res.data.map(course => course.groups).flat();
        dispatch({
            type: 'updateUserGroups',
            payload: {
                groups: [...userGroups],
                courseGroups
            }
        })
    } catch (err) {
        console.log(err.message);
    }
}
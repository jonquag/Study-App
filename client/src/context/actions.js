import axios from 'axios';

export const register = values => async dispatch => {
    try {
        const res = await axios.post('auth/register', values).catch(err => {
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
        const res = await axios.post('auth/login', values).catch(err => {
            throw err.response;
        });

        if (res.status === 200) {
            dispatch({ type: 'LOGIN_SUCCESS' });
            return res;
        }
    } catch (err) {
        console.log(err.response);
        dispatch({ type: 'LOGIN_FAIL' });
        return err;
    }
};

export const logout = () => async dispatch => {
    try {
        const res = await axios.delete('/auth/logout');

        if (res.status === 204) {
            dispatch({ type: 'LOGOUT' });
        }
    } catch (err) {
        console.log(err);
    }
};

export const fetchProfile = () => async dispatch => {
    try {
        const res = await axios.get('/profile');

        const { profile, user } = res.data;
        const { courses } = user;

        dispatch({
            type: 'FETCH_USER_INFO',
            payload: [
                {
                    ...profile,
                },
                {
                    school: user.university ? user.university.name : '',
                    userCourses: courses,
                    schoolCourses: user.university ? user.university.courses : [],
                },
            ],
        });
        return user.groups;
    } catch (err) {
        if (err.response.status === 401) {
            dispatch({ type: 'LOGIN_FAIL' });
        }
        console.log(err.message);
    }
};

export const fetchUserGroups = userGroups => async dispatch => {
    try {
        const res = await axios.get('/user/groups');
        const courseGroups = res.data.map(course => course.groups).flat();
        dispatch({
            type: 'updateUserGroups',
            payload: {
                groups: [...userGroups],
                courseGroups,
            },
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const updateProfile = userInfo => async dispatch => {
    try {
        const res = await axios.put('/profile', userInfo);

        fetchProfile()(dispatch);
        return res;
    } catch (err) {
        console.log(err.message);
        return err;
    }
};

export const updatePassword = password => async dispatch => {
    try {
        const res = await axios.put('/auth/changepassword', password);
        return res;
    } catch (err) {
        console.log(err.message);
        return err.response;
    }
};

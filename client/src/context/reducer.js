import Profile from '../constants/Profile';

export const initialState = {
    isLoading: true,
    isAuth: false,
    userCourse: {},
    profile: {},
};

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isAuth: true,
            };
        case 'FETCH_USER_INFO':
            return {
                ...state,
                userCourse: payload[1],
                profile: payload[0],
                isLoading: false,
            };
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
            return {
                ...state,
                isLoading: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoading: true,
                isAuth: false,
            };
        case 'updateProfile':
            return {
                ...state,
                profile: payload,
            };
        default:
            throw new Error('No action type found!');
    }
};

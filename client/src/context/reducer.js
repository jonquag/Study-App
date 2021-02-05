export const initialState = {
    isLoading: true,
    isAuth: false,
    userCourse: {},
    userGroups: {
        courseGroups: [],
        groups: [],
    },
    profile: {},
    userGroups: {groups: [], courseGroups: []},
    isOpen: false,
    forumId: null
};

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isAuth: true,
                isLoading: true,
            };
        case 'FETCH_USER_INFO':
            return {
                ...state,
                userCourse: payload[1],
                profile: payload[0],
                isLoading: false,
                isAuth: true,
            };
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
            return {
                ...state,
                isLoading: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuth: false,
                isLoading: false,
            };
        case 'updateProfile':
            return {
                ...state,
                profile: payload,
            };
        case 'updateUserGroups':
            return {
                ...state,
                userGroups: payload,
            };
        case 'updateUserCourses':
            return {
                ...state,
                userCourse: {
                    ...state.userCourse,
                    userCourses: [...payload],
                },
            };
        case 'CLOSE_DRAWER':
            return {
                ...state,
                isOpen: false,
            };
        case 'OPEN_DRAWER':
            return {
                ...state,
                isOpen: true,
            };
        case 'FORUM_ID':
            return {
                ...state,
                forumId: payload,
            };

        default:
            throw new Error('No action type found!');
    }
};

import Profile from '../models/Profile';

export const initialState = {
    isLoading: true,
    isAuth: false,
    userCourse: {},
    profile: Profile,
};

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isAuth: true,
                isLoading: false,
            };
        case 'FETCH_USER_COURSES':
            return {
                ...state,
                userCourse: payload,
                isLoading: false,
            };
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
            return {
                ...state,
                isLoading: true,
            };
        case 'updateProfile':
            return {
                ...state,
                profile: payload,
            };
        
        //Todo: delete join group and leave group actions just use update user course
        case 'joinGroup':
            const currGroups = [...state.userGroups.groups];
            currGroups.push(payload);
            return {
                ...state,
                userGroups: {
                    courseGroups: [...state.userGroups.courseGroups],
                    groups: currGroups,
                }
            }
        case 'leaveGroup':
            const currentGroups = [...state.userGroups.groups];
            const userGroups = currentGroups.filter((group) => group._id !== payload._id);
            const courseGroups = [...state.userGroups.courseGroups];
            const index = courseGroups.findIndex(group => group._id === payload._id);
            courseGroups[index] = {...payload};
            return {
                ...state,
                userGroups: {
                    courseGroups,
                    groups: userGroups,
                }
            }
        case 'updateUserGroups':
            return {
                ...state,
                userGroups: payload,
            }
        case 'updateUserCourses':
            return {
                ...state,
                userCourse: {
                    ...state.userCourse,
                    userCourses: [...payload],
                }
            }
        default:
            throw new Error('No action type found!');
    }
};

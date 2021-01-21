import React, { createContext, useContext, useEffect, useReducer } from 'react';
import Profile from '../models/Profile';
import axios from 'axios';

const AppContext = createContext({
    isLoading: true,
    isAuth: false,
    profile: {},
});

const initialState = {
    isLoading: true,
    profile: Profile,
};

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'updateProfile':
            return {
                ...state,
                profile: payload,
            };
        case 'CASE_TWO':
            return {
                ...state,
            };
        default:
            throw new Error('No action type found!');
    }
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = () => {
        axios.get('profile/60021edaab2f25167778e7f9').then(res => {
            dispatch({
                type: 'updateProfile',
                payload: res.data,
            });
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useGlobalContext };

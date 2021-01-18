import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext({
    isLoading: true,
    isAuth: false,
});

const initialState = {
    isLoading: true,
};

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'CASE_ONE':
            return {
                ...state,
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

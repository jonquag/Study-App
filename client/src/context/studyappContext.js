import React, { createContext, useContext, useReducer } from 'react';
import SocketManager from '../websocket/SocketManager';

import { initialState, reducer } from './reducer';

const AppContext = createContext({
    isLoading: true,
    isAuth: false,
    dispatch: () => {},
    profile: {},
});

const initialSocket = new SocketManager();

const SocketContext = createContext({
    SocketManager: initialSocket
});

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <SocketContext.Provider value={{SocketManager: initialSocket}}>
            <AppContext.Provider value={{ ...state, dispatch }}>
                {children}
            </AppContext.Provider>
        </SocketContext.Provider>
        
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

const useSocketContext = () => {
    return useContext(SocketContext);
}

export { AppProvider, useGlobalContext, useSocketContext };

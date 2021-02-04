import React, { createContext, useContext, useReducer } from 'react';
import ConversationManager from '../websocket/ConversationManager';

import { initialState, reducer } from './reducer';

const AppContext = createContext({
    isLoading: true,
    isAuth: false,
    dispatch: () => {},
    profile: {},
});

const conversationManager = new ConversationManager();

const ConversationContext = createContext({
    conversationManager,
    notifications: {},
});

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [notifications, setNotifications] = React.useState({});

    React.useEffect(() => {
        conversationManager.init(setNotifications);
    }, []);
    
    return (
        <ConversationContext.Provider value={{conversationManager, notifications}}>
            <AppContext.Provider value={{ ...state, dispatch }}>
                {children}
            </AppContext.Provider>
        </ConversationContext.Provider>
        
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

const useConversationContext = () => {
    return useContext(ConversationContext);
}

export { AppProvider, useGlobalContext, useConversationContext };

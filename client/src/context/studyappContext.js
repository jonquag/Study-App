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
    conversations: {},
});

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [conversations, setConversations] = React.useState([]);

    React.useEffect(() => {
        conversationManager.initUpdateMessages(setConversations);
    }, []);
    
    return (
        <ConversationContext.Provider value={{conversationManager, conversations}}>
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

import React, { useEffect } from 'react';

import * as actions from '../../context/actions';
import { useConversationContext, useGlobalContext } from '../../context/studyappContext';

const Layout = ({ children }) => {
    const { dispatch, isLoading,  isAuth } = useGlobalContext();
    const { conversationManager } = useConversationContext();
    useEffect(() => {
        if (isLoading) 
            actions.fetchProfile()(dispatch).then((userGroups) => {
                actions.fetchUserGroups(userGroups)(dispatch)
            });
    }, [isLoading, dispatch]);

    useEffect(() => {
        conversationManager.closeSocket();
    }, [conversationManager])

    if (isAuth) conversationManager.startSocket();

    return (
        <>
            {children}
        </>
    );
};

export default Layout;

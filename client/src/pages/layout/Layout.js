import React, { useEffect } from 'react';

import * as actions from '../../context/actions';
import { useConversationContext, useGlobalContext } from '../../context/studyappContext';

const Layout = ({ children }) => {
    const { dispatch, isLoading } = useGlobalContext();
    const { conversationManager } = useConversationContext();
    
    useEffect(() => {
        if (isLoading)
            actions.fetchProfile()(dispatch).then((userGroups) => {
                console.log('init')
                const groupNames = userGroups.map(group => group._id);
                conversationManager.startSocket(groupNames);
                actions.fetchUserGroups(userGroups)(dispatch)
            });
    }, [isLoading, dispatch, conversationManager]);

    useEffect(() => {
        return () => conversationManager.closeSocket();
    }, [conversationManager])

    return (
        <>
            {children}
        </>
    );
};

export default Layout;

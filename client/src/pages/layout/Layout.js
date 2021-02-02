import React, { useEffect } from 'react';

import * as actions from '../../context/actions';
import { useSocketContext, useGlobalContext } from '../../context/studyappContext';

const Layout = ({ children }) => {
    const { dispatch, isLoading,  isAuth } = useGlobalContext();
    const { SocketManager } = useSocketContext();
    useEffect(() => {
        if (isLoading) 
            actions.fetchProfile()(dispatch).then((userGroups) => {
                actions.fetchUserGroups(userGroups)(dispatch)
            });
    }, [isLoading, dispatch]);

    useEffect(() => {
        SocketManager.closeSocket();
    }, [SocketManager])

    if (isAuth) SocketManager.startSocket();

    return (
        <>
            {children}
        </>
    );
};

export default Layout;

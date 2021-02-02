import React, { useEffect } from 'react';

import Navbar from './Navbar';
import * as actions from '../../context/actions';
import { useSocketContext, useGlobalContext } from '../../context/studyappContext';

const Layout = ({ children }) => {
    const { dispatch, isLoading,  isAuth } = useGlobalContext();
    const { SocketManager } = useSocketContext();
    useEffect(() => {
        if (isLoading) 
            actions.fetchProfile()(dispatch);
    }, [isLoading, dispatch]);

    useEffect(() => {
        SocketManager.closeSocket();
    }, [SocketManager])

    if (isAuth) SocketManager.startSocket();

    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default Layout;

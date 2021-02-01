import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import Navbar from './Navbar';
import * as actions from '../../context/actions';
import { useSocketContext, useGlobalContext } from '../../context/studyappContext';

const Layout = ({ children }) => {
    const { dispatch, isLoading, isAuth } = useGlobalContext();
    const { SocketManager } = useSocketContext();
    useEffect(() => {
        actions.fetchProfile()(dispatch);
    }, [dispatch]);

    useEffect(() => {
        SocketManager.closeSocket();
    }, [SocketManager])

    if (isAuth) SocketManager.startSocket();

    if (!isAuth) return <Redirect to="/login" />;

    if (isLoading) return <LinearProgress />;

    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default Layout;

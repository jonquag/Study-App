import React, { useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';

import * as actions from '../../context/actions';
import { useGlobalContext } from '../../context/studyappContext';

const Layout = ({ children }) => {
    const { dispatch, isLoading } = useGlobalContext();

    useEffect(() => {
        actions.fetchProfile()(dispatch).then((userGroups) => {
            actions.fetchUserGroups(userGroups)(dispatch)
        });
    }, [dispatch]);

    if (isLoading) return <LinearProgress />;

    return (
        <>
            {children}
        </>
    );
};

export default Layout;

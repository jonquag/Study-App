import React, { useEffect } from 'react';

import * as actions from '../../context/actions';
import { useGlobalContext } from '../../context/studyappContext';

const Layout = ({ children }) => {
    const { dispatch } = useGlobalContext();

    useEffect(() => {
        actions.fetchProfile()(dispatch);
    }, [dispatch]);

    return (
        <>
            {children}
        </>
    );
};

export default Layout;

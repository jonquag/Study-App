import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { useGlobalContext } from '../../context/studyappContext';
import Navbar from '../layout/Navbar';
const PrivateRoute = ({ component: Component, ...rest }) => {
const { isAuth, isLoading } = useGlobalContext();

    return (
        <Route
            {...rest}
            render={props => {
                if (isAuth && !isLoading) 
                    return (
                        <>
                            <Navbar />
                            <Component {...props} />
                        </>
                    );
                else if (isLoading) return <LinearProgress />;
                else
                    return (
                        <Redirect
                            to={{ pathname: '/login', state: { from: props.location } }}
                        />
                    );
            }}
        />
    );
};

export default PrivateRoute;

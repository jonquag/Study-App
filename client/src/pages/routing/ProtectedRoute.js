import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useGlobalContext } from '../../context/studyappContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuth, isLoading } = useGlobalContext();

    return (
        <Route
            {...rest}
            render={props => {
                if (isAuth && !isLoading) return <Component {...props} />;
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

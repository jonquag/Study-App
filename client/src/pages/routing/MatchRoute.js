import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import NotFound from '../NotFound';
const routeNames = new Set('/profile', '/profile/', '/forum', '/groups', '/chat');

const MatchRoute = (props) => {
    console.log(props.location.pathname);
    if (routeNames.has(props.location.pathname)) {
        console.log('hi')
        return (
            <>
                {props.children}
            </>
        );
    } else {
        return <NotFound />
    }
};

export default MatchRoute;

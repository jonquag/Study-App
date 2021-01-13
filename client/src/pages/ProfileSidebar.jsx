import React from 'react'
import {  Route, Switch, Link } from 'react-router-dom';
import Profile2 from './Profile2';
import Courses from './Courses';
import Settings from './Settings';
import Notifications from './Notifications';


const ProfileSidebar = () => {
    return(
        <Switch>
            <Route path="/user-info" component={Profile2} />
            <Route path="/courses" component={Courses} />
            <Route path="/settings" component={Settings} />
            <Route path="/notifications" component={Notifications} />
            
            <Link to="/user-info">User Info</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/notifications">Notifications</Link>
            <h1>Profile Sidebar</h1>
        </Switch>
    ) 
}

export default ProfileSidebar;
import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ProfileSidebar = () => {
    return (
        // Sidebar container
        <Grid container>
            {'container'}
            {/* User brief data container */}
            <Grid container item xs={12}>
                {'user brief'}
            </Grid>
            {/* Navbar container */}
            <Grid container item xs={12} direction='column'>
                <Link to='/profile/'>User Info</Link>
                <Link to='/profile/courses'>My Courses</Link>
                <Link to='/profile/settings'>Settings</Link>
                <Link to='/profile/notifications'>Notifications</Link>
            </Grid>
        </Grid>
    );
};

export default ProfileSidebar;

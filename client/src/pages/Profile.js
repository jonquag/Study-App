import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, LinearProgress } from '@material-ui/core';
import axios from 'axios';

// Custom component imports
import UserInfo from '../components/Profile/UserInfo';
import Settings from '../components/Profile/Settings';
import Notifications from '../components/Profile/Notifications';
import Sidebar from '../components/Profile/Sidebar';
import Navbar from '../pages/layout/Navbar';
import MyCourses from '../pages/dashboard/MyCourses';

const useStyles = makeStyles(theme => ({
    container: {
        height: 'calc(100vh - 100px)',
        marginTop: 3,
    },
    contentContainer: {
        backgroundColor: theme.palette.common.white,
    },
}));

const Profile = () => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(true);
    const [university, setUniversity] = useState('');
    const [userCourses, setUserCourses] = useState([]);
    const [uniCourses, setUniCourses] = useState([]);

    const fetchProfile = async () => {
        try {
            const res = await axios.get('/user');
            const response = await axios.get(`/universities/${res.data.university}`);

            setUniversity(response.data.name);
            setUserCourses(res.data.courses);
            setUniCourses(response.data.courses);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (isLoading) return <LinearProgress />;

    return (
        <Grid>
            <Navbar />
            <Grid container className={classes.container}>
                <Grid item container sm={3} className={classes.sidebar}>
                    <Sidebar />
                </Grid>
                <Grid item container sm={9} className={classes.contentContainer}>
                    <Switch>
                        <Route exact path="/profile">
                            <UserInfo />
                        </Route>
                        <Route path="/profile/courses">
                            <MyCourses
                                school={university}
                                userCourses={userCourses}
                                schoolCourses={uniCourses}
                            />
                        </Route>
                        <Route path="/profile/settings">
                            <Settings />
                        </Route>
                        <Route path="/profile/notifications">
                            <Notifications />
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;

import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
 //import ForumSidebar from '../../components/Forum/ForumSidebar';
import Sidebar from '../../components/Profile/Sidebar';
import ForumContent from '../../components/Forum/ForumContent';

import ForumSidePanel from './ForumSidePanel';

const useStyles = makeStyles(theme => ({
    container: {
        height: 'calc(100vh - 100px)',
    },
    contentContainer: {
        backgroundColor: theme.palette.common.white,
    },
}));

const Forum = () => {
    const classes = useStyles();
    const [selectedGroup, setSelectedGroup] = useState('');

    const updateSelectedGroup = (group) => {
        setSelectedGroup(group);
    }

    return (
        <Grid container className={classes.container}>
            <Grid item container sm={3} className={classes.sidebar}>
                <ForumSidePanel onGroupUpdate={updateSelectedGroup} /> 
            </Grid>
            <Grid item container sm={9} className={classes.contentContainer}>
                <ForumContent name={selectedGroup} />
            </Grid>
        </Grid>
    );
};

export default Forum;

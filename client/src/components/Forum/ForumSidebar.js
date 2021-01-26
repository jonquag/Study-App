import React from 'react';
import { Grid, Typography, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({}));

const ForumSidebar = () => {
    const classes = useStyles();

    return (
        <Grid container direction="column" alignItems="center" item>
            <Typography>My Courses</Typography>
        </Grid>
    );
};

export default ForumSidebar;

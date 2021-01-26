import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ForumSidebar from '../../components/Forum/ForumSidebar';
import ForumContent from '../../components/Forum/ForumContent';

const useStyles = makeStyles(theme => ({
    container: {
        height: 'calc(100vh - 103px)',
        marginTop: 3,
    },
    contentContainer: {
        backgroundColor: theme.palette.common.white,
    },
}));

const Forum = () => {
    const classes = useStyles();

    return (
        <Grid>
            <Grid container className={classes.container}>
                {/* Sidebar container */}
                <Grid item container sm={3} className={classes.sidebar}>
                    <ForumSidebar />
                </Grid>
                {/* Content container */}
                <Grid item container sm={9} className={classes.contentContainer}>
                    <ForumContent />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Forum;

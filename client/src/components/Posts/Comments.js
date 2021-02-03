import React from 'react';
import { Typography, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    avatar: {
        height: '75px',
        width: '75px',
        margin: theme.spacing(1, 0),
    },
    commentText: {
        padding: theme.spacing(0, 4),
    },
}));

const Comments = () => {
    const classes = useStyles();
    return (
        <div>
            {' '}
            <Grid container item justify="flex-start">
                <Grid
                    item
                    container
                    direction="column"
                    alignItems="center"
                    justify="flex-start"
                    xs={2}
                >
                    <Grid item>
                        <Avatar className={classes.avatar} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h4">Username</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <Typography className={classes.commentText}>
                        Render comments here from users. Render comments here from users.
                        Render comments here from users. Render comments here from users.
                        Render comments here from users. Render comments here from users.
                        Render comments here from users. Render comments here from users.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Comments;

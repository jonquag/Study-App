import React from 'react';
import { Typography, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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

const Comments = ({ comment }) => {
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
                        {comment.avatar ? (
                            <Avatar
                                alt={comment.name}
                                src={comment.avatar}
                                className={classes.avatar}
                            />
                        ) : (
                            <Avatar className={classes.avatar}>
                                <PersonAddIcon />
                            </Avatar>
                        )}
                    </Grid>
                    <Grid item>
                        <Typography variant="h4">{comment.name}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <Typography className={classes.commentText}>
                        {comment.text}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Comments;

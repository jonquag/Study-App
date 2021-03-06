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
        padding: theme.spacing(2),
    },
    divider: {
        margin: theme.spacing(2),
        width: '100%',
    },
}));

const Comments = ({ comment }) => {
    const classes = useStyles();
    return (
        <div className={classes.comment}>
            {' '}
            <Grid container item justify="flex-start">
                <Grid
                    item
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
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
                                <PersonAddIcon className={classes.avatar} />
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
                {/* <Divider className={classes.divider} /> */}
            </Grid>
        </div>
    );
};

export default Comments;

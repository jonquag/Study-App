import React from 'react';
import { Grid, Button, Typography, Divider, Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import ForwardIcon from '@material-ui/icons/Forward';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';
import Comments from './Comments';

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        marginTop: '75px',
        padding: theme.spacing(3),
    },
    divider: {
        margin: theme.spacing(2, 0),
        width: '100%',
    },
    title: {
        marginBottom: theme.spacing(1),
        width: 'calc(100vw - 100px)',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
        },
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1, 0),
        maxWidth: 500,
        maxHeight: 500,
        // these can be commented out, just showing size.
        height: 500,
        width: 500,
        background: 'grey',
    },
    close: {
        height: 2.5,
    },
    // wrapper: {
    //     width: 'calc(100vw - 100px)',
    //     [theme.breakpoints.up('md')]: {
    //         width: 'calc(100vw - 250px)',
    //     },
    //     [theme.breakpoints.up('lg')]: {
    //         width: 'calc(100vw - 40vw)',
    //     },
    // },
    upvote: {
        transform: 'rotate(-90deg)',
        // fontSize: 'large',
        height: '2rem',
        width: '2rem',
    },
}));

const PostModal = ({ handleClose }) => {
    const classes = useStyles();
    // let upvoted = false;
    const [upvoted, setUpvoted] = React.useState(false);

    const toggleVote = () => {
        setUpvoted(!upvoted);
        console.log('upvoted?: ' + upvoted);
    };

    return (
        <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            // style={{ width: '100%' }}
        >
            {/* <div className={classes.wrapper}>
                <div className={classes.paper}> */}
            <Grid item container direction="column" alignItems="center">
                <Grid item xs={12} container>
                    <Grid item xs={2}>
                        <Button
                            onClick={handleClose}
                            color="primary"
                            className={classes.close}
                        >
                            <CloseIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h2" align="center">
                            Post Title
                        </Typography>
                    </Grid>
                </Grid>

                <Divider className={classes.divider} />

                <Grid item>
                    <Box className={classes.imageContainer}>Place image here</Box>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item>
                    <Typography>
                        This is the description of the post. Don't you wish I would have
                        used Lorem25 and got it working? This is the description of the
                        post. Don't you wish I would have used Lorem25 and got it working?
                        description of the post. Don't you wish I would have used Lorem25
                        and got it working?
                    </Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Grid item container xs={12} alignItems="center">
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Comments />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton aria-label="upvote" onClick={toggleVote}>
                            {upvoted ? (
                                <ForwardIcon
                                    color="secondary"
                                    className={classes.upvote}
                                />
                            ) : (
                                <ForwardOutlinedIcon
                                    color="secondary"
                                    className={classes.upvote}
                                />
                            )}
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            {/* </div>
            </div> */}
        </Grid>
    );
};

export default PostModal;

import React from 'react';
import { Grid, Button, Typography, Divider, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        marginTop: theme.spacing(10),
        padding: theme.spacing(3),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    title: {
        marginBottom: theme.spacing(1),
        width: 600,
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1, 0),
    },
    close: {
        height: 2.5,
    },
    wrapper: {
        maxWidth: 800,
    },
}));

const PostModal = ({ handleClose }) => {
    const classes = useStyles();

    return (
        <div>
            <Grid container item sm={12} direction="column">
                <Grid
                    item
                    container
                    direction="column"
                    xs={12}
                    justify="center"
                    alignItems="center"
                >
                    <div className={classes.wrapper}>
                        <div className={classes.paper}>
                            <Grid item>
                                <Button
                                    onClick={handleClose}
                                    color="primary"
                                    className={classes.close}
                                >
                                    <CloseIcon />
                                </Button>
                            </Grid>

                            <Grid item container justify="center" direction="column">
                                <Grid item>
                                    <Typography className={classes.title}>
                                        Title
                                    </Typography>
                                </Grid>
                                <Divider className={classes.divider} />

                                <Grid item>
                                    <Box className={classes.imageContainer}>
                                        Place image here
                                    </Box>
                                </Grid>

                                <Grid item>
                                    <Typography>Description</Typography>
                                </Grid>
                                <Divider className={classes.divider} />

                                <Grid item>For upvotes</Grid>
                                <Grid item> Render comments here</Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default PostModal;

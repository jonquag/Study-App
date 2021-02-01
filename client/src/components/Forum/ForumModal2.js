import React from 'react';
import { Grid, Button, InputLabel, TextField, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        // position: 'absolute',
        // width: '100%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        // margin: 0,
        padding: theme.spacing(2, 4, 3),
    },
}));

const ForumModal2 = ({ handleClose }) => {
    const classes = useStyles();
    return (
        <Grid container styles={{ background: 'orange', width: '600px' }}>
            <div className={classes.wrapper}>
                <div className={classes.paper}>
                    <Button onClick={handleClose}>x</Button>
                    <h3 variant="h5" id="transition-modal-title" align="center">
                        {' '}
                        Add Forum Post
                    </h3>
                    <p id="transition-modal-description">
                        Create a post for students in your course!
                    </p>
                    <Divider className={classes.divider} />

                    <form>
                        <InputLabel className={classes.label}>Post Title</InputLabel>
                        <TextField
                            variant="outlined"
                            // defaultValue={}
                            // onChange={e => setFirstName(e.target.value)}
                            className={classes.input}
                            placeholder="Add a title.."
                        />

                        <InputLabel className={classes.label}>
                            Post Description
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            // defaultValue={}
                            // onChange={e => setFirstName(e.target.value)}
                            className={classes.input}
                            placeholder="Add a description.."
                        />

                        <Button color="primary">Create Post</Button>
                    </form>
                </div>
            </div>
        </Grid>
    );
};

export default ForumModal2;

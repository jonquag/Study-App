import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Grid,
    Typography,
    InputLabel,
    TextField,
    Divider,
} from '@material-ui/core';
import DragzonePicture from '../DragzonePicture';
import { AddIcon } from '@material-ui/icons/Add';
// import { CloseIcon } from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    // modal specific styling
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    input: {
        width: 200,
    },
    label: {
        paddingBottom: theme.spacing(1),
    },
    divider: {
        marginBottom: 10,
    },
}));

const handleSubmit = () => {
    console.log('submitted');
};

const ForumModal = () => {
    const classes = useStyles();
    return (
        <Grid
            container
            item
            grid
            sm={12}
            justify="center"
            alignItems="center"
            style={{ paddingTop: 105 }}
        >
            <Grid item m={8}>
                <div className={classes.paper}>
                    <Button>{/* <CloseIcon fontSize="medium" /> */}</Button>
                    <h3 variant="h5" id="transition-modal-title" align="center">
                        {' '}
                        Add Forum Post
                    </h3>
                    <p id="transition-modal-description">
                        Create a post for students in your course!
                    </p>
                    <Divider className={classes.divider} />

                    <form>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item>
                                <InputLabel className={classes.label}>
                                    Post Title
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    // defaultValue={}
                                    // onChange={e => setFirstName(e.target.value)}
                                    className={classes.input}
                                    placeholder="Add a title.."
                                />
                            </Grid>
                            <Grid item>
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
                            </Grid>
                            <Grid item>
                                <Typography>Drag an image below:</Typography>
                                <DragzonePicture />
                            </Grid>
                            <Grid item>
                                <Button
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleSubmit}
                                >
                                    Create Post
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default ForumModal;

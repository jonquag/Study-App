import React, { useState, useMemo } from 'react';
import {
    Grid,
    Button,
    InputLabel,
    TextField,
    Divider,
    Typography,
    Box,
    Tooltip,
    FormHelperText,
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { baseStyle, activeStyle, acceptStyle, rejectStyle } from './ForumModalStyles';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
// import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        marginTop: theme.spacing(10),
        padding: theme.spacing(2, 4, 3),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    input: {
        width: 400,
        paddingBottom: theme.spacing(2),
    },
    label: {
        paddingBottom: theme.spacing(1),
    },
    title: {
        marginBottom: theme.spacing(1),
    },
    groupImageContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    large: {
        height: '300px',
        width: '400px',
    },
    uploading: {
        opacity: 0.5,
        height: '300px',
        width: '400px',
    },
    button: {
        width: 400,
    },
    close: {
        height: 2.5,
    },
}));

const ForumModal = ({ handleClose }) => {
    const classes = useStyles();

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [newPost, setNewPost] = useState();

    // const onDrop = useCallback(async droppedFiles => {
    //     if (droppedFiles.length) {
    //         setUploading(true);

    //         const form = new FormData();
    //         form.append('image', droppedFiles[0]);
    //         const res = await axios
    //             .post('/upload/single', form)
    //             .catch(err => console.log(err));
    //         if (res && res.data) {
    //             setGroupPicture(res.data.imageUrl);
    //             setUploading(false);
    //         }
    //     }
    // }, []);
    const onDrop = () => {
        console.log('Dropped');
    };

    const createPost = () => {};

    const { getRootProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: 'image/*',
    });
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    return (
        <Grid container sm={12} direction="column">
            <Grid
                item
                container
                direction="column"
                xs={12}
                justify="center"
                alignItems="center"
            >
                <div>
                    <div className={classes.paper}>
                        <Grid item>
                            <Button
                                onClick={handleClose}
                                color="primary"
                                className={classes.close}
                            >
                                <CloseIcon />
                            </Button>
                            <Typography
                                variant="h2"
                                id="modal-title"
                                align="center"
                                className={classes.title}
                            >
                                Add Forum Post
                            </Typography>
                            <Typography
                                variant="h4"
                                id="modal-description"
                                align="center"
                            >
                                Create a post for students in your course!
                            </Typography>
                            <Divider className={classes.divider} />
                        </Grid>

                        <form>
                            <Grid item>
                                <InputLabel className={classes.label}>
                                    Post Title
                                </InputLabel>
                                <TextField
                                    variant="outlined"
                                    defaultValue={title}
                                    onChange={e => setTitle(e.target.value)}
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
                                    defaultValue={description}
                                    onChange={e => setDescription(e.target.value)}
                                    className={classes.input}
                                    placeholder="Add a description.."
                                />
                            </Grid>
                            <Grid item>
                                <Box className={classes.groupImageContainer}>
                                    <FormHelperText>
                                        Drag and Drop Post Picture{' '}
                                    </FormHelperText>
                                    <Tooltip
                                        title="Drag and drop post picture"
                                        arrow
                                        placement="right"
                                    >
                                        <Box {...getRootProps({ style })}>
                                            <img
                                                src="https://www.rcdrilling.com/wp-content/uploads/2013/12/default_image_01-1024x1024-570x321.png"
                                                className={classes.large}
                                                alt="Post"
                                            />
                                        </Box>
                                    </Tooltip>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Button
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onSubmit={createPost}
                                    className={classes.button}
                                >
                                    Create Post
                                </Button>
                            </Grid>
                        </form>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default ForumModal;

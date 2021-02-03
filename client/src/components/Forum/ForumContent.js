import React from 'react';
import {
    Button,
    Grid,
    Typography,
    Divider,
    Modal,
    Box,
    IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { posts } from '../../data/mockData';
import PostCard from './PostCard';
import Comments from '../Posts/Comments';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import ForwardIcon from '@material-ui/icons/Forward';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';

const useStyles = makeStyles(theme => ({
    headerContainer: {
        height: 150,
    },
    divider: {
        marginBottom: 10,
    },
    cardContainer: {
        maxWidth: '100%',
    },
    button: {
        width: 150,
        marginRight: theme.spacing(3),
    },
    postCard: {
        maxWidth: '100%',
        padding: theme.spacing(0, 10, 0, 10),
    },
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
        marginBottom: theme.spacing(2),
        // width: 'calc(100vw - 100px)',
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
    upvote: {
        transform: 'rotate(-90deg)',
        height: '2rem',
        width: '2rem',
    },
    input: {
        margin: theme.spacing(2, 0),
    },
}));

const ForumContent = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [activePost, setActivePost] = React.useState('');
    const [upvoted, setUpvoted] = React.useState(false);

    const toggleVote = () => {
        setUpvoted(!upvoted);
        console.log('upvoted?: ' + upvoted);
    };

    const addPost = () => {
        console.log('Add post clicked');
    };
    // Calling will open modal
    const handleOpen = () => {
        console.log('open');
        setOpen(true);
    };
    // Calling will close modal
    const handleClose = () => {
        console.log('close');
        setOpen(false);
    };
    // Updates setActivePost to the corresponding clicked card and opens dialog.
    const updateActivePost = postId => {
        setActivePost(postId);
        // console.log('postId: ' + postId);
        handleOpen();
    };

    return (
        <Grid
            container
            direction="column"
            className={classes.container}
            alignContent="center"
            item
            sm={12}
        >
            <Grid
                item
                container
                alignContent="center"
                alignItems="baseline"
                direction="row"
                className={classes.headerContainer}
            >
                <Grid item container sm={9}>
                    <Typography variant="h1" style={{ paddingLeft: '2em' }}>
                        Forum
                    </Typography>
                </Grid>

                <Grid item container sm={3}>
                    <Button className={classes.button} onClick={addPost} color="primary">
                        Add Post
                    </Button>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />

            <Grid
                item
                container
                sm={8}
                justify="flex-start"
                direction="column"
                className={classes.cardContainer}
            >
                <Grid item className={classes.postCard}>
                    {posts.map(post => (
                        <PostCard
                            key={post.id}
                            post={post}
                            updateActivePost={updateActivePost}
                        />
                    ))}
                </Grid>
                <Button onClick={updateActivePost}>button</Button>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    className={classes.dialog}
                    maxWidth="lg"
                >
                    {/* <PostModal /> */}
                    <DialogContent>
                        <Grid
                            item
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item container direction="column" alignItems="center">
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    justify="space-between"
                                    alignItems="baseline"
                                >
                                    <Grid item>
                                        <Button
                                            onClick={handleClose}
                                            color="primary"
                                            className={classes.close}
                                        >
                                            <CloseIcon />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography
                                            variant="h1"
                                            align="center"
                                            id="form-dialog-title"
                                            className={classes.title}
                                        >
                                            Post Title
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            aria-label="upvote"
                                            onClick={toggleVote}
                                        >
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

                                <Divider className={classes.divider} />

                                <Grid item>
                                    <Box className={classes.imageContainer}>
                                        Place image here
                                    </Box>
                                </Grid>
                                <Divider className={classes.divider} />
                                <Grid item>
                                    <Typography>
                                        This is the description of the post. Don't you
                                        wish I would have used Lorem25 and got it working?
                                        This is the description of the post. Don't you
                                        wish I would have used Lorem25 and got it working?
                                        description of the post. Don't you wish I would
                                        have used Lorem25 and got it working?
                                    </Typography>
                                </Grid>
                                <Divider className={classes.divider} />
                                <Grid item container xs={12} alignItems="center">
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={10}>
                                        <Comments />
                                        <TextField
                                            variant="outlined"
                                            autoFocus
                                            label="Comment"
                                            type="text"
                                            multiline
                                            rows={4}
                                            rowsMax={4}
                                            color="secondary"
                                            fullWidth
                                            className={classes.input}
                                        />
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </Grid>
        </Grid>
    );
};

export default ForumContent;

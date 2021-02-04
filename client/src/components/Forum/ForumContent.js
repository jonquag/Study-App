import React from 'react';
import { Button, Grid, Typography, Divider, Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { posts } from '../../data/mockData';
import PostCard from './PostCard';
import Comments from '../Posts/Comments';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import ForwardIcon from '@material-ui/icons/Forward';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';
import AddPostDialog from './AddPostDialog';

const useStyles = makeStyles(theme => ({
    headerContainer: {
        height: 150,
    },
    headerText: {
        paddingLeft: '2em',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 8,
        },
    },
    divider: {
        marginBottom: 10,
        margin: theme.spacing(1, 0),
        width: '100%',
    },
    cardContainer: {
        maxWidth: '100%',
    },
    button: {
        width: 150,
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(1),
        },
    },
    postCard: {
        maxWidth: '100%',
        padding: theme.spacing(0, 10, 0, 10),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(0, 1, 0, 1),
        },
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        marginTop: '75px',
        padding: theme.spacing(3),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: '1.375rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1, 0),
        maxWidth: 500,
        maxHeight: 500,
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
    const [openPost, setOpenPost] = React.useState(false);
    const [openNewPost, setOpenNewPost] = React.useState(false);
    const [activePost, setActivePost] = React.useState('');
    const [upvoted, setUpvoted] = React.useState(false);

    const toggleVote = () => {
        setUpvoted(!upvoted);
    };

    const handleOpenNewPost = () => {
        setOpenNewPost(true);
    };
    const handleCloseNewPost = () => {
        setOpenNewPost(false);
    };
    // Calling will open dialog
    const handleOpenPost = () => {
        setOpenPost(true);
    };
    // Calling will close dialog
    const handleClosePost = () => {
        setOpenPost(false);
    };
    // Updates setActivePost to the corresponding clicked card and opens dialog.
    const updateActivePost = postId => {
        setActivePost(postId);
        handleOpenPost();
    };

    return (
        <Grid container direction="column" alignContent="center" item sm={12}>
            <Grid
                item
                container
                justify="space-between"
                alignItems="center"
                className={classes.headerContainer}
            >
                <Grid item>
                    <Typography variant="h1" className={classes.headerText}>
                        Forum
                    </Typography>
                </Grid>

                <Grid item container sm={3}>
                    <Button
                        className={classes.button}
                        onClick={handleOpenNewPost}
                        variant="text"
                        color="primary"
                        type="button"
                        startIcon={<AddIcon />}
                    >
                        Add Post
                    </Button>
                    {/* New post dialog */}
                    <Dialog
                        open={openNewPost}
                        onClose={handleCloseNewPost}
                        aria-labelledby="form-dialog-title"
                        className={classes.dialog}
                        maxWidth="md"
                    >
                        <DialogContent>
                            <AddPostDialog handleCloseNewPost={handleCloseNewPost} />
                        </DialogContent>
                    </Dialog>
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
                {/* View Post Dialog */}
                <Dialog
                    open={openPost}
                    onClose={handleClosePost}
                    aria-labelledby="form-dialog-title"
                    className={classes.dialog}
                    maxWidth="lg"
                >
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
                                            onClick={handleClosePost}
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
                                            label="Comment on post"
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

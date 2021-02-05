import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PostCard from './PostCard';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import AddPostDialog from './AddPostDialog';
import ForumDialog from './ForumDialog';

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

const ForumContent = ({ name, groupId }) => {
    const classes = useStyles();
    const [openPost, setOpenPost] = React.useState(false);
    const [openNewPost, setOpenNewPost] = React.useState(false);
    const [activePostId, setActivePostId] = React.useState('');

    //  Calling will open new post dialog
    const handleOpenNewPost = () => {
        setOpenNewPost(true);
    };
    // Calling will close new post dialog
    const handleCloseNewPost = newPost => {
        if (newPost._id) {
            setForumPosts([newPost, ...forumPosts]);
        }
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
        setActivePostId(postId);
        handleOpenPost();
    };

    const [forumPosts, setForumPosts] = useState([]);
    //const [forumName, setForumName] = useState(name);
    // const { forumId } = useGlobalContext();

    const getGroupForum = useCallback(async () => {
        try {
            const response = await axios.get(`/forum/${groupId}`);
            setForumPosts(response.data.posts);
        } catch (err) {
            console.log(err);
        }
    }, [groupId]);

    useEffect(() => {
        getGroupForum(groupId);
    }, [getGroupForum, groupId]);

    // const renderPosts = () => {
    //     return (
    //         <Grid item className={classes.postCard}>
    //             {forumPosts.map(post => (
    //                 <PostCard key={post._id} post={post} />
    //             ))}
    //         </Grid>
    //     );
    // };

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
                        {name}
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
                    {forumPosts.map(post => (
                        <PostCard
                            key={post._id}
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
                        <ForumDialog
                            handleClosePost={handleClosePost}
                            activePostId={activePostId}
                        />
                    </DialogContent>
                </Dialog>
            </Grid>
        </Grid>
    );
};

export default ForumContent;

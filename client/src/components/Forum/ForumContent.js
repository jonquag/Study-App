import React from 'react';
import { Button, Grid, Typography, Divider, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { posts } from '../../data/mockData';
import PostCard from './PostCard';
import PostModal from '../Posts/PostModal';

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
}));

const ForumContent = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [activePost, setActivePost] = React.useState('');
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

    const updateActivePost = postId => {
        setActivePost(postId);
        console.log('postId: ' + postId);
        handleOpen();
        // console.log('active post: ' + activePost);
        // console.log('set active post: ' + setActivePost);
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

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-post"
                    aria-describedby="simple-modal-to-open-post"
                >
                    <PostModal handleClose={handleClose} />
                </Modal>
            </Grid>
        </Grid>
    );
};

export default ForumContent;

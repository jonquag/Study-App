import React from 'react';
import { Button, Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { posts } from '../../data/mockData';
import PostCard from './PostCard';

import Modal from '@material-ui/core/Modal';

import ForumModal from './ForumModal';

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
}));

const ForumContent = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    // Calling will open modal
    const handleOpen = () => {
        setOpen(true);
    };
    // Calling will close modal
    const handleClose = () => {
        setOpen(false);
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
                        onClick={handleOpen}
                        variant="text"
                        color="primary"
                        type="button"
                    >
                        Add Post
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-forum"
                        aria-describedby="simple-modal-to-open-forum"
                    >
                        <ForumModal handleClose={handleClose} />
                    </Modal>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />

            <Grid
                item
                container
                sm={10}
                justify="flex-start"
                direction="column"
                className={classes.cardContainer}
            >
                <Grid item className={classes.postCard}>
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ForumContent;

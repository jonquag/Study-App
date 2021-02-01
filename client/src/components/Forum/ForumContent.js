import React from 'react';
import { Button, Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { posts } from '../../data/mockData';
import PostCard from './PostCard';

import Modal from '@material-ui/core/Modal';

import ForumModal2 from './ForumModal2';

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
}));

const ForumContent = () => {
    const classes = useStyles();
    // const [posts] = useState();
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
                        <ForumModal2 handleClose={handleClose} />
                    </Modal>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />

            <Grid
                item
                container
                sm={10}
                justify="flex-start"
                alignItems="center"
                direction="column"
                className={classes.cardContainer}
            >
                <Grid item>
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ForumContent;

import React from 'react';
import { Button, Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { posts } from '../../data/mockData';
import PostCard from './PostCard';

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

const addPost = () => {
    console.log('Add post clicked');
};

const ForumContent = () => {
    const classes = useStyles();

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
                        onClick={addPost}
                        variant="text"
                        color="primary"
                    >
                        Add Post
                    </Button>
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

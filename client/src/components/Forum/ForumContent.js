import React from 'react';
import { Button, Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { posts } from '../../data/mockData';
import PostCard from './PostCard';

const useStyles = makeStyles(theme => ({
    container: {
        // padding: theme.spacing(0, 0, 0, 11),
    },
    headerContainer: {
        height: 150,
    },
    button: {
        color: '#FFF',
        background: theme.palette.primary.gradient,
        padding: 20,
        width: 150,
        textTransform: 'none',
        fontSize: 18,
    },
}));

const ForumContent = () => {
    const classes = useStyles();

    return (
        <Grid container direction="column" className={classes.container}>
            <Grid
                item
                container
                alignContent="center"
                direction="row"
                className={classes.headerContainer}
            >
                <Grid item container sm={9}>
                    <Typography variant="h1">Forum</Typography>
                </Grid>

                <Grid item container sm={3}>
                    <Button className={classes.button}>Add Post</Button>
                </Grid>
            </Grid>

            <Grid item container sm={10}>
                <Container maxWidth="xl">
                    <Grid container>
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    );
};

export default ForumContent;

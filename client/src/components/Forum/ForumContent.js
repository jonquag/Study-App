import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PostCard from './PostCard';
import axios from 'axios';
import { useGlobalContext } from '../../context/studyappContext';

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

const addPost = () => {
    console.log('Add post clicked');
};

const ForumContent = ({name, groupId}) => {
    const classes = useStyles();

    const [forumPosts, setForumPosts] = useState([]);
    const [forumName, setForumName] = useState('');
    const { forumId } = useGlobalContext();

    const getGroupForum = async (groupId) => {

        try {
            const response = await axios.get(`/forum/${groupId}`);
            setForumPosts(response.data.group.forum.posts)
            setForumName(response.data.group.name)

        } catch(err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        getGroupForum(groupId);
      }, [groupId]);
    
    const renderPosts = () => {
        return (
            <Grid item className={classes.postCard}>
                {forumPosts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))}
            </Grid>
            ) 
    }

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
                        {forumName}
                    </Typography>
                </Grid>

                <Grid item>
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
            { renderPosts()}   

            </Grid>
        </Grid>
    );
};

export default ForumContent;

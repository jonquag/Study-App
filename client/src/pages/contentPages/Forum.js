import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
 //import ForumSidebar from '../../components/Forum/ForumSidebar';
import Sidebar from '../../components/Profile/Sidebar';
import ForumContent from '../../components/Forum/ForumContent';
import ForumSidePanel from './ForumSidePanel';

const useStyles = makeStyles(theme => ({
    container: {
        height: 'calc(100vh - 100px)',
        [theme.breakpoints.down('sm')]: {
            height: 'auto',
        },
    },
    contentContainer: {
        backgroundColor: theme.palette.common.white,
    },
}));

const Forum = () => {
    const classes = useStyles();
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState('');

    const updateSelectedGroup = (group, groupId) => {
        setSelectedGroup(group);
        setSelectedGroupId(groupId);
    }

    return (
        <Grid container className={classes.container}>
            <Sidebar>
                <ForumSidePanel onGroupUpdate={updateSelectedGroup} />
            </Sidebar>
            <Grid item container sm={12} md={9} className={classes.contentContainer}>
                <ForumContent name={selectedGroup} groupId={selectedGroupId} />
            </Grid>
        </Grid>
    );
};

export default Forum;

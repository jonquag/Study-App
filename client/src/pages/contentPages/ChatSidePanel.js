import React, { useState } from 'react';
import { Grid, Typography, Badge, Divider, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { chatList } from '../../data/mockData';

const useStyles = makeStyles(theme => ({
    list_container: {
        display: 'block',
        height: 'calc(100vh - 103px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.6rem',
            height: '12rem',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px grey',
            borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#ccc',
        },
    },
    chat_head: {
        height: 120,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: theme.spacing(4),
        '& p': {
            fontSize: '1.375rem',
        },
    },
    badge: {
        color: theme.palette.common.white,
        paddingLeft: theme.spacing(4),
        '& span': {
            width: 40,
            height: 24,
            fontSize: '0.875rem',
            background: theme.palette.primary.gradient,
        },
    },
    chat_list: {
        height: 100,
        flexWrap: 'nowrap',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#e6edff',
        },
    },
    chat_list_active: {
        height: 100,
        flexWrap: 'nowrap',
        alignItems: 'center',
        backgroundColor: '#e6edff',
        borderLeft: '7px solid #2967ff',
    },
    group_member: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing(2),
    },
    avatar_container: {
        marginLeft: theme.spacing(5),
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 18,
    },
    group_name: {
        fontSize: '1.125rem',
        fontWeight: 500,
    },
    divider: {
        opacity: 0.10414,
        height: 1,
        background: '#2967ff',
    },
}));

const ChatSidePanel = ({chatList, chatIndex, setChatIndex}) => {
    const classes = useStyles();
    
    return (
        <Grid container className={classes.list_container}>
            <Grid item className={classes.chat_head}>
                <Typography>All Chats</Typography>
                <Badge badgeContent={chatList.length} className={classes.badge} />
            </Grid>
            <Divider className={classes.divider} />
            {chatList.map((cg, index)=> {
                return (
                    <React.Fragment key={cg.id}>
                        <Grid
                            item
                            container
                            className={
                                index === chatIndex
                                    ? classes.chat_list_active
                                    : classes.chat_list
                            }
                            onClick={() => setChatIndex(index)}
                        >
                            <Grid item className={classes.avatar_container}>
                                <Avatar
                                    alt="chat_group_img"
                                    src={cg.imgUrl}
                                    variant="rounded"
                                    className={classes.avatar}
                                />
                            </Grid>
                            <Grid item container className={classes.group_member}>
                                <Typography className={classes.group_name}>
                                    {cg.chatGroup}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {cg.members} members
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                    </React.Fragment>
                );
            })}
        </Grid>
    );
};

export default ChatSidePanel;

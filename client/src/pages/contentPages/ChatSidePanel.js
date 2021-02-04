import React from 'react';
import { 
    Grid, 
    Typography, 
    Badge, 
    Divider, 
    Avatar } 
from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalContext } from '../../context/studyappContext';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.down('sm')]: {
            height: '100vh',
            backgroundColor: '#FFF',
            paddingTop: theme.spacing(6),
        },
    },
    list_container: {
        display: 'block',
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
        [theme.breakpoints.down('sm')]: {
            backgroundColor: '#FFF',
        },
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
        [theme.breakpoints.down('sm')]: {
            height: 'auto',
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
    small_badge: {
        color: theme.palette.common.white,
        '& span': {
            width: 30,
            height: 24,
            fontSize: '0.7rem',
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

const ChatSidePanel = ({groups, chatIndex, updateSelectedChat, notifications}) => {
    console.log(notifications);
    const classes = useStyles();
    const { dispatch } = useGlobalContext();

    const handleChatList = (index) => {
        updateSelectedChat(index)
        dispatch({ type: 'CLOSE_DRAWER' });
    };

    return (
        <div className={classes.container}>
            <Grid container className={classes.list_container}>
                <Grid item className={classes.chat_head}>
                    <Typography>All Chats</Typography>
                    <Badge badgeContent={Object.values(notifications).reduce((a, b) => a + b)} className={classes.badge} />
                </Grid>
                <Divider className={classes.divider} />
                {groups.map((g, index) => {
                    return (
                        <React.Fragment key={g._id}>
                            <Grid
                                item
                                container
                                className={
                                    index === chatIndex
                                        ? classes.chat_list_active
                                        : classes.chat_list
                                }
                                onClick={() => handleChatList(index)}
                            >
                                <Grid item className={classes.avatar_container}>
                                    <Avatar
                                        alt="chat_group_img"
                                        src={g.image}
                                        variant="rounded"
                                        className={classes.avatar}
                                    />
                                </Grid>
                                <Grid item container className={classes.group_member}>
                                    <Typography className={classes.group_name}>
                                        {g.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {g.members.length} members
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Badge badgeContent={notifications[g._id]} className={classes.small_badge} />
                                </Grid>
                            </Grid>
                            <Divider className={classes.divider} />
                        </React.Fragment>
                    );
                })}
            </Grid>
        </div>
    );
};

export default ChatSidePanel;

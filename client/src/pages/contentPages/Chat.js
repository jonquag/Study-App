import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useGlobalContext, useConversationContext } from '../../context/studyappContext';

import Sidebar from '../../components/Profile/Sidebar';
import Conversation from '../../components/Chat/Conversation';
import MessageCreator from '../../components/Chat/MessageCreator';
import ChatSidePanel from './ChatSidePanel';

const useStyles = makeStyles((theme) => ({
    container: {
        height: 'calc(100vh - 100px)',
        [theme.breakpoints.down('sm')]: {
            height: 'auto',
        },
    },
    contentContainer: {
        backgroundColor: theme.palette.common.white,
        display: 'block',
        height: 'calc(100vh - 103px)',
    },
    divider: {
        opacity: 0.10414,
        height: 1,
        background: '#2967ff',
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
    members: {
        opacity: 0.4
    },
    chat_pic: {
        width: 80,
        height: 80,
        borderRadius: 18,
        marginRight: theme.spacing(2)
    },
    dot_icon: {
        fontSize: theme.spacing(5),
        color: '#d8d8d8'
    },
}));

const Chat = () => {
    const classes = useStyles();
    const [chatIndex, setChatIndex] = useState(0);
    const { userGroups } = useGlobalContext();
    const {groups} = userGroups;
    const [chatGroups, setChatGroups] = useState(null);

    const { conversations } = useConversationContext();

    React.useEffect(() => {
        if (groups.length && Object.keys(conversations).length) {
            const sorted = groups.sort((a, b) => {
                const aMessages = conversations[a._id].messages;
                const bMessages = conversations[b._id].messages;
    
                const aMostRecent = 
                    aMessages.length === 0 ? 0 : aMessages[aMessages.length - 1].timeStamp;
                const bMostRecent = 
                    bMessages.length === 0 ? 0 : bMessages[bMessages.length - 1].timeStamp;
                return bMostRecent - aMostRecent;
            })
            if (chatGroups) {
                const selectedId = chatGroups[chatIndex]._id;
                const newIndex = sorted.findIndex(g => g._id === selectedId);
                setChatIndex(newIndex);
            }
            setChatGroups([...sorted]);
        }
    }, [groups, conversations]);


    if (!chatGroups) return <LinearProgress />
    return (
        <Grid container className={classes.container}>
            <Sidebar>
                <ChatSidePanel groups={chatGroups} chatIndex={chatIndex} setChatIndex={setChatIndex} />
            </Sidebar>
            <Grid item container sm={12} md={9} className={classes.contentContainer}>
            {
                chatGroups.length && chatGroups[chatIndex] && conversations[chatGroups[chatIndex]._id] && 
                <>
                    <Container className={classes.chat_head}>
                        <Avatar
                            variant='square'
                            className={classes.chat_pic} 
                            src={chatGroups[chatIndex].image}
                        />
                        <Box flexGrow={1} flexDirection='column'>
                            <Typography variant='h5'>{chatGroups[chatIndex].name}</Typography>
                            <Typography className={classes.members} variant='h6'>
                                {chatGroups[chatIndex].members.length + ' Members'}
                            </Typography>
                        </Box>
                        <IconButton>
                            <MoreHorizIcon className={classes.dot_icon} />
                        </IconButton>
                    </Container>
                    <Divider className={classes.divider}/>
                    <Conversation messages={conversations[chatGroups[chatIndex]._id].messages}/>
                    <Divider className={classes.divider}/>
                    <MessageCreator groupId={chatGroups[chatIndex]._id}/>
                </>
            }
            </Grid>
        </Grid>
    );
};

export default Chat;

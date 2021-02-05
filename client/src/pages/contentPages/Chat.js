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
    const { userGroups } = useGlobalContext();
    const {groups} = userGroups;
    const [chatGroups, setChatGroups] = useState(null);
    const [selectedGroupChat, setSelectedGroupChat] = useState(null);

    const { conversationManager, notifications } = useConversationContext();
    //notifications update triggers re-render so we can just get conversations
    let conversations = conversationManager.getConversations();
    
    //clear notifications if chat is active 
    // safe to call because conversationManager.clearNotifications does not trigger update
    // if 0 notifications
    React.useEffect(() => {
        if (chatGroups && selectedGroupChat) {
            conversationManager.clearNotifications(selectedGroupChat);
        }
    }, [chatGroups, conversationManager, notifications, selectedGroupChat]); 

    //Sort chat groups when a new message comes in
    React.useEffect(() => {
        //Wait for groups and conversations to get populated
        if (groups.length && Object.keys(conversations).length) {
            const sorted = groups.sort((aGroup, bGroup) => {
                //Check conversations actually contain group._id
                if (conversations[aGroup._id] && conversations[bGroup._id]) {
                    const aMessages = conversations[aGroup._id].messages;
                    const bMessages = conversations[bGroup._id].messages;
        
                    const aMostRecent = 
                        aMessages.length === 0 ? 0 : aMessages[aMessages.length - 1].timeStamp;
                    const bMostRecent = 
                        bMessages.length === 0 ? 0 : bMessages[bMessages.length - 1].timeStamp;
                    return bMostRecent - aMostRecent;
                }
                return 0
            })
            setSelectedGroupChat(s => s || sorted[0]._id);
            setChatGroups([...sorted]);
        }
    }, [groups, conversations, notifications]);

    if (!chatGroups || !selectedGroupChat) return <LinearProgress />
    const selectedGroup = chatGroups.find(g => g._id === selectedGroupChat);
    return (
        <Grid container className={classes.container}>
            <Sidebar>
                <ChatSidePanel 
                    groups={chatGroups} 
                    selectedGroupChat={selectedGroupChat} 
                    updateSelectedChat={setSelectedGroupChat} 
                    notifications={notifications}
                />
            </Sidebar>
            <Grid item container sm={12} md={9} className={classes.contentContainer}>
            {
                chatGroups.length && 
                selectedGroup && 
                conversations[selectedGroupChat] && 
                <>
                    <Container className={classes.chat_head}>
                        <Avatar
                            variant='square'
                            className={classes.chat_pic} 
                            src={selectedGroup.image}
                        />
                        <Box flexGrow={1} flexDirection='column'>
                            <Typography variant='h5'>{selectedGroup.name}</Typography>
                            <Typography className={classes.members} variant='h6'>
                                {selectedGroup.members.length + ' Members'}
                            </Typography>
                        </Box>
                        <IconButton>
                            <MoreHorizIcon className={classes.dot_icon} />
                        </IconButton>
                    </Container>
                    <Divider className={classes.divider}/>
                    <Conversation 
                        notifications={notifications} 
                        messages={conversations[selectedGroupChat].messages}
                    />
                    <Divider className={classes.divider}/>
                    <MessageCreator groupId={selectedGroupChat}/>
                </>
            }
            </Grid>
        </Grid>
    );
};

export default Chat;

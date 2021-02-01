import { Divider, Grid, } from '@material-ui/core';
import React, { useState } from 'react';
import Sidebar from '../../components/Profile/Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { chatList } from '../../data/mockData';

import ChatSidePanel from './ChatSidePanel';
import ConversationHeader from '../../components/Chat/ConversationHeader';
import Conversation from '../../components/Chat/Conversation';
import MessageCreator from '../../components/Chat/MessageCreator';

const useStyles = makeStyles(theme => ({
    container: {
        height: 'calc(100vh - 100px)',
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
}));

const Chat = () => {
    const classes = useStyles();
    const [chatIndex, setChatIndex] = useState(0);
    const [cList, setCList ] = useState(chatList);

    React.useEffect(() => {
        const sorted = chatList.sort((a, b) => {
            const k1 = a.messages.length === 0 ? 0 : a.messages[a.messages.length - 1].timeStamp
            const k2 = b.messages.length === 0 ? 0 : b.messages[b.messages.length - 1].timeStamp
            return k2 - k1
        })
        console.log(chatList)
        setCList([...sorted]);
    }, []); 

    return (
        <Grid container className={classes.container}>
            <Sidebar>
                <ChatSidePanel chatList={cList} chatIndex={chatIndex} setChatIndex={setChatIndex} />
            </Sidebar>
            <Grid item container sm={12} md={9} className={classes.contentContainer}>
                <ConversationHeader chat={cList[chatIndex]}/>
                <Divider className={classes.divider}/>
                <Conversation messages={cList[chatIndex].messages}/>
                <Divider className={classes.divider}/>
                <MessageCreator />
            </Grid>
        </Grid>
    );
};

export default Chat;

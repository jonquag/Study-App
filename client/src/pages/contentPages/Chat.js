import React, { useState } from 'react';
import { Grid, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { chatList } from '../../data/mockData';
import Sidebar from '../../components/Profile/Sidebar';
import ChatContent from '../../components/Chat/ChatContent';
import ChatSidePanel from './ChatSidePanel';


const useStyles = makeStyles(() => ({
    container: {
        height: 'calc(100vh - 100px)',
    },
}));

const Chat = () => {
    const classes = useStyles();
    const [chatIndex, setChatIndex] = useState(0);
    const [cList, setCList ] = useState(chatList);

    React.useEffect(() => {
        const sorted = chatList.sort((a, b) => {
            const aMostRecent = a.messages.length === 0 ? 0 : a.messages[a.messages.length - 1].timeStamp;
            const bMostRecent = b.messages.length === 0 ? 0 : b.messages[b.messages.length - 1].timeStamp;
            return bMostRecent - aMostRecent;
        })
        setCList([...sorted]);
    }, []); 

    return (
        <Grid container className={classes.container}>
            <Sidebar>
                <ChatSidePanel chatList={cList} chatIndex={chatIndex} setChatIndex={setChatIndex} />
            </Sidebar>
            <ChatContent chat={cList[chatIndex]} />
        </Grid>
    );
};

export default Chat;

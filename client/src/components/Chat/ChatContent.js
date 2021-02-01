import React from 'react';
import { 
    Avatar,
    Box,
    Container,
    Divider, 
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import Conversation from './Conversation';
import MessageCreator from './MessageCreator';


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

export const ChatContent = ({chat}) => {
    const classes = useStyles();

    return (
        <Grid item container sm={12} md={9} className={classes.contentContainer}>
            <Container className={classes.chat_head}>
                <Avatar
                    variant='square'
                    className={classes.chat_pic} 
                    src={chat.imgUrl}
                />
                <Box flexGrow={1} flexDirection='column'>
                    <Typography variant='h5'>{chat.chatGroup}</Typography>
                    <Typography className={classes.members} variant='h7'>{chat.members + ' Members'}</Typography>
                </Box>
                <IconButton item>
                    <MoreHorizIcon className={classes.dot_icon} />
                </IconButton>
            </Container>
            <Divider className={classes.divider}/>
            <Conversation messages={chat.messages}/>
            <Divider className={classes.divider}/>
            <MessageCreator />
        </Grid>
    )
};

export default ChatContent;

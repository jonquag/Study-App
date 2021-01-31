import React from 'react';
import {
    Avatar,
    Grid,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
        borderRadius: 18
    }
}));

const ChatHeader = ({chat}) => {
    const classes = useStyles();
    return (
        <Grid item className={classes.chat_head}>
            <Avatar
                variant='square'
                className={classes.chat_pic} 
                src={chat.imgUrl}
            />
            <Grid flexDirection='column' >
                <Typography variant='h5'>{chat.chatGroup}</Typography>
                <Typography className={classes.members} variant='h7'>{chat.members + ' Members'}</Typography>
            </Grid>
        </Grid>
    );
};

export default ChatHeader;

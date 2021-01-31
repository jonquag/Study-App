import React from 'react';
import {
    Avatar,
    Box,
    Container,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: 400
    },
    received_container: {
        background: theme.palette.primary.gradient,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        maxWidth: 500,
    },
    sent_container: {
        background: '#e6edff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        maxWidth: 300,
    },
    contentText: {
        alignItems: 'center',
        padding: 5
    },
    avatar: {
        width: 60,
        height: 60
    },
    timestamp: {
        fontSize: 12,
        opacity: 0.29,
        padding: 5
    }
}));

const Message = ({msg, isReceived}) => {
    const classes = useStyles();

    return (
        <Box display='flex' flexDirection='row' className={classes.message_container}>
            {isReceived && <Avatar className={classes.avatar} src={msg.profileImg}/>}
            <Container>
                <Container className={isReceived ? classes.received_container : classes.sent_container}>
                    <Typography className={classes.contentText} variant='h6' color={isReceived ? 'primary' : 'secondary'}>
                        {msg.content}
                    </Typography>
                </Container>
                <Typography className={classes.timestamp}>
                    {msg.timeStamp}
                </Typography>
            </Container>
        </Box>
    );
};

export default Message;

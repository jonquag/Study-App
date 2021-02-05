import React from 'react';
import { Avatar, Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { msToTimeAgo } from '../../utils/convertTimeStamps';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1),
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
        color: '#FFF',
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
        maxWidth: 500,
        justifySelf: 'flex-end',
        color: '#2574FF',
    },
    contentText: {
        alignItems: 'center',
        padding: 5,
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: theme.spacing(2),
    },
    left_timestamp: {
        fontSize: '0.75rem',
        opacity: 0.29,
        paddingTop: 5,
        alignSelf: 'flex-start',
    },
    right_timestamp: {
        fontSize: '0.75rem',
        opacity: 0.29,
        paddingTop: 5,
        alignSelf: 'flex-end',
    },
}));

const Message = ({ msg, isReceived }) => {
    const classes = useStyles();
    return (
        <Box display="flex" flexDirection="row" className={classes.container}>
            {isReceived && (
                <Avatar className={classes.avatar} src={msg.profile.imageUrl} />
            )}
            <Box display="flex" flexDirection="column">
                <Container
                    className={
                        isReceived ? classes.received_container : classes.sent_container
                    }
                >
                    <Typography
                        className={classes.contentText}
                        variant="h6"
                    >
                        {msg.text}
                    </Typography>
                </Container>
                <Typography
                    className={
                        isReceived ? classes.left_timestamp : classes.right_timestamp
                    }
                >
                    {msToTimeAgo(msg.timeStamp)}
                </Typography>
            </Box>
        </Box>
    );
};

export default Message;

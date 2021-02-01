import React from 'react';
import {
    Avatar,
    Box,
    Container,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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
    },
    dots: {
        fontSize: theme.spacing(5),
        color: '#d8d8d8'
    }
}));

const ChatHeader = ({chat}) => {
    const classes = useStyles();
    return (
        <Container className={classes.chat_head}>
            <Grid container alignItems='center' sm={12}>
                <Grid item xs={1}>
                    <Avatar
                        variant='square'
                        className={classes.chat_pic} 
                        src={chat.imgUrl}
                    />
                </Grid>
                <Grid item xs={9} flexDirection='column' >
                    <Typography variant='h5'>{chat.chatGroup}</Typography>
                    <Typography className={classes.members} variant='h7'>{chat.members + ' Members'}</Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton item>
                        <MoreHorizIcon className={classes.dots} />
                    </IconButton>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ChatHeader;

import React, { useEffect, useRef } from 'react';
import {
    Grid,
    Container,
    List,
    ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalContext } from '../../context/studyappContext';

import Message from './Message';

const useStyles = makeStyles(theme => ({
    list_container: {
        display: 'block',
        height: 'calc(100vh - 343px)',
        overflowY: 'auto',
        backgroundColor: theme.palette.common.white,
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
    },
    left_msg: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    right_msg: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

const Conversation = ({messages}) => {
    const classes = useStyles();
    const lastRef = useRef(null);
    const { profile } = useGlobalContext();
    const { user } = profile;

    useEffect(() => {
        lastRef.current.scrollIntoView();
    }, [messages]);

    return (
        <Grid className={classes.list_container}>
            <Container>
                <List>
                    {
                        messages.map(message => {
                            const isReceived = message.user !== user._id;
                            return (
                                <ListItem className={isReceived ? classes.left_msg : classes.right_msg}>
                                    <Message msg={message} isReceived={isReceived} />
                                </ListItem>
                            );
                        })
                    }
                    <ListItem ref={lastRef}/>
                </List>
            </Container>
        </Grid>
    )
};

export default Conversation;

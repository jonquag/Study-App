import React from 'react';
import {
    Grid,
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
}));

const Conversation = ({messages}) => {
    const classes = useStyles();
    const { profile } = useGlobalContext();
    const { user } = profile;

    return (
        <List className={classes.list_container}>
            {
                messages.map(message => (
                    <ListItem>
                        <Message msg={message} isReceived={message.user !== user._id}/>
                    </ListItem>
                ))
            }
        </List>
    )
};

export default Conversation;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, List, ListItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import logo from '../../images/logo_study.png';
import profileImg from '../../images/profile-pic.png';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    logo_study: {
        flexGrow: 4,
        display: 'flex',
        alignItems: 'center',
        marginLeft: '2.25rem',
        '& img': {
            width: '2.5rem',
            height: 'auto',
            marginRight: theme.spacing(2),
        },
    },
    listContainer: {
        flexGrow: 2,
        display: 'flex',
        '& > *': {
            display: 'flex',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 24,
        },
    },
    profile: {
        flexGrow: 1,
        display: 'flex',
    },
}));

const Navbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar style={{ height: '100px', backgroundColor: '#FFF' }}>
                    <div className={classes.logo_study}>
                        <img src={logo} alt="logo_study" />
                        <Typography variant="h3">studyapp</Typography>
                    </div>
                    <div className={classes.listContainer}>
                        <List>
                            <ListItem>Forum</ListItem>
                            <ListItem>Group</ListItem>
                            <ListItem>Chats</ListItem>
                        </List>
                    </div>
                    <div className={classes.profile}>
                        <Avatar
                            alt="profiel_img"
                            src={profileImg}
                            style={{ height: '60px', width: '60px' }}
                        />
                        <Button endIcon={<ArrowDropDownIcon />} style={{ padding: 0 }}>
                            Profile
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;

import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Avatar, List, ListItem, Badge, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import logo from '../../images/logo_study.png';
import profileImg from '../../images/profile-pic.png';
import { useStyles } from './NavbarStyles';

const Navbar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                            <ListItem>
                                <Typography variant="h6">Forum</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="h6">Group</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography variant="h6">Chats</Typography>
                                <Badge badgeContent={12} className={classes.badge} />
                            </ListItem>
                        </List>
                    </div>
                    <div className={classes.profile}>
                        <Avatar
                            alt="profiel_img"
                            src={profileImg}
                            style={{ height: '60px', width: '60px' }}
                        />
                        <Button
                            endIcon={<ArrowDropDownIcon />}
                            className={classes.profile_button}
                            onClick={e => setAnchorEl(e.currentTarget)}
                        >
                            <Typography variant="h6">Profile</Typography>
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <ExitToAppIcon style={{ marginRight: 8 }} />
                                <Typography>Logout</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <AccountCircleIcon style={{ marginRight: 8 }} />
                                <Typography>My Profile</Typography>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;

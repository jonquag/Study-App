import React, { useState } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    List,
    ListItem,
    Badge,
    Menu,
    MenuItem,
    Link,
    IconButton,
    Divider,
    Hidden,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { NavLink, useHistory } from 'react-router-dom';
import logo from '../../images/logo_study.png';
import { useStyles } from './NavbarStyles';
import { useGlobalContext } from '../../context/studyappContext';
import * as actions from '../../context/actions';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();

    const { profile, dispatch } = useGlobalContext();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleProfile = () => {
        setAnchorEl(null);
        history.push('/profile');
    };

    const handleLogout = () => {
        actions.logout()(dispatch);
    };

    return (
        <div className={classes.root}>
            <AppBar position="relative" color="default" elevation={2}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.logo_study}>
                        <Link
                            color="inherit"
                            variant="inherit"
                            underline="none"
                            // component={RouterLink}
                            // to="/login"
                        >
                            <img src={logo} alt="logo_study" />
                        </Link>
                        <Typography variant="h3">studyapp</Typography>
                    </div>
                    <div className={classes.listContainer}>
                        <List>
                            <ListItem>
                                <NavLink
                                    color="inherit"
                                    variant="inherit"
                                    underline="none"
                                    to="/forum"
                                    style={{ opacity: '50%' }}
                                    activeStyle={{
                                        opacity: '100%',
                                    }}
                                    className={classes.linkStyles}
                                >
                                    Forum
                                </NavLink>
                            </ListItem>
                            <ListItem>
                                <NavLink
                                    color="inherit"
                                    variant="inherit"
                                    underline="none"
                                    to="/groups"
                                    activeStyle={{
                                        opacity: '100%',
                                    }}
                                    className={classes.linkStyles}
                                >
                                    Groups
                                </NavLink>
                            </ListItem>
                            <ListItem>
                                <NavLink
                                    color="inherit"
                                    variant="inherit"
                                    underline="none"
                                    to="/chat"
                                    activeStyle={{
                                        opacity: '100%',
                                    }}
                                    className={classes.linkStyles}
                                >
                                    Chats
                                </NavLink>
                                <Badge badgeContent={8} className={classes.badge} />
                            </ListItem>
                        </List>
                    </div>
                    <div className={classes.profile}>
                        {profile.imageUrl ? (
                            <Avatar
                                alt="Profile Pic"
                                src={profile.imageUrl}
                                className={classes.avatar}
                            />
                        ) : (
                            <Avatar className={classes.large}>
                                <PersonAddIcon className={classes.large} />
                            </Avatar>
                        )}

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
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem onClick={handleLogout}>
                                <ExitToAppIcon className={classes.icons} />
                                <Typography>Logout</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleProfile}>
                                <AccountCircleIcon className={classes.icons} />
                                <Typography>My Profile</Typography>
                            </MenuItem>
                        </Menu>
                    </div>
                    <Hidden mdUp>
                        <div>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={e => setAnchorEl(e.currentTarget)}
                            >
                                <MoreVertIcon />
                            </IconButton>
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
                                onClose={() => setAnchorEl(null)}
                            >
                                <List component="nav" className={classes.dropdown_list}>
                                    <ListItem>
                                        <NavLink
                                            color="inherit"
                                            variant="inherit"
                                            underline="none"
                                            to="/forum"
                                            activeStyle={{
                                                opacity: '100%',
                                            }}
                                            className={classes.linkStyles}
                                            onClick={() => setAnchorEl(null)}
                                        >
                                            Forum
                                        </NavLink>
                                    </ListItem>
                                    <ListItem>
                                        <NavLink
                                            color="inherit"
                                            variant="inherit"
                                            underline="none"
                                            to="/groups"
                                            activeStyle={{
                                                opacity: '100%',
                                            }}
                                            className={classes.linkStyles}
                                            onClick={() => setAnchorEl(null)}
                                        >
                                            Groups
                                        </NavLink>
                                    </ListItem>
                                    <ListItem>
                                        <NavLink
                                            color="inherit"
                                            variant="inherit"
                                            underline="none"
                                            to="/chat"
                                            activeStyle={{
                                                opacity: '100%',
                                            }}
                                            className={classes.linkStyles}
                                            onClick={() => setAnchorEl(null)}
                                        >
                                            Chats
                                        </NavLink>
                                        <Badge
                                            badgeContent={12}
                                            className={classes.badge}
                                        />
                                    </ListItem>
                                </List>
                                <Divider />
                                <MenuItem
                                    className={classes.mobile_logout}
                                    onClick={handleLogout}
                                >
                                    <ExitToAppIcon className={classes.icons} />
                                    <Typography>Logout</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleProfile}>
                                    <AccountCircleIcon className={classes.icons} />
                                    <Typography>My Profile</Typography>
                                </MenuItem>
                            </Menu>
                        </div>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;

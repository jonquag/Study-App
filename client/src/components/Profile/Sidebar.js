import React from 'react';
import { Grid, Hidden, Fab, Drawer, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import { useGlobalContext } from '../../context/studyappContext';

const useStyles = makeStyles(theme => ({
    fab_icon: {
        margin: 16,
        backgroundColor: '#FFF',
        color: '#737373',
        '&:hover': {
            color: '#FFF',
            backgroundColor: theme.palette.secondary.main,
        },
    },
    mobile_container: {
        backgroundColor: theme.palette.common.white,
        height: 100,
    },
    menu_icon: {
        fontSize: '1.5rem',
    },
    drawer: {
        width: 350,
        backgroundColor: '#F9F9FC',
        overflowY: 'auto',
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
    icon_btn: {
        fontSize: '1.75rem',
        margin: theme.spacing(2),
        color: theme.palette.secondary.main,
    },
}));

const Sidebar = ({ children }) => {
    const { dispatch, isOpen } = useGlobalContext();

    const classes = useStyles();

    const handleOpen = () => {
        dispatch({ type: 'OPEN_DRAWER' });
    };

    const handleClose = () => {
        dispatch({ type: 'CLOSE_DRAWER' });
    };

    const drawerContent = () => (
        <div className={classes.drawer}>
            <Grid
                container
                justify="flex-end"
                alignItems="center"
                style={{ position: 'absolute' }}
            >
                <IconButton className={classes.icon_btn} onClick={handleClose}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Grid>
            {children}
        </div>
    );

    return (
        <>
            <Hidden smDown>
                <Grid item md={3}>
                    {children}
                </Grid>
            </Hidden>
            <Hidden mdUp>
                <Grid container className={classes.mobile_container}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.fab_icon}
                        onClick={handleOpen}
                    >
                        <MenuOutlinedIcon className={classes.menu_icon} />
                    </Fab>
                </Grid>
                <Drawer anchor="left" open={isOpen} onClose={handleClose}>
                    {drawerContent()}
                </Drawer>
            </Hidden>
        </>
    );
};

export default Sidebar;

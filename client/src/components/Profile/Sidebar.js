import React from 'react';
import { Grid, Hidden, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';

const useStyles = makeStyles(theme => ({
    fab_icon: {
        margin: 16,
    },
    mobile_container: {
        backgroundColor: theme.palette.common.white,
        height: 100,
    },
    menu_icon: {
        fontSize: '1.5rem',
    },
}));

const Sidebar = ({ children }) => {
    const classes = useStyles();

    return (
        <>
            <Hidden smDown>
                <Grid item md={3}>
                    {children}
                </Grid>
            </Hidden>
            <Hidden mdUp>
                <Grid container className={classes.mobile_container}>
                    <Fab color="primary" aria-label="add" className={classes.fab_icon}>
                        <MenuOutlinedIcon className={classes.menu_icon} />
                    </Fab>
                </Grid>
            </Hidden>
        </>
    );
};

export default Sidebar;

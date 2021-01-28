import React from 'react';
import { Grid } from '@material-ui/core';

const Sidebar = ({ children }) => {
    return (
        <Grid item sm={12} md={3}>
            {children}
        </Grid>
    );
};

export default Sidebar;

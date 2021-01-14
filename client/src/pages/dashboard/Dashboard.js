import React from 'react';
import { Grid } from '@material-ui/core';

import Navbar from '../layout/Navbar';

const Dashboard = () => {
    return (
        <Grid>
            <Navbar />
            <Grid>
                <Grid>Sidebar</Grid>
                <Grid>content pages</Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;

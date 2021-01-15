import React, { useState } from 'react';
import { Grid, InputLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    inputStyles: {
        fontWeight: '600',
        paddingLeft: '1em',
        minWidth: '12em',
    },
    helperStyles: {
        fontSize: 15,
    },
    labelStyles: {
        paddingBottom: '.5em',
    },
});

const UserInfo = (props) => {
    const [firstName, setFirstName] = useState('Ashly');
    const [lastName, setLastName] = useState('Sanford');
    const [email, setEmail] = useState('usermail@gmail.com');
    const [location, setLocation] = useState('+1 (202) 555 0192');
    const [phone, setPhone] = useState('');

    const classes = useStyles();

    return (
        //  User Info Grid Parent Container
        <Grid container sm={12} justify='space-between' className={classes.profileGrid}>
            <Grid item sm={12}>
                <Typography variant='h1' className={classes.headerStyles}>
                    Profile
                </Typography>
            </Grid>
            {/* First Name  */}
            <Grid item xs={12} sm={6}>
                <InputLabel className={classes.labelStyles}>First Name</InputLabel>{' '}
                <TextField
                    variant='outlined'
                    hintText='Change First Name..'
                    onChange={(e) => setFirstName(e.target.value)}
                    defaultValue={firstName}
                />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
                <InputLabel className={classes.labelStyles}>Last Name</InputLabel>{' '}
                <TextField
                    variant='outlined'
                    hintText='Change Last Name..'
                    onChange={(e) => setLastName(e.target.value)}
                    defaultValue={lastName}
                />
            </Grid>
            {/* Email */}
            <Grid item xs={12} sm={6}>
                <InputLabel className={classes.labelStyles}>Email address</InputLabel>{' '}
                <TextField
                    variant='outlined'
                    hintText='Change Email...'
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={email}
                />
            </Grid>

            {/* Phone */}
            <Grid item xs={12} sm={6}>
                <InputLabel className={classes.labelStyles}>Phone</InputLabel>{' '}
                <TextField
                    variant='outlined'
                    hintText='Change Phone Number...'
                    onChange={(e) => setPhone(e.target.value)}
                    defaultValue={phone}
                />
            </Grid>
            {/* Location */}
            <Grid item xs={12} sm={6}>
                <InputLabel className={classes.labelStyles}>Location</InputLabel>{' '}
                <TextField
                    variant='outlined'
                    hintText='Change Location..'
                    onChange={(e) => setLocation(e.target.value)}
                    defaultValue={location}
                />
            </Grid>
        </Grid>
    );
};

export default UserInfo;

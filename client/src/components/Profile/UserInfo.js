import React, { useEffect, useState } from 'react';

import { Typography, Button, Grid, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

export const useStyles = makeStyles(theme => ({
    inputStyles: {
        fontWeight: '600',
        width: 300,
    },
    labelStyles: {
        paddingBottom: '.5em',
    },
    profileGrid: {
        paddingLeft: '5em',
    },
    button: {
        color: '#FFF',
        background: theme.palette.primary.gradient,
        height: 54,
        marginLeft: '1.2em',
        marginTop: '1em',
    },
}));

// TEST USER ID 60021edaab2f25167778e7f9

const UserInfo = props => {
    let [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');

    const classes = useStyles();

    const fetchData = () => {
        axios.get('profile/60021edaab2f25167778e7f9').then(res => {
            console.log(res.data);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setEmail(res.data.user.email);
            setLocation(res.data.location);
            setPhone(res.data.phone);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateProfileInfo = () => {
        console.log('update changes clicked');
    };

    return (
        //  User Info Grid Parent Container
        <Grid container item className={classes.profileGrid} direction="column">
            <Grid
                item
                container
                alignContent="center"
                sm={2}
                className={classes.headerContainer}
            >
                <Typography variant="h1">Profile</Typography>
            </Grid>
            {/* First Name  */}
            <Grid
                item
                container
                sm={10}
                alignContent="flex-start"
                justify="flex-start"
                spacing={4}
            >
                <Grid item>
                    <InputLabel className={classes.labelStyles}>First Name</InputLabel>{' '}
                    <TextField
                        variant="outlined"
                        hinttext="Change First Name.."
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        className={classes.inputStyles}
                    />
                </Grid>
                {/* Last Name */}
                <Grid item>
                    <InputLabel className={classes.labelStyles}>Last Name</InputLabel>{' '}
                    <TextField
                        variant="outlined"
                        hinttext="Change Last Name.."
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        className={classes.inputStyles}
                    />
                </Grid>
                {/* Email */}
                <Grid item>
                    <InputLabel className={classes.labelStyles}>Email address</InputLabel>{' '}
                    <TextField
                        variant="outlined"
                        hinttext="Change Email..."
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        className={classes.inputStyles}
                    />
                </Grid>

                {/* Phone */}
                <Grid item>
                    <InputLabel className={classes.labelStyles}>Phone</InputLabel>{' '}
                    <TextField
                        variant="outlined"
                        hinttext="Change Phone Number..."
                        onChange={e => setPhone(e.target.value)}
                        value={phone}
                        className={classes.inputStyles}
                    />
                </Grid>
                {/* Location */}
                <Grid item>
                    <InputLabel className={classes.labelStyles}>Location</InputLabel>{' '}
                    <TextField
                        variant="outlined"
                        hinttext="Change Location.."
                        onChange={e => setLocation(e.target.value)}
                        value={location}
                        className={classes.inputStyles}
                    />
                </Grid>
                <Grid container>
                    <Grid item>
                        <Button className={classes.button} onClick={updateProfileInfo}>
                            Submit Changes
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserInfo;

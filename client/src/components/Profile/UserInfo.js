import React, { useEffect, useState } from 'react';

import { Typography, Button, Grid, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useGlobalContext } from '../../context/studyappContext';

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
    header: {
        padding: '1.5em',
        background: 'orange',
    },
}));

// TEST USER ID 60021edaab2f25167778e7f9

const UserInfo = props => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');

    const classes = useStyles();
    const { isLoading, dispatch, profile } = useGlobalContext();
    // console.log('profile: ' + { ...profile });
    for (let e in profile) {
        console.log(profile[e]);
    }

    const fetchData = () => {
        axios.get('profile/60021edaab2f25167778e7f9').then(res => {
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
        <Grid container direction="column" sm={12}>
            <Grid
                item
                container
                spacing={4}
                alignContent="center"
                sm={2}
                className={classes.headerContainer}
            >
                <Typography variant="h1" className={classes.header}>
                    Profile
                </Typography>
            </Grid>
            <Grid
                item
                container
                sm={10}
                alignContent="flex-start"
                justify="flex-start"
                spacing={4}
            >
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        {/* First Name */}
                        <InputLabel className={classes.labelStyles}>
                            First Name
                        </InputLabel>
                        <TextField
                            id="outlined"
                            hinttext="Change first name.."
                            defaultValue="Default Value"
                            variant="outlined"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className={classes.inputStyles}
                        />
                        <InputLabel className={classes.labelStyles}>Last Name</InputLabel>
                        <TextField
                            id="outlined"
                            hinttext="Change last name.."
                            variant="outlined"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className={classes.inputStyles}
                        />
                        <InputLabel className={classes.labelStyles}>Email</InputLabel>
                        {/* Email */}
                        <TextField
                            id="outlined"
                            hinttext="Change email.."
                            variant="outlined"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={classes.inputStyles}
                        />
                        {/* Phone */}
                        <InputLabel className={classes.labelStyles}>Phone</InputLabel>
                        <TextField
                            id="outlined"
                            hinttext="Change phone.."
                            variant="outlined"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className={classes.inputStyles}
                        />
                        {/* Location */}
                        <InputLabel className={classes.labelStyles}>Location</InputLabel>
                        <TextField
                            id="outlined"
                            hinttext="Change location.."
                            variant="outlined"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            className={classes.inputStyles}
                        />
                        <Button className={classes.button} onClick={updateProfileInfo}>
                            Submit Changes
                        </Button>
                    </div>
                </form>
            </Grid>
        </Grid>
    );
};

export default UserInfo;

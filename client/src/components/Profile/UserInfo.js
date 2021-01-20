import React, { useEffect, useState } from 'react';
import { Grid, InputLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles({
    inputStyles: {
        fontWeight: '600',
        width: 300,
    },
    labelStyles: {
        paddingBottom: '.5em',
    },
    profileGrid: {
        padding: '2em 0 0 4em',
    },
    headerContainer: {},
});

// TEST USER ID 60021edaab2f25167778e7f9

const UserInfo = props => {
    let [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('usermail@gmail.com');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('+1 (202) 555 0192');

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

    return (
        //  User Info Grid Parent Container
        <Grid container item className={classes.profileGrid} direction="column">
            <Grid item container sm={2} className={classes.headerContainer}>
                <Typography variant="h1">Profile</Typography>
                <Typography>{firstName}</Typography>
            </Grid>
            {/* First Name  */}
            <Grid item container sm={10} alignItems="flex-start" spacing={4}>
                <Grid item>
                    <InputLabel className={classes.labelStyles}>First Name</InputLabel>{' '}
                    <TextField
                        variant="outlined"
                        hinttext="Change First Name.."
                        onChange={e => setFirstName(e.target.value)}
                        defaultValue={firstName}
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
                        defaultValue={lastName}
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
                        defaultValue={email}
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
                        defaultValue={phone}
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
                        defaultValue={location}
                        className={classes.inputStyles}
                    />
                </Grid>
                {/* <div>{this.res.data}</div> */}
            </Grid>
        </Grid>
    );
};

export default UserInfo;
